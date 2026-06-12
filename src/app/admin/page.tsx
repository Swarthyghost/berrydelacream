"use client";

import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';

export default function AdminDashboard() {
  const { products } = useProducts();

  return (
    <div className="p-gutter lg:p-container-padding max-w-[1200px] mx-auto space-y-gutter w-full">
      {/* Metric Cards Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-white p-card-padding rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-primary/5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase">Total Products</span>
            <div className="bg-secondary-container/30 text-secondary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>
          <div className="font-price-display text-[28px] text-on-surface">{products.length}</div>
          <div className="text-[12px] text-secondary font-medium">Currently in menu</div>
        </div>

        <div className="bg-white p-card-padding rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-primary/5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase">Total Revenue Today</span>
            <div className="bg-primary-container/20 text-primary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="font-price-display text-[28px] text-on-surface">GH₵ 3,840.50</div>
          <div className="text-[12px] text-secondary font-medium">+8% from yesterday</div>
        </div>

        <div className="bg-white p-card-padding rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-primary/5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase">Pending Orders</span>
            <div className="bg-tertiary-container/20 text-tertiary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
          </div>
          <div className="font-price-display text-[28px] text-on-surface">15</div>
          <div className="text-[12px] text-on-surface-variant">Requiring immediate attention</div>
        </div>

        <div className="bg-white p-card-padding rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-primary/5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <span className="text-label-md text-on-surface-variant uppercase">Completed Orders</span>
            <div className="bg-secondary-container/30 text-secondary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="font-price-display text-[28px] text-on-surface">27</div>
          <div className="text-[12px] text-secondary font-medium">94% fulfillment rate</div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border border-primary/5 overflow-hidden">
        <div className="p-card-padding border-b border-outline-variant/20 flex justify-between items-center">
          <h2 className="font-headline-md text-headline-md text-on-surface">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-label-md text-on-surface-variant">
                <th className="px-6 py-4 font-bold">Order #</th>
                <th className="px-6 py-4 font-bold">Customer Name</th>
                <th className="px-6 py-4 font-bold">Items</th>
                <th className="px-6 py-4 font-bold">Total (GH₵)</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-6 py-4 font-bold text-primary">#8492</td>
                <td className="px-6 py-4 font-medium">Kwame Mensah</td>
                <td className="px-6 py-4 text-on-surface-variant">2x Berry Bliss Parfait</td>
                <td className="px-6 py-4 font-bold">145.00</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary rounded-full text-[12px] font-bold">Pending</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-secondary hover:bg-secondary/5 p-1 rounded transition-colors material-symbols-outlined">check_circle</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
