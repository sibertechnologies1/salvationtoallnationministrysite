import Home from './pages/Home/Home.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}