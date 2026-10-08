import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {supabase} from "../../lib/supabaseClient"
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

const navItems = [
  { name: 'Home Page', path: '/admin/home', icon: FiHome },
  { name: 'About Page', path: '/admin/about', icon: FiInfo },
  { name: 'Sermons', path: '/admin/sermons', icon: FiBookOpen },
  { name: 'Events', path: '/admin/events', icon: FiCalendar },
  { name: 'Giving', path: '/admin/giving', icon: FiCreditCard },
  { name: 'Contact Submissions', path: '/admin/contact', icon: FiMail },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-green-950 text-stone-50 flex flex-col justify-between transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div>
          {/* Header / Branding */}
          <div className="p-6 border-b border-green-900 flex items-center justify-between">
            <Link to="/admin/home" className="text-amber-500 font-serif font-bold text-lg">
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
                    `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500 text-green-950 font-semibold'
                        : 'text-stone-300 hover:bg-green-900 hover:text-stone-50'
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

        {/* Footer Actions / View Main Site */}
        <div className="p-4 border-t border-green-900 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-semibold text-stone-300 border border-stone-700 rounded hover:bg-green-900 transition-colors"
          >
            <span>View Live Website</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-green-950 p-1 rounded hover:bg-stone-100"
              aria-label="Open sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h2 className="font-serif text-xl font-semibold text-green-950">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-stone-200 hover:bg-stone-300 text-green-950 text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content Rendered Here */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}