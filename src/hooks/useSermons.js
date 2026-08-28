import { useEffect, useState } from "react";

// Fetches sermons from our own /api/sermons endpoint (never talks to
// Google directly). Used by both the Home page's Latest Sermon section
// and the full Sermons page, so they always stay in sync automatically.
export function useSermons() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadSermons() {
      try {
        const response = await fetch("/api/sermons");
        if (!response.ok) throw new Error("Failed to load sermons");
        const data = await response.json();
        if (!isCancelled) setSermons(data.sermons || []);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadSermons();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { sermons, isLoading, error };
}