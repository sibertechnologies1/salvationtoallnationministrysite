import { useEffect, useState } from "react";

const PLACEHOLDER_EVENTS = [
  {
    title: "Sunday Worship Service",
    date: "2026-09-14",
    time: "9:00 AM",
    location: "Main Auditorium",
    description: "All welcome, come as you are",
    imageUrl: "",
  },
  {
    title: "Youth Fellowship Night",
    date: "2026-09-20",
    time: "6:00 PM",
    location: "Fellowship Hall",
    description: "Ages 13-25",
    imageUrl: "https://picsum.photos/seed/youthnight/600/450", // placeholder only
  },
  {
    title: "All-Nations Prayer Walk",
    date: "2026-09-28",
    time: "7:00 AM",
    location: "Meet at Main Entrance",
    description: "Interceding for our city",
    imageUrl: "",
  },
];

// Splits a single CSV line into fields, correctly handling fields wrapped
// in quotes that contain commas (e.g. "All welcome, come as you are").
// A naive line.split(",") breaks on exactly this kind of field.
function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"'; // escaped quote inside a quoted field
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      fields.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

function parseCsv(text) {
  const lines = text.trim().split("\n").filter((line) => line.trim() !== "");
  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || "";
    });
    return row;
  });
}

// Reusable across the site: pass in the CSV link for whichever category of
// events this section needs (see src/config/eventSheets.js). Leaving the
// URL empty falls back to placeholder data.
export function useEvents(csvUrl) {
  const [events, setEvents] = useState(csvUrl ? [] : PLACEHOLDER_EVENTS);
  const [isLoading, setIsLoading] = useState(!!csvUrl);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!csvUrl) {
      setEvents(PLACEHOLDER_EVENTS);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    async function loadEvents() {
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to load events");
        const text = await response.text();
        const parsed = parseCsv(text);
        if (!isCancelled) setEvents(parsed);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadEvents();
    return () => {
      isCancelled = true;
    };
  }, [csvUrl]);

  // Only show events with a valid, parseable date that's today or later.
  // Rows with a missing/malformed date (e.g. leftover blank rows in the
  // sheet) are automatically excluded here.
  const upcoming = events
    .filter((e) => {
      const t = new Date(e.date).getTime();
      return !Number.isNaN(t) && t >= new Date().setHours(0, 0, 0, 0);
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return { events: upcoming, isLoading, error };
}