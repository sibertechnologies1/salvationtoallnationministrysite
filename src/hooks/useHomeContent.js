import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';

export function useHomeContent() {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHomeContent() {
      try {
        const { data, error } = await supabase
          .from('homepage_content')
          .select('*')
          .limit(1)
          .single();

        if (error) throw error;
        setContent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHomeContent();
  }, []);

  return { content, isLoading, error };
}