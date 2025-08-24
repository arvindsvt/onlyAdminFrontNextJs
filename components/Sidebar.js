"use client";
import { useState } from "react";

export default function Sidebar({ openMobile, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);
  const [usersOpen, setUsersOpen] = useState(true);

  // mobile overlay
  return (
    <>
      {/* Desktop */}
      <aside className={`hidden lg:flex flex-col bg-gray-900 text-white ${collapsed ? "w-16" : "w-64"} transition-all`}>
        <div className="h-14 flex items-center justify-between px-3 border-b border-gray-800">
          {!collapsed && <span className="font-semibold">Navigation</span>}
          <button
            className="text-xs bg-gray-800 px-2 py-1 rounded"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>
        <nav className="p-2 text-sm flex-1 overflow-auto">
          <button
            className="w-full text-left px-2 py-2 rounded hover:bg-gray-800"
            onClick={() => setUsersOpen(!usersOpen)}
          >
            {collapsed ? "U" : "Users"} {collapsed ? "" : usersOpen ? "▲" : "▼"}
          </button>
          {usersOpen && !collapsed && (
            <ul className="ml-2 mt-1 space-y-1">
              <li><a className="block px-2 py-1 rounded hover:bg-gray-800" href="/users/list">List</a></li>
              <li><a className="block px-2 py-1 rounded hover:bg-gray-800" href="/users/list#add">Add</a></li>
            </ul>
          )}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {openMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-gray-900 text-white h-full p-3">
            <div className="h-12 flex items-center justify-between">
              <span className="font-semibold">Menu</span>
              <button className="text-sm" onClick={onCloseMobile}>✕</button>
            </div>
            <nav className="mt-2 text-sm">
              <details open className="mb-2">
                <summary className="cursor-pointer px-2 py-1 rounded hover:bg-gray-800">Users</summary>
                <ul className="ml-4 mt-1 space-y-1">
                  <li><a href="/users/list" onClick={onCloseMobile} className="block px-2 py-1 rounded hover:bg-gray-800">List</a></li>
                  <li><a href="/users/list#add" onClick={onCloseMobile} className="block px-2 py-1 rounded hover:bg-gray-800">Add</a></li>
                </ul>
              </details>
            </nav>
          </div>
          <div className="flex-1 bg-black/40" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
