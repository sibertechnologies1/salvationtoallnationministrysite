// api/chat.js
// Vercel Serverless Function for Salvation To All Nations AI Assistant
// Uses Google Gemini API for Bible, Christian, and general questions.
// Authoritative church information is handled directly by server-side code.


// ============================================================
// AUTHORITATIVE CHURCH INFORMATION
// ============================================================

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
// GEMINI SYSTEM PROMPT
// ============================================================

const SYSTEM_PROMPT = `
You are the official church assistant for Salvation To All Nations, a Christian ministry based in Barekese, Kumasi, Ghana.

YOUR ROLE:

You are a warm, natural, respectful and helpful church assistant.

You answer:

- Bible questions
- Bible verse questions
- Bible chapter questions
- Christian questions
- Questions about Jesus Christ
- Questions about God
- Questions about the Holy Spirit
- Questions about faith
- Questions about prayer
- Questions about salvation
- Questions about sin and repentance
- Questions about forgiveness
- Questions about grace
- Questions about Christian living
- Questions about worship
- Questions about biblical characters
- Questions about biblical events
- Questions about Christian doctrine
- Questions about spiritual growth
- General greetings and small talk

You may also answer questions about Salvation To All Nations, but church-specific facts must follow the authoritative information provided below.

IMPORTANT CHURCH FACT RULES:

The following information is authoritative:

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

NEVER:

- Change the church location.
- Change the district name.
- Invent an address.
- Invent phone numbers.
- Invent email addresses.
- Invent service times.
- Invent church leaders.
- Invent church history.
- Invent church programs.
- Invent church events.
- Invent ministries.
- Invent giving details.
- Guess missing church information.
- Mention information as fact when it is not provided.

If specific church information is not provided, say that the available information does not specify it and direct the user to the appropriate page when possible.

BIBLE AND CHRISTIAN QUESTIONS:

You are NOT limited to a small list of Bible verses.

Recognize Bible references naturally, including any valid:

- Bible book
- Chapter
- Verse
- Verse range
- Passage
- Psalm

Examples include:

John 3:16
Psalm 23:1
Psalm 23
Matthew 5:1-12
Romans 8:28
Romans 12:1-2
Genesis 1
1 Corinthians 13:4-7
Ephesians 2:8-9
Revelation 21:4

These are examples only.

Do NOT treat the examples above as a restricted list.

Understand natural variations such as:

"What does John 3:16 say?"
"Explain John 3:16."
"Give me John chapter 3 verse 16."
"What does Psalm 23:4 mean?"
"Read Matthew 5:1-12."
"What does the Bible say about forgiveness?"
"How can I strengthen my faith?"
"Why should Christians pray?"
"What is salvation?"
"Who is Jesus?"

Answer genuine Bible and Christian questions naturally.

BIBLE VERSE QUESTIONS:

When a user asks about a specific Bible verse:

- Give the reference.
- Give the verse text when appropriate.
- Give a brief explanation.
- Keep the response concise unless the user asks for more detail.

FULL CHAPTER OR PSALM REQUESTS:

If the user explicitly asks for a complete Bible chapter or complete Psalm:

- Provide the complete requested passage when possible.
- Do not replace an explicit full-chapter request with only a summary.
- Prefer KJV when a complete quotation is required.
- After the passage, provide a short explanation of the main message.

NORMAL RESPONSE LENGTH:

For normal questions, keep answers concise.

Usually use 1–5 sentences.

If the user asks for more explanation, provide more detail.

GREETING AND SMALL TALK:

For messages such as:

Hello
Hi
Good morning
Good afternoon
How are you?
What's up?

Respond naturally and warmly.

Do not automatically give a church introduction.

DO NOT USE FILLER:

Never repeatedly say:

"Feel free to ask..."
"Don't hesitate..."
"I'm here to help..."
"Let's dive in..."
"Based on the information provided..."
"According to the information provided..."
"What would you like to know today?"
"If you have any questions..."
"Please feel free..."

Answer the user's actual question directly.

NEVER DISCLOSE YOUR AI IDENTITY:

Never say:

"As an AI..."
"As an AI language model..."
"I am an AI..."
"I am a chatbot..."
"As a language model..."
"According to my training..."

Speak naturally as the official church assistant.

IMPORTANT:

Accuracy is more important than sounding complete.

Never invent information.
`;


// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}


// ============================================================
// KEYWORD HELPER
// ============================================================

function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}


// ============================================================
// CHURCH INTENT DETECTION
// ============================================================

function detectChurchIntent(message) {
  const text = normalizeText(message);

  // ----------------------------------------------------------
  // LOCATION
  // ----------------------------------------------------------

  if (
    containsAny(text, [
      "where is salvation to all nations",
      "where is salvation to all nation",
      "location of salvation to all nations",
      "location of salvation",
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


  // ----------------------------------------------------------
  // SERVICE TIMES
  // ----------------------------------------------------------

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


  // ----------------------------------------------------------
  // MISSION
  // ----------------------------------------------------------

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


  // ----------------------------------------------------------
  // SERMONS
  // ----------------------------------------------------------

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


  // ----------------------------------------------------------
  // EVENTS
  // ----------------------------------------------------------

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


  // ----------------------------------------------------------
  // GIVING
  // ----------------------------------------------------------

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


  // ----------------------------------------------------------
  // CONTACT
  // ----------------------------------------------------------

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
      return CHURCH_INFO.giving;

    case "contact":
      return CHURCH_INFO.contact;

    default:
      return null;
  }
}


// ============================================================
// CONVERT FRONTEND MESSAGES TO GEMINI FORMAT
// ============================================================

function convertMessagesToGemini(messages) {
  return messages
    .filter(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim()
    )
    .slice(-10)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",

      parts: [
        {
          text: message.content.trim(),
        },
      ],
    }));
}


// ============================================================
// HANDLER
// ============================================================

export default async function handler(req, res) {
  // ----------------------------------------------------------
  // 1. CORS
  // ----------------------------------------------------------

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );


  // ----------------------------------------------------------
  // OPTIONS
  // ----------------------------------------------------------

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  // ----------------------------------------------------------
  // POST ONLY
  // ----------------------------------------------------------

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }


  // ----------------------------------------------------------
  // GEMINI API KEY
  // ----------------------------------------------------------

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY environment variable.");

    return res.status(500).json({
      error: "Server is missing GEMINI_API_KEY.",
    });
  }


  // ----------------------------------------------------------
  // PARSE BODY
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
  // FIND LAST USER MESSAGE
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
  // HANDLE CHURCH INFORMATION DIRECTLY
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
  // CONVERT CHAT HISTORY
  // ----------------------------------------------------------

  const geminiContents = convertMessagesToGemini(messages);


  if (geminiContents.length === 0) {
    return res.status(400).json({
      error: "No valid conversation messages found.",
    });
  }


  // ----------------------------------------------------------
  // GEMINI API REQUEST
  // ----------------------------------------------------------

  try {
    // Models to try in order of preference
const MODELS = ["gemini-3.7-flash", "gemini-2.5-flash", "gemini-1.5-flash"];

let response;
let lastErrorDetails;

for (const model of MODELS) {
  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": API_KEY.trim(),
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200,
            candidateCount: 1,
          },
        }),
      }
    );

    if (response.ok) {
      break; // Success! Exit the loop.
    }

    lastErrorDetails = await response.text();
    console.warn(`Model ${model} failed with status ${response.status}. Trying next fallback...`);
  } catch (err) {
    console.error(`Fetch error with model ${model}:`, err);
  }
}

if (!response || !response.ok) {
  return res.status(503).json({
    error: "Gemini API request failed across all model fallbacks.",
    details: lastErrorDetails,
  });
}


    // --------------------------------------------------------
    // GEMINI ERROR
    // --------------------------------------------------------

    if (!response.ok) {
      const errorBody = await response.text();

      console.error("Gemini API error:", errorBody);

      return res.status(response.status).json({
        error: "Gemini API request failed.",
        details: errorBody,
      });
    }


    // --------------------------------------------------------
    // GEMINI RESPONSE
    // --------------------------------------------------------

    const data = await response.json();


    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim();


    // --------------------------------------------------------
    // EMPTY RESPONSE
    // --------------------------------------------------------

    if (!reply) {
      console.error("Gemini returned no usable response:", data);

      return res.status(500).json({
        error: "Gemini returned an empty response.",
      });
    }


    // --------------------------------------------------------
    // RETURN RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({
      reply,
    });


  } catch (error) {
    console.error("Unexpected Gemini server error:", error);

    return res.status(500).json({
      error: "Internal server error.",
      details:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
}