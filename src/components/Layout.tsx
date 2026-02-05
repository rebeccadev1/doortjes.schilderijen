import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-palette-sage/20 text-palette-slate">
      <header className="border-b border-palette-sage/50 bg-palette-beige/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
          <Link
            to="/"
            className="text-xl font-semibold text-palette-slate hover:text-palette-brown transition-colors"
          >
            Doortjes schilderijen
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-palette-slate/90 hover:text-palette-slate transition-colors"
            >
              Home
            </Link>
            <Link
              to="/schilderijen"
              className="text-palette-slate/90 hover:text-palette-slate transition-colors"
            >
              Schilderijen
            </Link>
            <Link
              to="/over-doortje"
              className="text-palette-slate/90 hover:text-palette-slate transition-colors"
            >
              Over Doortje
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
