import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sermons from './pages/Sermons/Sermons.jsx';
import Events from './pages/Events/Events.jsx';
import Giving from './pages/Giving/Giving.jsx';
import Contact from './pages/Contact/Contact.jsx';
import ChatWidget from './components/Chatwidget/Chatwidget.jsx';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
       <ChatWidget />
      </BrowserRouter>
    </div>
  );
}