export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    console.log("Prompt mila:", prompt);
    console.log("API Key mili:", process.env.OPENAI_API_KEY ? "Yes" : "No");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50
      })
    });

    const data = await response.json();
    console.log("OpenAI Response:", data);

    res.status(200).json({ text: data.choices[0].message.content });

  } catch (error) {
    console.error("Error aayi:", error.message);
    res.status(500).json({ error: "Kuch gadbad ho gayi", details: error.message });
  }
}