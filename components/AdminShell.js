"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <span className="font-semibold">Admin Panel</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <a href="/users/list" className="hover:text-gray-900">Users</a>
          </nav>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar openMobile={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Admin Panel</span>
          <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-gray-900">Built with Next.js</a>
        </div>
      </footer>
    </div>
  );
}
