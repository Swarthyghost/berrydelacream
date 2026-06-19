"use client";

import { useState } from 'react';
import { useSettings } from '../../../../hooks/useSettings';
import { PromoCode } from '../../../../types';

export default function SettingsPage() {
  const { globalSettings, promoCodes, loading, updateGlobalSettings, addOrUpdatePromoCode, deletePromoCode } = useSettings();
  
  const [notificationText, setNotificationText] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isEditingGlobal, setIsEditingGlobal] = useState(false);

  const [newPromo, setNewPromo] = useState<PromoCode>({
    id: '',
    type: 'percentage',
    value: 0,
    active: true,
  });

  // Init local state when editing global
  const handleEditGlobal = () => {
    setNotificationText(globalSettings.salesNotificationText);
    setNotificationEnabled(globalSettings.salesNotificationEnabled);
    setIsEditingGlobal(true);
  };

  const handleSaveGlobal = async () => {
    await updateGlobalSettings({
      salesNotificationEnabled: notificationEnabled,
      salesNotificationText: notificationText,
    });
    setIsEditingGlobal(false);
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.id || newPromo.value <= 0) return;
    
    await addOrUpdatePromoCode({
      ...newPromo,
      id: newPromo.id.toUpperCase().trim()
    });
    
    // Reset
    setNewPromo({
      id: '',
      type: 'percentage',
      value: 0,
      active: true,
    });
  };

  if (loading) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <div className="p-container-padding max-w-[1200px] w-full mx-auto space-y-12 pb-24">
      <div className="flex flex-col gap-2">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Site Settings & Promotions</h2>
        <p className="text-on-surface-variant">Manage global alerts and promo codes.</p>
      </div>

      {/* Global Settings */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">campaign</span>
            Sales Notification Banner
          </h3>
          {!isEditingGlobal ? (
            <button onClick={handleEditGlobal} className="text-primary font-bold hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors">
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditingGlobal(false)} className="text-on-surface-variant hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveGlobal} className="bg-primary text-white font-bold px-4 py-2 rounded-lg hover:brightness-110 transition-colors">
                Save
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-label-md font-bold text-on-surface w-32">Enabled:</label>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={isEditingGlobal ? notificationEnabled : globalSettings.salesNotificationEnabled}
                onChange={(e) => setNotificationEnabled(e.target.checked)}
                disabled={!isEditingGlobal}
                className="w-5 h-5 accent-primary"
              />
              <span className="text-on-surface-variant text-sm">
                {globalSettings.salesNotificationEnabled ? 'Currently Active' : 'Currently Hidden'}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <label className="text-label-md font-bold text-on-surface w-32 pt-2">Banner Text:</label>
            <textarea 
              value={isEditingGlobal ? notificationText : globalSettings.salesNotificationText}
              onChange={(e) => setNotificationText(e.target.value)}
              disabled={!isEditingGlobal}
              placeholder="e.g. 🎉 Flash Sale! Get 10% off all parfaits this weekend!"
              className="w-full max-w-lg p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary outline-none disabled:opacity-70 disabled:bg-surface-container-low min-h-[100px]"
            />
          </div>
        </div>
      </section>

      {/* Promo Codes */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/30">
        <h3 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined">sell</span>
          Promo Codes
        </h3>

        {/* Add New Promo */}
        <form onSubmit={handleAddPromo} className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/20 mb-8 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-xs font-bold mb-1 text-on-surface-variant">Code (e.g. BERRY10)</label>
            <input 
              type="text" 
              value={newPromo.id}
              onChange={(e) => setNewPromo({...newPromo, id: e.target.value})}
              required
              className="p-2.5 rounded-lg border border-outline-variant/50 uppercase"
              placeholder="Code"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-xs font-bold mb-1 text-on-surface-variant">Discount Type</label>
            <select 
              value={newPromo.type}
              onChange={(e) => setNewPromo({...newPromo, type: e.target.value as 'percentage'|'fixed'})}
              className="p-2.5 rounded-lg border border-outline-variant/50 bg-white"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="fixed">Fixed Amount (GH₵)</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/4">
            <label className="text-xs font-bold mb-1 text-on-surface-variant">Value</label>
            <input 
              type="number" 
              min="1"
              value={newPromo.value || ''}
              onChange={(e) => setNewPromo({...newPromo, value: Number(e.target.value)})}
              required
              className="p-2.5 rounded-lg border border-outline-variant/50"
              placeholder="e.g. 10"
            />
          </div>
          <button type="submit" className="w-full md:w-auto bg-secondary text-white font-bold px-6 py-2.5 rounded-lg hover:brightness-110 transition-colors">
            Add Code
          </button>
        </form>

        {/* List of Promos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-sm text-on-surface-variant">
                <th className="py-3 px-4 font-bold">Code</th>
                <th className="py-3 px-4 font-bold">Type</th>
                <th className="py-3 px-4 font-bold">Value</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant">No promo codes created yet.</td>
                </tr>
              ) : (
                promoCodes.map((promo) => (
                  <tr key={promo.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest">
                    <td className="py-3 px-4 font-bold text-primary">{promo.id}</td>
                    <td className="py-3 px-4 capitalize">{promo.type}</td>
                    <td className="py-3 px-4 font-mono">
                      {promo.type === 'percentage' ? `${promo.value}%` : `GH₵${promo.value}`}
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => addOrUpdatePromoCode({...promo, active: !promo.active})}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${promo.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {promo.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => deletePromoCode(promo.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Delete code"
                      >
                        <span className="material-symbols-outlined text-sm block">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
