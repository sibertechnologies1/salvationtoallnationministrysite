import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sermons from './pages/Sermons/Sermons.jsx';
import Events from './pages/Events/Events.jsx';
import Giving from './pages/Giving/Giving.jsx';
import Contact from './pages/Contact/Contact.jsx';
import ChatWidget from './components/Chatwidget/Chatwidget.jsx';

// Admin Imports
import AdminLogin from './pages/Admin/AdminLogin.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';
import ManageHome from './pages/Admin/ManageHome.jsx';
import ManageAbout from './pages/Admin/ManageAbout.jsx';
import ManageSermons from './pages/Admin/ManageSermons.jsx';
import ManageEvents from './pages/Admin/ManageEvents.jsx';
import ManageGiving from './pages/Admin/ManageGiving.jsx';
import ManageContact from './pages/Admin/ManageContact.jsx'
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="home" element={<ManageHome />} />
              <Route path="about" element={<ManageAbout />} />
              <Route path="sermons" element={<ManageSermons />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="giving" element={<ManageGiving />} />
              <Route path="contact" element={<ManageContact />} />
            </Route>
          </Route>
        </Routes>
        <ChatWidget />
      </BrowserRouter>
    </div>
  );
}