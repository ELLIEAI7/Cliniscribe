import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
import WelcomeStep from './WelcomeStep';
import ModelDownloadStep from './ModelDownloadStep';
import CompletionStep from './CompletionStep';

interface SetupWizardProps {
  onComplete: () => void;
}

type SetupStep = 'welcome' | 'download' | 'complete';

function SetupWizard({ onComplete }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState<SetupStep>('welcome');
  const [downloadProgress, setDownloadProgress] = useState<any>(null);
  const [downloadError, setDownloadError] = useState<string>('');
  const [bundledModelsInstalled, setBundledModelsInstalled] = useState<boolean>(false);
  const [ollamaBinaryInstalled, setOllamaBinaryInstalled] = useState<boolean>(false);

  // Check for bundled models on mount
  useEffect(() => {
    const checkBundledModels = async () => {
      try {
        const hasBundledModels = await invoke<boolean>('check_bundled_models');
        setBundledModelsInstalled(hasBundledModels);

        if (hasBundledModels) {
          console.log('Bundled models detected - skipping download step');
        }
      } catch (err) {
        console.error('Failed to check for bundled models:', err);
        setBundledModelsInstalled(false);
      }
    };

    const checkOllamaBinary = async () => {
      try {
        const hasOllamaBinary = await invoke<boolean>('check_ollama_binary');
        setOllamaBinaryInstalled(hasOllamaBinary);
      } catch (err) {
        console.error('Failed to check for Ollama runtime:', err);
        setOllamaBinaryInstalled(false);
      }
    };

    checkBundledModels();
    checkOllamaBinary();
  }, []);

  const handleNext = () => {
    if (currentStep === 'welcome') {
      // Skip download step if models and runtime are installed
      if (bundledModelsInstalled && ollamaBinaryInstalled) {
        setCurrentStep('complete');
      } else {
        setCurrentStep('download');
        startModelDownloads();
      }
    } else if (currentStep === 'download') {
      setCurrentStep('complete');
    } else if (currentStep === 'complete') {
      onComplete();
    }
  };

  const startModelDownloads = async () => {
    setDownloadError('');
    // Listen for download progress
    await listen('download-progress', (event: any) => {
      setDownloadProgress(event.payload);
    });

    try {
      await invoke('ensure_ollama_binary');

      if (!bundledModelsInstalled) {
        // Download Whisper model
        await invoke('download_model', { modelType: 'whisper' });

        // Download Llama model
        await invoke('download_model', { modelType: 'llama' });
      }

      // Both downloads complete
      setTimeout(() => {
        setCurrentStep('complete');
      }, 1000);
    } catch (err) {
      console.error('Model download failed:', err);
      setDownloadError(err instanceof Error ? err.message : 'Model download failed');
    }
  };

  const handleRetryDownloads = () => {
    setDownloadProgress(null);
    startModelDownloads();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {currentStep === 'welcome' && (
        <WelcomeStep
          onNext={handleNext}
          bundledModelsInstalled={bundledModelsInstalled}
          ollamaBinaryInstalled={ollamaBinaryInstalled}
        />
      )}
      {currentStep === 'download' && (
        <ModelDownloadStep
          progress={downloadProgress}
          error={downloadError}
          onRetry={handleRetryDownloads}
          onNext={handleNext}
        />
      )}
      {currentStep === 'complete' && <CompletionStep onNext={handleNext} />}
    </div>
  );
}

export default SetupWizard;
