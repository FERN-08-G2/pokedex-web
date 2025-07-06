import { BrowserRouter, Route, Router, Routes } from "react-router";
import Home from "./pages/Home";
import EvolutionPage from "./pages/EvolutionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evolve" element={<EvolutionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
