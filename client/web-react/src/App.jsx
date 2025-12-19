import { useState } from "react"
import UploadCard from "./components/UploadCard"
import ResultsPanel from "./components/ResultsPanel"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function App() {
  const [data, setData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUploadStart = () => {
    setIsProcessing(true)
    setData(null)
  }

  const handleResult = (result) => {
    setData(result)
    setIsProcessing(false)
  }

  const handleError = () => {
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="text-blue-600">Clini</span>
            <span className="text-teal-600">Scribe</span>
            <span className="ml-3">🎓</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your lecture recordings into structured study notes with AI-powered transcription and intelligent summarization
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              🎙️ Audio Transcription
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
              📝 Structured Notes
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              ⚡ Fast Processing
            </span>
          </div>
        </div>

        {/* Upload Card */}
        <UploadCard 
          onResult={handleResult}
          onUploadStart={handleUploadStart}
          onError={handleError}
          isProcessing={isProcessing}
        />

        {/* Results Panel */}
        {data && <ResultsPanel data={data} />}
      </main>

      <Footer />
    </div>
  )
}