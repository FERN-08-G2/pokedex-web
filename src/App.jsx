import { BrowserRouter, Route, Router, Routes } from "react-router";
import Home from "./pages/Home";
import DetailsPages from "./pages/Detail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<DetailsPages />} />
        {/* <Route path="/" element={<Home />} /> */} //tambah route yaa untuk
        halaman lain jadi jangan di file yang sudah ada disini di ubah.. jadi
        setiap org buat file baru trus ngoding di file itu aja ya..
      </Routes>
    </BrowserRouter>
  );
}
