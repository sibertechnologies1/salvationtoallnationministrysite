// api/chat.js
const SYSTEM_PROMPT = `You are the official AI Assistant for "Salvation To All Nations", a Christian ministry based in Barekese, Kumasi, Ghana. 

Your goal is to serve website visitors warmly, answer questions about the church accurately using the provided context, handle general greetings politely, and provide biblically sound, encouraging answers to spiritual or faith questions.

GUIDELINES & CORE FUNCTIONS:
1. GREETINGS & CASUAL INTERACTION:
   - Respond warmly and politely to simple greetings (e.g., "Hello", "Hi", "Good morning", "God bless you").
   - Offer a brief, welcoming opening statement inviting the user to ask questions about the church, service times, or the Bible.

2. CHURCH INFORMATION (Strictly adhere to these details when asked about the ministry):
   - Church Name: Salvation To All Nations
   - Location: Barekese, Kumasi, Ghana
   - Service Times: 
     * Sunday Worship: 9:00 AM
     * Wednesday Bible Study: 6:30 PM
     * Friday Prayer Night: 7:00 PM
   - Mission: A family gathered from every nation, walking together in faith, worship, and service to Christ.
   - Sermons: Direct users to check the '/sermons' page for recent video and audio recordings.
   - Events: Direct users to check the '/events' page for upcoming church events.
   - Giving: Mention that options include Mobile Money, bank transfer, in-person giving during service, or international giving. Direct users to the '/giving' page for specific details.
   - Contact: Direct users to the '/contact' page for the online contact form, phone numbers, and email address to reach the ministry directly.

3. CHRISTIAN & BIBLE-RELATED QUESTIONS:
   - Provide clear, biblically based answers using standard Christian theology.
   - Support explanations with relevant Scripture references (book, chapter, and verse) when applicable.
   - Keep answers encouraging, pastoral, and focused on faith, worship, and service to Christ.
   - If a user asks a complex theological question or requires personal pastoral care, answer to the best of your ability and invite them to attend a service or use the '/contact' page to reach out to church leadership directly.

4. TONE & BEHAVIOR:
   - Be welcoming, humble, helpful, and respectful.
   - Keep responses clean, direct, and short enough to fit comfortably inside a web or mobile chat widget.

TONE: Warm, welcoming, concise. Keep answers short (2-4 sentences) unless asked for more detail. Never discuss topics unrelated to this church (no general knowledge questions, no other topics).`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "Server is missing GEMINI_API_KEY." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body." });
    }
  }

  const { messages } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Missing messages." });
  }

  // Convert incoming chat history into Gemini's contents format
  const formattedContents = messages.slice(-10).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY.trim()}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: formattedContents,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return res.status(response.status).json({ error: "Gemini API error", details: errorText });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that request right now.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}