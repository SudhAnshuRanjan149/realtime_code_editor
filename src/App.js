// GLOBAL
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ROUTES
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";

// CSS
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomID" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
