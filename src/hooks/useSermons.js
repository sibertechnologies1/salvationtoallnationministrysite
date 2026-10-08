import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// Convert raw YouTube URLs to embeddable player URLs
function formatEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url;
}

export function useSermons() {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSermons() {
      try {
        setIsLoading(true);
        const { data, error: fetchError } = await supabase
          .from("sermons")
          .select("*")
          .order("date", { ascending: false });

        if (fetchError) throw fetchError;

        const normalizedData = (data || []).map((item) => {
          const rawUrl = item.embed_url || item.embedUrl || "";

          return {
            ...item,
            embedUrl: formatEmbedUrl(rawUrl),
            isVideo: Boolean(item.is_video ?? item.isVideo),
            isAudio: Boolean(item.is_audio ?? item.isAudio),
            pastor: item.pastor || item.speaker || "",
          };
        });

        setSermons(normalizedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSermons();
  }, []);

  return { sermons, isLoading, error };
}