interface WelcomeStepProps {
  onNext: () => void;
  bundledModelsInstalled?: boolean;
}

function WelcomeStep({ onNext, bundledModelsInstalled = false }: WelcomeStepProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-2">
            <span className="text-blue-600">Clini</span>
            <span className="text-teal-600">Scribe</span>
          </h1>
          <p className="text-2xl text-gray-600">
            AI-Powered Study Notes for Medical Students
          </p>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome! 🎓
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            CogniScribe transforms your lecture recordings into structured study notes using state-of-the-art AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🎙️</div>
              <h3 className="font-semibold text-gray-800 mb-1">Transcription</h3>
              <p className="text-sm text-gray-600">
                High-quality audio-to-text using OpenAI's Whisper
              </p>
            </div>

            <div className="p-4 bg-teal-50 rounded-lg">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-gray-800 mb-1">Structured Notes</h3>
              <p className="text-sm text-gray-600">
                AI-generated summaries with key concepts and terms
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800 mb-1">Privacy First</h3>
              <p className="text-sm text-gray-600">
                Everything runs locally on your computer
              </p>
            </div>
          </div>
        </div>

        {/* Setup Requirements */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {bundledModelsInstalled ? (
            <>
              <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Models Pre-Installed!
              </h3>
              <p className="text-gray-600 mb-4">
                Great news! AI models are already installed on your system. You're ready to use CogniScribe offline.
              </p>
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Whisper Models</strong> - Base & Small models ready for transcription
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Llama 3.1 8B</strong> - Ready for summarization
                  </span>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-4 font-medium">
                ✓ No downloads needed • Ready to use immediately
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                First-Time Setup
              </h3>
              <p className="text-gray-600 mb-4">
                We'll download two AI models to your computer. This only needs to happen once.
              </p>
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Whisper Base Model</strong> (~150 MB) - For transcription
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    <strong>Llama 3.1 8B</strong> (~4.7 GB) - For summarization
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Total download: ~5 GB • Estimated time: 5-15 minutes depending on your internet speed
              </p>
            </>
          )}
        </div>

        {/* Get Started Button */}
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-4 px-12 rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
        >
          Get Started →
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Setup takes about 10 minutes • You can use CogniScribe offline after setup
        </p>
      </div>
    </div>
  );
}

export default WelcomeStep;
