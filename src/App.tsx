import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Homepagina } from "./pages/Homepagina";
import { Overzichtspagina } from "./pages/Overzichtspagina";
import { OverDoortjePagina } from "./pages/OverDoortjePagina";
import { Detailpagina } from "./pages/Detailpagina";

/**
 * HashRouter: het pad staat in de URL-hash (/#/schilderijen), niet in het serverpad.
 * Daardoor werkt vernieuwen op elke pagina op statische hosts (GitHub Pages) zonder 404.html-trucs.
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepagina />} />
          <Route path="schilderijen" element={<Overzichtspagina />} />
          <Route path="over-doortje" element={<OverDoortjePagina />} />
          <Route path="schilderij/:id" element={<Detailpagina />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
