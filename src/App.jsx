import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sermons from './pages/Sermons/Sermons.jsx';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sermons" element={<Sermons />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}