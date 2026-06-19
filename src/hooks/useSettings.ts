import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { PromoCode, GlobalSettings } from '../types';

export function useSettings() {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    salesNotificationEnabled: false,
    salesNotificationText: '',
  });
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to global settings
    const unsubSettings = onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setGlobalSettings(docSnap.data() as GlobalSettings);
      }
    });

    // Listen to promo codes
    const unsubPromos = onSnapshot(collection(db, 'promo_codes'), (snapshot) => {
      const codes: PromoCode[] = [];
      snapshot.forEach((d) => {
        codes.push({ id: d.id, ...d.data() } as PromoCode);
      });
      setPromoCodes(codes);
      setLoading(false);
    });

    return () => {
      unsubSettings();
      unsubPromos();
    };
  }, []);

  const updateGlobalSettings = async (settings: GlobalSettings) => {
    await setDoc(doc(db, 'settings', 'global'), settings);
  };

  const addOrUpdatePromoCode = async (promoCode: PromoCode) => {
    const { id, ...data } = promoCode;
    await setDoc(doc(db, 'promo_codes', id.toUpperCase()), data);
  };

  const deletePromoCode = async (id: string) => {
    await deleteDoc(doc(db, 'promo_codes', id.toUpperCase()));
  };

  return {
    globalSettings,
    promoCodes,
    loading,
    updateGlobalSettings,
    addOrUpdatePromoCode,
    deletePromoCode,
  };
}
