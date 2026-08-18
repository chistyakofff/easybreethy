import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './Layout.css';

export function Layout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/" className="layout__logo">
          <span className="layout__logo-mark" aria-hidden="true">
            <span className="layout__logo-ring" />
            <span className="layout__logo-dot" />
          </span>
          EasyBreethy
        </Link>

        <ThemeToggle />
      </header>

      <main className="layout__main">
        <Outlet />
      </main>

      <footer className="layout__footer">
        <span>EasyBreethy · дыхательные практики для спокойствия</span>
      </footer>
    </div>
  );
}
