import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../../lib/supabaseClient'
import { FiLock, FiMail } from 'react-icons/fi';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate('/admin/home');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md border border-stone-200 p-8">
        
        {/* Branding Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-green-950">STAN Admin</h1>
          <p className="text-stone-500 text-sm mt-2">Sign in to manage website content</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded text-center">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                <FiMail className="w-5 h-5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@salvationtoallnations.org"
                className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                <FiLock className="w-5 h-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-green-950 font-semibold py-3 rounded transition-colors hover:bg-amber-400 active:scale-95 disabled:opacity-50 text-sm shadow"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
}