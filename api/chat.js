// api/chat.js
// Vercel Serverless Function for Salvation To All Nations AI Assistant
// Proxies requests to Groq API while protecting authoritative church information.

const CHURCH_INFO = {
  name: "Salvation To All Nations",
  location: "Barekese, Kumasi, Ghana",
  district: "Atwima Nwabiagya North District",

  services: {
    sunday: "Sunday Worship: 9:00 AM",
    wednesday: "Wednesday Bible Study: 6:30 PM",
    friday: "Friday Prayer Night: 7:00 PM",
  },

  mission:
    "A family gathered from every nation, walking together in faith, worship, and service to Christ.",

  sermons:
    "Check the '/sermons' page for recent video and audio sermon recordings.",

  events:
    "Check the '/events' page for upcoming church events.",

  giving:
    "Giving options include Mobile Money, bank transfer, in-person giving during service, or international giving. Check the '/giving' page for specific details.",

  contact:
    "Check the '/contact' page for the online contact form, phone numbers, and email address to reach the ministry directly.",
};


// ============================================================
// SYSTEM PROMPT
// ============================================================

const SYSTEM_PROMPT = `
You are the official church assistant for "Salvation To All Nations", a Christian ministry based in Barekese, Kumasi, Ghana.

ROLE:
- Speak warmly, naturally, respectfully, and pastorally.
- Answer Bible and Christian questions clearly and biblically.
- Answer questions about Salvation To All Nations using ONLY the authoritative church information supplied below.
- Never invent church facts, addresses, phone numbers, emails, service times, events, ministries, leaders, history, or other details that are not provided.
- Never mention that you are an AI, language model, chatbot, model, or artificial intelligence.
- Do not pretend to know information that is not provided.

AUTHORITATIVE CHURCH INFORMATION:

Church Name:
Salvation To All Nations

Location:
Barekese, Kumasi, Ghana

District:
Atwima Nwabiagya North District

Service Times:
- Sunday Worship: 9:00 AM
- Wednesday Bible Study: 6:30 PM
- Friday Prayer Night: 7:00 PM

Mission:
A family gathered from every nation, walking together in faith, worship, and service to Christ.

Sermons:
Users should check the '/sermons' page for recent video and audio sermon recordings.

Events:
Users should check the '/events' page for upcoming church events.

Giving:
Options include Mobile Money, bank transfer, in-person giving during service, or international giving.
Users should check the '/giving' page for specific details.

Contact:
Users should check the '/contact' page for the online contact form, phone numbers, and email address to reach the ministry directly.

CHURCH INFORMATION RULES:

1. Use the authoritative church information exactly.
2. Never change, reinterpret, or guess church facts.
3. If the user asks for specific address details that are not provided, direct them to '/contact'.
4. If the user asks about sermons, direct them to '/sermons'.
5. If the user asks about events, direct them to '/events'.
6. If the user asks about giving, provide only the known giving options and direct them to '/giving' for specific details.
7. If the user asks for contact information, direct them to '/contact'.
8. If the user asks about a church fact that is not provided, say that the available church information does not specify it and direct them to the appropriate page when possible.
9. Never create additional church information just to make an answer sound complete.

BIBLE AND CHRISTIAN QUESTIONS:

You may answer questions about:
- The Bible
- Bible verses and passages
- Jesus Christ
- God
- The Holy Spirit
- Salvation
- Faith
- Prayer
- Sin and repentance
- Forgiveness
- Grace
- Love
- Worship
- Christian living
- Biblical characters
- Biblical events
- Christian doctrine
- Spiritual growth
- Other genuine Bible or Christian-related questions

For Bible and Christian questions:
- Give a concise, biblically sound answer.
- Avoid unnecessary theological lectures.
- If the user asks for explanation or deeper detail, provide more detail.
- Do not present personal opinions as biblical facts.
- When different Christian interpretations exist, briefly acknowledge them when necessary.

BIBLE VERSE REQUESTS:

If the user asks for a specific Bible verse, such as:
- John 3:16
- Joshua 1:8
- Romans 8:28

Provide:
1. The verse reference.
2. The verse text.
3. A brief explanation of its main message.

Keep the response concise.

Use a standard Bible translation when possible. Prefer KJV when a complete quotation is required.

FULL CHAPTER OR PSALM REQUESTS:

If the user explicitly asks for an entire chapter or Psalm, such as:
- John chapter 1
- Psalm 23
- Genesis 1

Provide the complete passage from the beginning to the end of the requested chapter or Psalm, followed by a brief explanation.

Do not replace the requested complete passage with an abbreviated summary.

GENERAL RESPONSE STYLE:

- Keep normal responses concise.
- Usually answer in 1–5 sentences.
- Do not add unnecessary introductions.
- Do not repeat the user's question.
- Do not use unnecessary filler.
- Do not say:
  "As an AI..."
  "As a language model..."
  "I'm here to help..."
  "Feel free to ask..."
  "Don't hesitate..."
  "Let's dive in..."
  "Based on the information provided..."
  "According to the information provided..."
- Answer directly.

GREETING AND SMALL TALK:

For greetings such as:
- Hello
- Hi
- Good morning
- How are you?
- What's up?

Respond naturally and warmly in 1–2 sentences.

Do not unnecessarily give a long church introduction.

IMPORTANT:
Accuracy is more important than sounding complete.
If information is unknown, do not guess.
`;


// ============================================================
// CHURCH INTENT DETECTION
// ============================================================

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function detectChurchIntent(message) {
  const text = normalizeText(message);

  // LOCATION
  if (
    containsAny(text, [
      "where is salvation to all nations",
      "where is salvation to all nation",
      "where is the church",
      "where is your church",
      "where are you located",
      "where are you based",
      "where is the ministry",
      "where is your ministry",
      "church location",
      "church address",
      "ministry location",
      "ministry address",
      "location of the church",
      "location of salvation",
      "where can i find the church",
      "where can i find salvation",
      "where can we find the church",
      "where do you worship",
      "where do you guys worship",
      "which area is the church",
      "which area are you in",
      "which part of kumasi",
      "which part of kumasi are you",
      "what area is the church",
      "what town is the church in",
      "what town are you in",
      "which district is the church",
      "what district is the church",
      "what district are you in",
      "which district are you located",
      "what is your location",
      "tell me your location",
      "tell me where the church is",
      "church situated",
      "church based",
      "ministry based",
      "are you in barekese",
      "is the church in barekese",
      "is salvation to all nations in barekese",
    ])
  ) {
    return "location";
  }

  // SERVICE TIMES
  if (
    containsAny(text, [
      "service time",
      "service times",
      "church service",
      "church services",
      "when is sunday service",
      "when is sunday worship",
      "what time is sunday service",
      "what time is sunday worship",
      "sunday worship",
      "sunday service",
      "wednesday bible study",
      "when is bible study",
      "what time is bible study",
      "bible study time",
      "friday prayer",
      "friday prayer night",
      "when is prayer night",
      "what time is prayer night",
      "prayer night time",
      "church schedule",
      "service schedule",
      "worship time",
      "what time do you worship",
      "when do you worship",
      "when are your services",
      "when is your service",
      "when do services start",
      "what time does church start",
    ])
  ) {
    return "services";
  }

  // MISSION
  if (
    containsAny(text, [
      "church mission",
      "your mission",
      "ministry mission",
      "what is the mission",
      "what's the mission",
      "mission of the church",
      "mission of salvation to all nations",
      "what does the church stand for",
      "what does salvation to all nations stand for",
      "church vision",
      "ministry vision",
    ])
  ) {
    return "mission";
  }

  // SERMONS
  if (
    containsAny(text, [
      "sermon",
      "sermons",
      "preaching",
      "preachings",
      "recent sermon",
      "recent sermons",
      "latest sermon",
      "latest sermons",
      "church message",
      "church messages",
      "sermon recording",
      "sermon recordings",
      "sermon video",
      "sermon videos",
      "sermon audio",
      "sermon audios",
      "listen to sermons",
      "watch sermons",
      "where can i watch sermons",
      "where can i find sermons",
      "where are the sermons",
    ])
  ) {
    return "sermons";
  }

  // EVENTS
  if (
    containsAny(text, [
      "church event",
      "church events",
      "upcoming event",
      "upcoming events",
      "church program",
      "church programs",
      "upcoming program",
      "upcoming programs",
      "what events do you have",
      "what events are coming",
      "what programs are coming",
      "church activities",
      "upcoming church activities",
      "where can i see church events",
      "where can i find church events",
    ])
  ) {
    return "events";
  }

  // GIVING
  if (
    containsAny(text, [
      "giving",
      "give to the church",
      "give to salvation to all nations",
      "donate to the church",
      "donation",
      "donations",
      "offering",
      "tithe",
      "tithes",
      "how can i give",
      "how do i give",
      "ways to give",
      "giving options",
      "how can i donate",
      "how do i donate",
      "mobile money",
      "momo",
      "bank transfer",
      "international giving",
    ])
  ) {
    return "giving";
  }

  // CONTACT
  if (
    containsAny(text, [
      "contact the church",
      "contact salvation to all nations",
      "contact the ministry",
      "church contact",
      "ministry contact",
      "church phone",
      "church number",
      "church telephone",
      "church email",
      "ministry phone",
      "ministry number",
      "ministry email",
      "phone number",
      "email address",
      "how can i contact",
      "how do i contact",
      "contact information",
      "contact details",
      "get in touch with the church",
      "reach the church",
      "reach the ministry",
      "contact form",
    ])
  ) {
    return "contact";
  }

  return null;
}


// ============================================================
// EXACT CHURCH RESPONSES
// ============================================================

function getChurchResponse(intent) {
  switch (intent) {
    case "location":
      return `Salvation To All Nations is located in ${CHURCH_INFO.location}, in the ${CHURCH_INFO.district}. For specific address details, please check the '/contact' page.`;

    case "services":
      return `Our services are ${CHURCH_INFO.services.sunday}, ${CHURCH_INFO.services.wednesday}, and ${CHURCH_INFO.services.friday}.`;

    case "mission":
      return `Our mission is: "${CHURCH_INFO.mission}"`;

    case "sermons":
      return `For recent video and audio sermons, please check the '/sermons' page.`;

    case "events":
      return `For upcoming church events, please check the '/events' page.`;

    case "giving":
      return `${CHURCH_INFO.giving}`;

    case "contact":
      return `${CHURCH_INFO.contact}`;

    default:
      return null;
  }
}


// ============================================================
// HANDLER
// ============================================================

export default async function handler(req, res) {
  // ----------------------------------------------------------
  // 1. CORS
  // ----------------------------------------------------------

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle browser OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ----------------------------------------------------------
  // 2. POST ONLY
  // ----------------------------------------------------------

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // ----------------------------------------------------------
  // 3. GROQ API KEY
  // ----------------------------------------------------------

  const API_KEY = process.env.GROQ_API_KEY;

  if (!API_KEY) {
    console.error("Missing GROQ_API_KEY environment variable.");

    return res.status(500).json({
      error: "Server is missing GROQ_API_KEY.",
    });
  }

  // ----------------------------------------------------------
  // 4. PARSE REQUEST BODY
  // ----------------------------------------------------------

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        error: "Invalid JSON body.",
      });
    }
  }

  const { messages } = body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: "Missing or invalid messages array.",
    });
  }

  // ----------------------------------------------------------
  // 5. FIND LAST USER MESSAGE
  // ----------------------------------------------------------

  const lastUserMessage = [...messages]
    .reverse()
    .find(
      (message) =>
        message &&
        message.role === "user" &&
        typeof message.content === "string"
    );

  if (!lastUserMessage) {
    return res.status(400).json({
      error: "No valid user message found.",
    });
  }

  const userText = lastUserMessage.content.trim();

  if (!userText) {
    return res.status(400).json({
      error: "User message cannot be empty.",
    });
  }

  // ----------------------------------------------------------
  // 6. HANDLE AUTHORITATIVE CHURCH QUESTIONS FIRST
  // ----------------------------------------------------------
  //
  // This is the most important change.
  //
  // Known church facts are answered by our own code instead
  // of asking Groq to generate them.
  //
  // Therefore Groq cannot change:
  //
  // Atwima Nwabiagya North District
  //
  // into another district.
  // ----------------------------------------------------------

  const churchIntent = detectChurchIntent(userText);

  if (churchIntent) {
    const churchResponse = getChurchResponse(churchIntent);

    if (churchResponse) {
      return res.status(200).json({
        reply: churchResponse,
      });
    }
  }

  // ----------------------------------------------------------
  // 7. KEEP ONLY RECENT CONVERSATION HISTORY
  // ----------------------------------------------------------
  //
  // ALLaM-2-7B has a 4K context window.
  // Keeping the recent conversation shorter leaves room
  // for the system instructions and generated response.
  // ----------------------------------------------------------

  const recentMessages = messages
    .filter(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string"
    )
    .slice(-6);

  // ----------------------------------------------------------
  // 8. CALL GROQ
  // ----------------------------------------------------------

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY.trim()}`,
        },

        body: JSON.stringify({
          model: "allam-2-7b",

          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...recentMessages,
          ],

          // Lower temperature = more consistent responses
          temperature: 0.2,

          // Use the current Groq parameter
          max_completion_tokens: 1600,

          // We don't need extra generated choices
          n: 1,
        }),
      }
    );

    // --------------------------------------------------------
    // 9. HANDLE GROQ ERRORS
    // --------------------------------------------------------

    if (!response.ok) {
      const errorBody = await response.text();

      console.error("Groq API error response:", errorBody);

      return res.status(response.status).json({
        error: "Groq API request failed.",
        details: errorBody,
      });
    }

    // --------------------------------------------------------
    // 10. PARSE GROQ RESPONSE
    // --------------------------------------------------------

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't come up with a response.";

    // --------------------------------------------------------
    // 11. RETURN RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    console.error("Unexpected chat server error:", err);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
}