'use client'

import { useState } from 'react'

export default function Home() {
  const [headlines, setHeadlines] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const fetchHeadlines = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/headlines')
      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setHeadlines(data.headlines)
      }
    } catch (err) {
      setError('समाचार लाने में त्रुटि हुई')
    }
    setLoading(false)
  }

  const generateVideo = async () => {
    setGenerating(true)
    setError(null)
    setVideoUrl(null)
    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ headlines }),
      })
      const data = await response.json()
      if (data.error) {
        setError(data.error)
      } else {
        setVideoUrl(data.videoUrl)
      }
    } catch (err) {
      setError('वीडियो बनाने में त्रुटि हुई')
    }
    setGenerating(false)
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          📰 आज की समाचार Video Generator
        </h1>

        <div className="space-y-6">
          <div className="text-center">
            <button
              onClick={fetchHeadlines}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'लोड हो रहा है...' : 'आज की Headlines लाएं'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {headlines.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">आज की मुख्य खबरें:</h2>
              <ul className="space-y-2">
                {headlines.map((headline, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <span className="font-semibold text-gray-700">{index + 1}.</span> {headline}
                  </li>
                ))}
              </ul>

              <div className="text-center pt-4">
                <button
                  onClick={generateVideo}
                  disabled={generating}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg disabled:bg-gray-400 transition-colors"
                >
                  {generating ? '🎬 Video बन रहा है...' : '🎬 Video Generate करें'}
                </button>
              </div>
            </div>
          )}

          {videoUrl && (
            <div className="bg-green-50 border border-green-400 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">✅ Video तैयार है!</h3>
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                src={videoUrl}
              >
                आपका ब्राउज़र वीडियो नहीं चला सकता।
              </video>
              <a
                href={videoUrl}
                download="aaj-ki-headlines.mp4"
                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                📥 Download करें
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>आज की ताज़ा खबरों को वीडियो फॉर्मेट में देखें</p>
        </div>
      </div>
    </main>
  )
}
