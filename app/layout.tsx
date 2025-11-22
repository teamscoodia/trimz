// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Trimz Gents Saloon',
  description: 'Booking, services, and daily performance dashboard for Trimz.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/services', label: 'Services' },
    { href: '/booking', label: 'Book Appointment' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="main-nav">
            <div className="main-nav-inner">
              <Link href="/" className="logo">
                <span className="logo-mark">T</span>
                <span className="logo-text">
                  Trimz
                  <span className="brand-tagline">Gents Saloon</span>
                </span>
              </Link>

              <nav className="nav-links">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="nav-link">
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="nav-right">
                <span className="nav-badge">Today · Live View</span>
              </div>
            </div>
          </header>

          <main className="app-main">{children}</main>

          <footer className="footer">
            <span>© {new Date().getFullYear()} Trimz Gents Saloon</span>
            <span className="footer-muted">Owner / Manager Console · Static Demo</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
