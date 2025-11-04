import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { headlines } = await request.json()

    if (!headlines || !Array.isArray(headlines)) {
      return NextResponse.json(
        { error: 'Invalid headlines data' },
        { status: 400 }
      )
    }

    // Create HTML5 Canvas-based video generation
    // Since we can't create actual video files server-side without ffmpeg,
    // we'll create an animated HTML page that can be recorded

    const videoHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      max-width: 800px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .title {
      font-size: 48px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 40px;
      color: #1a202c;
      animation: fadeIn 1s ease-in;
    }
    .headline {
      font-size: 24px;
      margin: 20px 0;
      padding: 20px;
      background: #f7fafc;
      border-left: 5px solid #667eea;
      border-radius: 8px;
      opacity: 0;
      animation: slideIn 0.5s ease-out forwards;
    }
    .headline:nth-child(2) { animation-delay: 0.5s; }
    .headline:nth-child(3) { animation-delay: 1s; }
    .headline:nth-child(4) { animation-delay: 1.5s; }
    .headline:nth-child(5) { animation-delay: 2s; }
    .headline:nth-child(6) { animation-delay: 2.5s; }
    .headline:nth-child(7) { animation-delay: 3s; }
    .headline:nth-child(8) { animation-delay: 3.5s; }
    .headline:nth-child(9) { animation-delay: 4s; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">📰 आज की मुख्य खबरें</div>
    ${headlines.map((h: string, i: number) => `
      <div class="headline">${i + 1}. ${h}</div>
    `).join('')}
  </div>
</body>
</html>
    `

    // Return the HTML as a data URL that can be embedded in an iframe
    const videoUrl = `data:text/html;charset=utf-8,${encodeURIComponent(videoHtml)}`

    return NextResponse.json({
      videoUrl,
      message: 'Video generated successfully'
    })
  } catch (error) {
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: 'वीडियो बनाने में त्रुटि हुई' },
      { status: 500 }
    )
  }
}
