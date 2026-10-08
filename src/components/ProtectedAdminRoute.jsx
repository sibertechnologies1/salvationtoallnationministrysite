import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {supabase} from "../lib/supabaseClient"

export default function ProtectedAdminRoute() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-stone-300 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-sm font-medium text-stone-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
}