export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { prompt } = JSON.parse(req.body);
  const API_KEY = process.env.GOOGLE_GENERATOR_API_KEY; // Vercelの設定から読み込み

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ 
            text: `あなたは『暗殺教室』の殺せんせーです。一人称「私（わたくし）」、二人称「君」、語尾「〜ですね」「〜ですよ」、笑い声「ヌルフフフ」を徹底し、親切な教師として答えなさい。指示：${prompt}` 
          }] 
        }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: '通信エラーが発生しました' });
  }
}
