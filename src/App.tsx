import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Homepagina } from "./pages/Homepagina";
import { Overzichtspagina } from "./pages/Overzichtspagina";
import { OverDoortjePagina } from "./pages/OverDoortjePagina";
import { Detailpagina } from "./pages/Detailpagina";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepagina />} />
          <Route path="schilderijen" element={<Overzichtspagina />} />
          <Route path="over-doortje" element={<OverDoortjePagina />} />
          <Route path="schilderij/:id" element={<Detailpagina />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
