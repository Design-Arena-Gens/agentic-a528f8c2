import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Simulated Hindi news headlines for today
    const headlines = [
      'भारत की अर्थव्यवस्था में तेजी, GDP वृद्धि 7.2% रही',
      'दिल्ली में प्रदूषण का स्तर खतरनाक, AQI 400 के पार',
      'क्रिकेट: भारत ने ऑस्ट्रेलिया को 5 विकेट से हराया',
      'नई शिक्षा नीति के तहत डिजिटल क्लासरूम की शुरुआत',
      'मुंबई में मेट्रो की नई लाइन का उद्घाटन, यात्रियों को मिलेगी राहत',
      'स्वास्थ्य मंत्रालय ने लॉन्च की नई टीकाकरण योजना',
      'आईटी सेक्टर में नई नौकरियां, 50 हजार पदों की भर्ती',
      'बॉलीवुड: आगामी फिल्म ने तोड़े सभी एडवांस बुकिंग रिकॉर्ड'
    ]

    return NextResponse.json({ headlines })
  } catch (error) {
    return NextResponse.json(
      { error: 'समाचार लाने में त्रुटि हुई' },
      { status: 500 }
    )
  }
}
