import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { save } from '@tauri-apps/api/dialog';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import LoadingSpinner from '../LoadingSpinner';

interface RecordCardProps {
  onUploadStart: () => void;
  onResult: (data: any) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

function RecordCard({ onUploadStart, onResult, onError, isProcessing }: RecordCardProps) {
  const [subject, setSubject] = useState<string>('');
  const [quizSource, setQuizSource] = useState<'subject' | 'lecture'>('lecture');
  const [ratio, setRatio] = useState<number>(0.15);
  const [livePreview, setLivePreview] = useState<string>('');
  const [chunkCount, setChunkCount] = useState<number>(0);

  // Recording hook with 5-second chunks for live preview
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    error: recordingError,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
  } = useAudioRecorder(handleAudioChunk, 5000);

  // Handle audio chunks for live preview
  async function handleAudioChunk(chunk: Blob, timestamp: number) {
    try {
      setChunkCount((prev) => prev + 1);

      // Convert chunk to base64 for sending to backend
      const reader = new FileReader();
      reader.readAsDataURL(chunk);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;

        // Send chunk to backend for live transcription
        const response = await fetch('http://localhost:8080/api/transcribe-chunk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio: base64Audio.split(',')[1], timestamp }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.text) {
            setLivePreview((prev) => prev + ' ' + result.text);
          }
        }
      };
    } catch (err) {
      console.error('Error processing audio chunk:', err);
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get summary length label
  const getSummaryLabel = (ratio: number): string => {
    if (ratio <= 0.05) return 'Very Brief';
    if (ratio <= 0.10) return 'Brief';
    if (ratio <= 0.15) return 'Standard';
    if (ratio <= 0.20) return 'Detailed';
    return 'Comprehensive';
  };

  // Start recording handler
  const handleStartRecording = async () => {
    try {
      clearRecording();
      setLivePreview('');
      setChunkCount(0);
      await startRecording();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to start recording');
    }
  };

  // Process recorded audio
  const handleProcess = async () => {
    if (!audioBlob) {
      onError('No recording available');
      return;
    }

    onUploadStart();

    try {
      // Ask user to save the recording
      const filePath = await save({
        defaultPath: `lecture-${new Date().toISOString().slice(0, 10)}.webm`,
        filters: [
          { name: 'Audio', extensions: ['webm', 'ogg'] },
        ],
      });

      if (!filePath) {
        onError('Recording cancelled - file not saved');
        return;
      }

      // Save the recording using Tauri command
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      await invoke('save_recorded_audio', {
        path: filePath,
        audioData: Array.from(uint8Array),
      });

      // Send to processing pipeline
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      const response = await fetch(
        'http://localhost:8080/api/pipeline?' +
          new URLSearchParams({
            ratio: ratio.toString(),
            ...(subject && { subject }),
          }),
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        onResult(result);
        clearRecording();
        setLivePreview('');
      } else {
        onError(result.error || 'Processing failed');
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to process recording');
    }
  };

  // Show recording error if any
  useEffect(() => {
    if (recordingError) {
      onError(recordingError);
    }
  }, [recordingError, onError]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        🎙️ Record Lecture
      </h2>
      <p className="text-gray-600 mb-6">
        Record audio directly from your microphone with live preview
      </p>

      {/* Recording Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors ${
          isRecording
            ? 'border-red-400 bg-red-50'
            : audioBlob
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 bg-gray-50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {/* Recording Status */}
        {!isRecording && !audioBlob && (
          <div>
            <div className="text-5xl mb-3">🎤</div>
            <p className="text-gray-700 font-medium mb-2">Ready to Record</p>
            <p className="text-sm text-gray-500">
              Click the button below to start recording your lecture
            </p>
          </div>
        )}

        {isRecording && (
          <div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-2xl font-mono font-bold text-red-600">
                {formatTime(recordingTime)}
              </span>
            </div>
            <p className="text-gray-700 font-medium mb-2">
              {isPaused ? '⏸️ Paused' : '🎙️ Recording...'}
            </p>
            <p className="text-sm text-gray-500">
              {chunkCount > 0 && `${chunkCount} chunks processed for preview`}
            </p>
          </div>
        )}

        {audioBlob && !isRecording && (
          <div>
            <div className="text-5xl mb-3">✅</div>
            <p className="text-green-700 font-medium mb-2">Recording Complete!</p>
            <p className="text-sm text-gray-600">
              Duration: {formatTime(recordingTime)} • Ready to process
            </p>
          </div>
        )}

        {/* Recording Controls */}
        <div className="flex gap-3 justify-center mt-4">
          {!isRecording && !audioBlob && (
            <button
              onClick={handleStartRecording}
              disabled={isProcessing}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ● Start Recording
            </button>
          )}

          {isRecording && (
            <>
              {!isPaused ? (
                <button
                  onClick={pauseRecording}
                  className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  ⏸️ Pause
                </button>
              ) : (
                <button
                  onClick={resumeRecording}
                  className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                >
                  ▶️ Resume
                </button>
              )}
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
              >
                ⏹️ Stop
              </button>
            </>
          )}

          {audioBlob && !isRecording && (
            <button
              onClick={clearRecording}
              disabled={isProcessing}
              className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🗑️ Discard
            </button>
          )}
        </div>
      </div>

      {/* Live Preview */}
      {livePreview && isRecording && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            📝 Live Preview (rough transcription)
          </h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{livePreview}</p>
        </div>
      )}

      {/* Configuration (same as UploadCard) */}
      <div className="space-y-4">
        {/* Subject Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject (optional)
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isProcessing || isRecording}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">General / Mixed Topics</option>
            <option value="anatomy">Anatomy</option>
            <option value="physiology">Physiology</option>
            <option value="pharmacology">Pharmacology</option>
            <option value="pathophysiology">Pathophysiology</option>
            <option value="clinical_skills">Clinical Skills</option>
            <option value="nursing_fundamentals">Nursing Fundamentals</option>
            <option value="biochemistry">Biochemistry</option>
            <option value="microbiology">Microbiology</option>
          </select>
        </div>

        {/* Quiz Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Questions From
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setQuizSource('subject')}
              disabled={isProcessing || isRecording}
              className={`p-3 rounded-lg border-2 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                quizSource === 'subject'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-white hover:border-blue-300'
              }`}
            >
              <div className="text-2xl mb-1">📚</div>
              <div className="font-semibold text-sm">Subject-Based</div>
              <div className="text-xs text-gray-600">General study questions</div>
            </button>
            <button
              onClick={() => setQuizSource('lecture')}
              disabled={isProcessing || isRecording}
              className={`p-3 rounded-lg border-2 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                quizSource === 'lecture'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-300 bg-white hover:border-teal-300'
              }`}
            >
              <div className="text-2xl mb-1">🎯</div>
              <div className="font-semibold text-sm">Lecture Content</div>
              <div className="text-xs text-gray-600">From this recording</div>
            </button>
          </div>
        </div>

        {/* Summary Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary Length: {getSummaryLabel(ratio)}
          </label>
          <input
            type="range"
            min="0.05"
            max="0.30"
            step="0.05"
            value={ratio}
            onChange={(e) => setRatio(parseFloat(e.target.value))}
            disabled={isProcessing || isRecording}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Very Brief</span>
            <span>Comprehensive</span>
          </div>
        </div>
      </div>

      {/* Process Button */}
      <button
        onClick={handleProcess}
        disabled={!audioBlob || isProcessing || isRecording}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-3">
            <LoadingSpinner />
            <span>Processing your recording...</span>
            <div className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>
                .
              </span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>
                .
              </span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>
                .
              </span>
            </div>
          </div>
        ) : (
          '🚀 Process Recording & Generate Notes'
        )}
      </button>

      {audioBlob && !isProcessing && (
        <p className="text-sm text-gray-500 text-center mt-3">
          This may take a few minutes depending on recording length
        </p>
      )}
    </div>
  );
}

export default RecordCard;
