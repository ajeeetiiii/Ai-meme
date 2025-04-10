export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
      }),
    });

    const data = await response.json();

    res.status(200).json({ text: data.choices[0].message.content });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Kuch gadbad ho gayi",
      details: error.message,
    });
  }
}