"use client";

import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low flex flex-col gap-2 py-4 z-40">
        <div className="font-headline-md text-headline-md text-primary px-4 py-6 font-bold">Berry Admin</div>
        <nav className="flex-grow">
          {/* Active: Dashboard */}
          <a className="bg-secondary-container text-on-secondary-container font-bold rounded-lg mx-2 flex items-center gap-3 px-4 py-3 cursor-pointer transition-all" href="/admin">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </a>
          <a className="text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg flex items-center gap-3 px-4 py-3 cursor-pointer transition-all" href="/admin/orders">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="font-label-md text-label-md">Orders</span>
          </a>
          <a className="text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg flex items-center gap-3 px-4 py-3 cursor-pointer transition-all" href="/admin/menu">
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span className="font-label-md text-label-md">Menu Manager</span>
          </a>
        </nav>
        <div className="mt-auto px-2">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-lg bg-surface-container-high mx-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">JA</div>
            <div className="flex flex-col">
              <span className="text-label-md font-bold leading-none">Admin User</span>
              <span className="text-[10px] text-on-surface-variant">Store Manager</span>
            </div>
          </div>
          <a className="text-on-surface-variant hover:bg-surface-container-high mx-2 rounded-lg flex items-center gap-3 px-4 py-3 cursor-pointer transition-all mb-4" href="/">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* Admin Top Bar */}
        <header className="sticky top-0 w-full z-30 bg-surface/80 backdrop-blur-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] h-20 flex items-center justify-between px-container-padding">
          <div className="flex flex-col">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">Dashboard Overview</h1>
            <p className="text-label-md text-on-surface-variant">Welcome back, Berry Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-low p-2 rounded-full transition-all">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="w-full py-12 bg-surface-container-highest mt-auto border-t border-outline-variant">
          <div className="max-w-[1200px] mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-base">
            <div className="font-headline-sm text-headline-sm text-primary">Berry De Lacreme</div>
            <p className="font-label-md text-label-md text-on-surface-variant text-center md:text-left">
                © 2024 Berry De Lacreme. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
