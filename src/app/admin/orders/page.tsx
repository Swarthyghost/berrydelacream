"use client";

import { useState } from 'react';

export default function OrdersManager() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="p-container-padding w-full relative">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">Order Management</h1>
          <p className="text-on-surface-variant font-body-md">Real-time processing and logistics for Berry De Lacreme.</p>
        </div>
        <div className="flex gap-4 items-center">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-full flex items-center gap-2 font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-[0px_4px_20px_rgba(160,43,82,0.15)]">
            <span className="material-symbols-outlined text-[20px]">add</span>
            New Manual Order
          </button>
        </div>
      </header>

      {/* Filters Section */}
      <section className="bg-surface-container-lowest rounded-xl p-6 mb-8 shadow-[0px_4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full pl-12 pr-4 py-3 bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-body-md outline-none transition-all" placeholder="Search by Order #, Name or WhatsApp..." type="text" />
            </div>
          </div>
          <div className="flex bg-surface-container p-1 rounded-lg">
            <button className="px-4 py-2 rounded-md font-label-md text-label-md bg-white shadow-sm text-primary transition-all">All</button>
            <button className="px-4 py-2 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all">Pending</button>
            <button className="px-4 py-2 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all">Confirmed</button>
            <button className="px-4 py-2 rounded-md font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all">Completed</button>
          </div>
        </div>
      </section>

      {/* Orders Table */}
      <section className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant/30">
              <tr>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">ORDER #</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">CUSTOMER</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">ITEMS</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">TOTAL</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">STATUS</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-low/50 transition-colors group">
                <td className="px-6 py-5 font-bold text-on-surface">#BDL-7821</td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-on-surface">Akua Mensah</span>
                    <a className="text-[12px] text-secondary flex items-center gap-1 hover:underline" href="#">
                      <span className="material-symbols-outlined text-[14px]">chat</span>
                      +233 24 567 8901
                    </a>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-body-md">
                    <span className="font-medium">2x Berry Bliss Parfait</span>
                    <div className="text-[12px] text-on-surface-variant mt-0.5">Extra Granola, No Honey</div>
                  </div>
                </td>
                <td className="px-6 py-5 font-price-display text-price-display text-secondary">GH₵ 145.00</td>
                <td className="px-6 py-5">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[12px] font-bold">Pending</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setDrawerOpen(true)}
                      className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-all">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Order Details Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)}></div>
          <div className="fixed top-0 right-0 h-screen w-full max-w-md bg-surface shadow-2xl z-[60] flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Order Details</h2>
                <span className="text-label-md text-on-surface-variant">#BDL-7821</span>
              </div>
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors" 
                onClick={() => setDrawerOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Customer Section */}
              <div className="space-y-4">
                <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest">Customer Info</h3>
                <div className="bg-surface-container-low rounded-xl p-5 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant text-[13px]">Name</span>
                    <span className="font-bold text-on-surface">Akua Mensah</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-[13px]">WhatsApp</span>
                    <a className="flex items-center gap-2 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-[12px] font-bold shadow-sm hover:scale-105 transition-transform" href="https://wa.me/233245678901" target="_blank" rel="noreferrer">
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      Message
                    </a>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-4">
                <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest">Items Ordered</h3>
                <div className="space-y-3">
                  <div className="flex gap-4 items-start pb-3 border-b border-outline-variant/20">
                    <div className="w-16 h-16 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-surface-variant"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-bold text-on-surface">Berry Bliss Parfait</span>
                        <span className="font-bold text-secondary">GH₵ 90.00</span>
                      </div>
                      <div className="text-[12px] text-on-surface-variant leading-relaxed">
                        Quantity: 2 <br/>
                        Extras: Extra Granola (+GH₵ 10) <br/>
                        Note: "No honey."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white border-t border-outline-variant/30">
              <div className="flex justify-between mb-4">
                <span className="font-body-md text-on-surface-variant">Total Amount</span>
                <span className="font-headline-md text-headline-md text-secondary">GH₵ 145.00</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-6 py-4 rounded-xl border border-outline-variant text-on-surface font-bold text-label-md hover:bg-surface-container transition-all">Print Invoice</button>
                <button className="px-6 py-4 rounded-xl bg-secondary text-on-secondary font-bold text-label-md hover:opacity-90 transition-all shadow-md">Update Status</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
