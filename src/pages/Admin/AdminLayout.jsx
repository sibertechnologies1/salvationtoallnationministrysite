import { useEffect, useState, createContext, useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from "../../lib/supabaseClient";
import { 
  FiHome, 
  FiInfo, 
  FiBookOpen, 
  FiCalendar, 
  FiCreditCard, 
  FiMail, 
  FiMenu, 
  FiX, 
  FiExternalLink,
  FiLogOut
} from 'react-icons/fi';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const PRESET_PALETTES = [
  {
    name: 'Forest Green',
    btnBg: 'bg-green-950',
    sidebar_bg: 'bg-green-950',
    sidebar_text: 'text-stone-300',
    sidebar_hover: 'hover:bg-green-900 hover:text-stone-100',
    active_tab_bg: 'bg-amber-500',
    active_tab_text: 'text-green-950 font-bold',
    brand_text: 'text-amber-400',
    heading_text: 'text-green-950',
    section_title_text: 'text-amber-600',
  },
  {
    name: 'Charcoal Slate',
    btnBg: 'bg-slate-900',
    sidebar_bg: 'bg-slate-900',
    sidebar_text: 'text-slate-300',
    sidebar_hover: 'hover:bg-slate-800 hover:text-slate-100',
    active_tab_bg: 'bg-cyan-500',
    active_tab_text: 'text-slate-950 font-bold',
    brand_text: 'text-cyan-400',
    heading_text: 'text-slate-900',
    section_title_text: 'text-cyan-600',
  },
  {
    name: 'Burgundy Wine',
    btnBg: 'bg-rose-950',
    sidebar_bg: 'bg-rose-950',
    sidebar_text: 'text-rose-200',
    sidebar_hover: 'hover:bg-rose-900 hover:text-rose-50',
    active_tab_bg: 'bg-amber-400',
    active_tab_text: 'text-rose-950 font-bold',
    brand_text: 'text-amber-300',
    heading_text: 'text-rose-950',
    section_title_text: 'text-rose-700',
  },
  {
    name: 'Deep Navy',
    btnBg: 'bg-blue-950',
    sidebar_bg: 'bg-blue-950',
    sidebar_text: 'text-blue-200',
    sidebar_hover: 'hover:bg-blue-900 hover:text-blue-50',
    active_tab_bg: 'bg-sky-400',
    active_tab_text: 'text-blue-950 font-bold',
    brand_text: 'text-sky-300',
    heading_text: 'text-blue-950',
    section_title_text: 'text-sky-600',
  },
];

const navItems = [
  { name: 'Home Page', path: '/admin/home', icon: FiHome },
  { name: 'About Page', path: '/admin/about', icon: FiInfo },
  { name: 'Sermons Page', path: '/admin/sermons', icon: FiBookOpen },
  { name: 'Events Page', path: '/admin/events', icon: FiCalendar },
  { name: 'Giving Page', path: '/admin/giving', icon: FiCreditCard },
  { name: 'Contact Page', path: '/admin/contact', icon: FiMail },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(PRESET_PALETTES[0]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTheme() {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (data && !error && data.sidebar_bg) {
        const matched = PRESET_PALETTES.find((p) => p.sidebar_bg === data.sidebar_bg);
        if (matched) {
          setTheme(matched);
        } else {
          setTheme({ ...PRESET_PALETTES[0], ...data });
        }
      }
    }
    fetchTheme();
  }, []);

  const handleColorChange = async (selectedPalette) => {
    setTheme(selectedPalette);

    const payload = {
      sidebar_bg: selectedPalette.sidebar_bg,
      sidebar_text: selectedPalette.sidebar_text,
      sidebar_hover: selectedPalette.sidebar_hover,
      active_tab_bg: selectedPalette.active_tab_bg,
      active_tab_text: selectedPalette.active_tab_text,
      brand_text: selectedPalette.brand_text,
      heading_text: selectedPalette.heading_text,
      section_title_text: selectedPalette.section_title_text,
    };

    const { data: existing } = await supabase.from('settings').select('id').limit(1).maybeSingle();
    if (existing) {
      await supabase.from('settings').update(payload).eq('id', existing.id);
    } else {
      await supabase.from('settings').insert([payload]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className="min-h-screen bg-stone-100 flex font-sans">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 bottom-0 left-0 z-50 w-64 ${theme.sidebar_bg} transition-colors duration-300 flex flex-col justify-between transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <div>
            {/* Header / Branding */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <Link to="/admin/home" className={`font-serif font-bold text-lg transition-colors ${theme.brand_text}`}>
                STAN Admin
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-stone-400 hover:text-stone-50"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `${theme.active_tab_bg} ${theme.active_tab_text} shadow-md`
                          : `${theme.sidebar_text} ${theme.sidebar_hover}`
                      }`
                    }
                  >
                    <IconComponent className="text-lg flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer: Color Palette Picker */}
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className={`text-[11px] uppercase tracking-wider font-semibold text-center ${theme.sidebar_text}`}>
              Sidebar Theme
            </div>
            
            <div className="flex items-center justify-center gap-3">
              {PRESET_PALETTES.map((palette) => (
                <button
                  key={palette.name}
                  onClick={() => handleColorChange(palette)}
                  className={`w-7 h-7 rounded-full ${palette.btnBg} border-2 transition-transform duration-200 hover:scale-110 ${
                    theme.sidebar_bg === palette.sidebar_bg
                      ? 'border-white ring-2 ring-white/40 scale-110 shadow-lg'
                      : 'border-white/30'
                  }`}
                  title={palette.name}
                />
              ))}
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-semibold border rounded transition-opacity hover:opacity-100 ${theme.sidebar_text} border-current opacity-90 mt-3`}
            >
              <span>View Live Website</span>
              <FiExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
          {/* Top Bar */}
          <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-stone-800 p-1 rounded hover:bg-stone-100"
                aria-label="Open sidebar"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <h2 className={`font-serif text-xl font-semibold transition-colors ${theme.heading_text}`}>
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-sm font-medium px-4 py-2 rounded transition-colors"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </header>

          {/* Page Content Rendered Here */}
          <main className="flex-1 p-6 md:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}