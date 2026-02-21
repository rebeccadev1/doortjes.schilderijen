import { useEffect, useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

const navLinkClass =
  "text-palette-slate/90 hover:text-palette-slate transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage border-b-2 border-transparent hover:border-palette-sage/50 [&.active]:text-palette-brown [&.active]:border-palette-brown [&.active]:font-semibold [&.active]:border-b-2";

export function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isDetailPagina = /^\/schilderij\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`min-h-screen text-palette-slate ${isDetailPagina ? "bg-palette-beige" : "bg-palette-sage/20"}`}
    >
      <header
        className={`border-b border-palette-sage/50 bg-palette-beige/90 backdrop-blur-sm sticky top-0 z-10 transition-shadow duration-200 ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/"
            className="font-title text-3xl font-semibold text-palette-slate hover:text-palette-brown transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palette-sage text-center sm:text-left"
          >
            Doortjes schilderijen
          </Link>
          <nav className="flex items-center justify-center gap-6" aria-label="Hoofdnavigatie">
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/schilderijen"
              className={navLinkClass}
            >
              Schilderijen
            </NavLink>
            <NavLink
              to="/over-doortje"
              className={navLinkClass}
            >
              Over Doortje
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
}
