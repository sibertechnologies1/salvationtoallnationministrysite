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

Church Name: Salvation To All Nations
Location: Barekese, Kumasi, Ghana
District: Atwima Nwabiagya North District

Service Times:
- Sunday Worship: 9:00 AM
- Wednesday Bible Study: 6:30 PM
- Friday Prayer Night: 7:00 PM

Mission:
A family gathered from every nation, walking together in faith, worship, and service to Christ.

Sermons:
Check '/sermons' page for recent video and audio sermon recordings.

Events:
Check '/events' page for upcoming church events.

Giving:
Options include Mobile Money, bank transfer, in-person giving, or international giving. Check '/giving' page.

Contact:
Check '/contact' page for online contact form, phone numbers, and email address.

NEVER:

- Change the church location or district.
- Invent addresses, phone numbers, email addresses, service times, leaders, history, programs, events, or giving details.
- Guess missing church information.

If specific church information is not provided, state that the available information does not specify it and direct the user to the appropriate site page.

BIBLE AND CHRISTIAN QUESTIONS:

Answer genuine Bible and Christian questions naturally.

Recognize references across book, chapter, verse, and passages.

BIBLE VERSE QUESTIONS:

When asked about a verse, give reference, verse text when appropriate, and a brief explanation.

Keep answers concise unless asked for details.

FULL CHAPTER OR PSALM REQUESTS:

When asked for a full chapter/psalm, provide the complete passage (prefer KJV) followed by a short explanation of the main message.

DEVELOPER & TECHNOLOGY PARTNER INFORMATION:

- Website Developer: Tiroug Boadzie Ebenezer
- Development Brand: Siber Technologies
- Role: Website Developer / Frontend Developer
- Technology Partner: Siber Technologies
- The Salvation To All Nations Ministry website was designed and developed by Tiroug Boadzie Ebenezer of Siber Technologies.
- Siber Technologies is responsible for the website's design, development, technical implementation, and ongoing technical improvements.
- Tiroug Boadzie Ebenezer is a Computer Science professional and web developer.
- His frontend technologies include HTML, CSS, JavaScript, React.js, Tailwind CSS, and Bootstrap.
- His backend technologies include PHP, Node.js, Express.js, and MySQL.
- The website uses modern web technologies and was developed with a focus on responsiveness, usability, performance, and maintainability.

DEVELOPER QUESTIONS:

When a visitor asks about who developed, designed, created, built, maintains, or provides the technology for this website:

- Identify Tiroug Boadzie Ebenezer as the website developer.
- Mention Siber Technologies as the technology/development partner.
- If appropriate, describe Siber Technologies as the team/brand responsible for the website's technical development.
- Do not confuse the developer or Siber Technologies with the church's founder, pastor, leadership, staff, or ministry members.
- Do not invent additional information about Tiroug Boadzie Ebenezer or Siber Technologies.
- Only provide information contained in this developer instruction.

EXAMPLE RESPONSES:

If asked "Who developed this website?":
"This website was designed and developed by Tiroug Boadzie Ebenezer of Siber Technologies."

If asked "Who is responsible for the technology behind this website?":
"The technology and development of this website are handled by Siber Technologies, led by website developer Tiroug Boadzie Ebenezer."

If asked "Tell me about the developer":
"The website developer is Tiroug Boadzie Ebenezer of Siber Technologies. He is a Computer Science professional and web developer with experience in frontend and backend web technologies."

If asked "What company developed the website?":
"The website was developed by Siber Technologies, with Tiroug Boadzie Ebenezer serving as the website developer."

If asked "How can I get a website like this?":
"Websites like this can be designed and developed by Siber Technologies. The website developer is Tiroug Boadzie Ebenezer."

NORMAL RESPONSE LENGTH:

Keep standard answers concise (1–5 sentences).

GREETING AND SMALL TALK:

Respond naturally and warmly without forcing an automatic church pitch.

DO NOT USE FILLER / DISCLOSE AI IDENTITY:

Answer questions directly.

Never use artificial filler phrases such as:
- "feel free to ask"
- "let's dive in"

Never disclose AI identity such as:
- "As an AI language model..."
- "I am an AI..."

Always answer naturally.
`;

// ============================================================
// TEXT NORMALIZATION
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

  // LOCATION
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

  // SERVICES
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
// WAIT HELPER
// ============================================================

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
// GEMINI REQUEST
// ============================================================

async function requestGemini({
  model,
  apiKey,
  contents,
  timeoutMs = 9000,
}) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey.trim(),
        },

        signal: controller.signal,

        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: SYSTEM_PROMPT,
              },
            ],
          },

          contents,

          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200,
            candidateCount: 1,
          },
        }),
      }
    );

    const responseText = await response.text();

    let data = null;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = null;
    }

    if (!response.ok) {
      const errorMessage =
        data?.error?.message ||
        responseText ||
        `Gemini returned HTTP ${response.status}`;

      const error = new Error(errorMessage);

      error.status = response.status;
      error.response = data;

      throw error;
    }

    const extractedText = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!extractedText) {
      throw new Error("Gemini returned an empty response.");
    }

    return extractedText;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ============================================================
// HANDLER
// ============================================================

export default async function handler(req, res) {
  // ==========================================================
  // CORS
  // ==========================================================

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

  // ==========================================================
  // OPTIONS
  // ==========================================================

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ==========================================================
  // ONLY POST
  // ==========================================================

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // ==========================================================
  // GEMINI API KEY
  // ==========================================================

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error("Missing GEMINI_API_KEY environment variable.");

    return res.status(500).json({
      error: "Server is missing GEMINI_API_KEY.",
    });
  }

  // ==========================================================
  // PARSE REQUEST BODY
  // ==========================================================

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

  // ==========================================================
  // FIND LAST USER MESSAGE
  // ==========================================================

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

  // ==========================================================
  // HANDLE CHURCH QUESTIONS LOCALLY
  // ==========================================================

  const churchIntent = detectChurchIntent(userText);

  if (churchIntent) {
    const churchResponse = getChurchResponse(churchIntent);

    if (churchResponse) {
      return res.status(200).json({
        reply: churchResponse,
      });
    }
  }

  // ==========================================================
  // CONVERT MESSAGES
  // ==========================================================

  const geminiContents = convertMessagesToGemini(messages);

  if (geminiContents.length === 0) {
    return res.status(400).json({
      error: "No valid conversation messages found.",
    });
  }

  // ==========================================================
  // GEMINI MODELS
  // ==========================================================
  //
  // These are current Gemini API model IDs.
  //
  // Primary:
  // gemini-2.5-flash
  //
  // Fallbacks:
  // gemini-2.5-flash-lite
  // gemini-3.5-flash
  //
  // If one model is temporarily unavailable, another is tried.
  //
  // ==========================================================

 const MODELS = [
  "gemini-3.8-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash-lite",
];

  let lastError = null;

  // ==========================================================
  // TRY MODELS
  // ==========================================================

  for (let modelIndex = 0; modelIndex < MODELS.length; modelIndex++) {
    const model = MODELS[modelIndex];

    // --------------------------------------------------------
    // Each model gets up to 2 attempts for temporary errors.
    // --------------------------------------------------------

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(
          `Gemini request: model=${model}, attempt=${attempt}`
        );

        const reply = await requestGemini({
          model,
          apiKey: API_KEY,
          contents: geminiContents,
          timeoutMs: 9000,
        });

        // ----------------------------------------------------
        // SUCCESS
        // ----------------------------------------------------

        console.log(`Gemini success using model: ${model}`);

        return res.status(200).json({
          reply,
        });
      } catch (error) {
        lastError = error;

        console.error(
          `Gemini error: model=${model}, attempt=${attempt}, status=${error.status || "unknown"}, message=${error.message}`
        );

        // ----------------------------------------------------
        // INVALID REQUEST / API KEY
        // ----------------------------------------------------
        //
        // Do not waste time retrying a permanent error.
        //

        if (
          error.status === 400 ||
          error.status === 401 ||
          error.status === 403
        ) {
          return res.status(error.status).json({
            error:
              error.status === 400
                ? "Gemini rejected the request."
                : "Gemini API authentication failed.",
            details: error.message,
          });
        }

        // ----------------------------------------------------
        // RETRY TEMPORARY ERRORS
        // ----------------------------------------------------

        const temporaryError =
          error.status === 429 ||
          error.status === 500 ||
          error.status === 502 ||
          error.status === 503 ||
          error.status === 504 ||
          error.name === "AbortError";

        if (temporaryError && attempt < 2) {
          // Short delay before retrying.
          await sleep(700);

          continue;
        }

        // ----------------------------------------------------
        // Move to next model.
        // ----------------------------------------------------

        break;
      }
    }
  }

  // ==========================================================
  // ALL MODELS FAILED
  // ==========================================================

  console.error("All Gemini models failed.");

  const status = lastError?.status;

  // If Gemini is overloaded/rate limited, return 503.
  if (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  ) {
    return res.status(503).json({
      error:
        "The AI service is temporarily unavailable. Please try again shortly.",
      details: lastError?.message || "Gemini service unavailable.",
    });
  }

  // Generic server error.
  return res.status(500).json({
    error: "The AI assistant could not generate a response.",
    details: lastError?.message || "Unknown Gemini error.",
  });
}