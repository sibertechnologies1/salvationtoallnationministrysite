import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function useEvents(category = "general") {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadEvents() {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (category) {
          query = query.eq("category", category);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (!isCancelled) {
          const formatted = (data || []).map((e) => ({
            id: e.id,
            title: e.title || "Untitled Event",
            date: e.date,
            time: e.time || "",
            location: e.location || "",
            description: e.description || "",
            imageUrl: e.image_url || e.imageUrl || "",
            category: e.category || "general",
          }));

          setEvents(formatted);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      isCancelled = true;
    };
  }, [category]);

  // Keep all valid future and today events sorted ascending by date
  const upcoming = events
    .filter((e) => {
      if (!e.date) return false;
      const [year, month, day] = e.date.split("T")[0].split("-").map(Number);
      const eventTime = new Date(year, month - 1, day).getTime();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(eventTime) && eventTime >= today.getTime();
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return { events: upcoming, isLoading, error };
}