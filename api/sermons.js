// api/sermons.js
//
// This runs on Vercel's server, NOT in the browser. The API key lives here,
// safely hidden in an environment variable, never shipped to the frontend.
//
// Your React app calls THIS endpoint (e.g. fetch("/api/sermons")) instead
// of ever talking to Google directly.

export default async function handler(req, res) {
  const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
  const FOLDER_ID = process.env.SERMONS_FOLDER_ID;

  if (!API_KEY || !FOLDER_ID) {
    return res.status(500).json({ error: "Server is missing required environment variables." });
  }

  try {
    const query = encodeURIComponent(`'${FOLDER_ID}' in parents and trashed = false`);
    const fields = encodeURIComponent(
      "files(id,name,mimeType,createdTime,thumbnailLink,webViewLink)"
    );

    const driveUrl = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&orderBy=createdTime desc&key=${API_KEY}`;

    const response = await fetch(driveUrl);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Drive API error:", errorBody);
      return res.status(response.status).json({ error: "Failed to fetch sermons from Drive." });
    }

    const data = await response.json();

    // Reshape into exactly what the frontend needs, so React components
    // don't have to know anything about Google Drive's response format
    const sermons = data.files.map((file) => ({
      id: file.id,
      title: file.name.replace(/\.[^/.]+$/, ""), // strips file extension for a cleaner title
      date: file.createdTime,
      embedUrl: `https://drive.google.com/file/d/${file.id}/preview`,
      thumbnail: file.thumbnailLink || null,
      isVideo: file.mimeType?.startsWith("video/"),
      isAudio: file.mimeType?.startsWith("audio/"),
    }));

    // Cache for 5 minutes on Vercel's edge, so repeat visits are fast and
    // we don't hit the Drive API on every single page load
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json({ sermons });
  } catch (err) {
    console.error("Unexpected error fetching sermons:", err);
    return res.status(500).json({ error: "Something went wrong fetching sermons." });
  }
}