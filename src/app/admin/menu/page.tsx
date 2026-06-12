"use client";

import { useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { Product } from '../../../types';

export default function MenuManager() {
  const { products, deleteProduct, addProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Parfait',
    description: '',
    image: '',
    badge: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      await addProduct(newProduct as Omit<Product, 'id'>);
      setIsModalOpen(false);
      setNewProduct({ name: '', price: 0, category: 'Parfait', description: '', image: '', badge: '' });
    }
  };

  return (
    <div className="p-container-padding w-full relative">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Menu Manager</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your artisanal parfaits and fresh juice offerings.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary hover:opacity-90 text-white font-label-md text-label-md px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-sm">
          <span className="material-symbols-outlined">add</span>
          Add New Item
        </button>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-8">
        <button className="bg-primary-container text-on-primary-container font-bold px-6 py-2 rounded-full font-label-md text-label-md transition-all">
          All Items
        </button>
      </div>

      {/* Product Table Container */}
      <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Product Name</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Category</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Price (GH₵)</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-surface overflow-hidden">
                        {product.image ? (
                          <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high"></div>
                        )}
                      </div>
                      <span className="font-bold text-on-surface">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{product.category}</td>
                  <td className="px-6 py-4 font-price-display text-secondary">{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-on-surface-variant hover:text-error transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">No products found. Click "Add New Item" to create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add New Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0px_12px_40px_rgba(0,0,0,0.08)] overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-surface-container-low px-8 py-6 flex justify-between items-center border-b border-outline-variant/20">
              <h3 className="font-headline-md text-headline-md text-on-surface">Add New Product</h3>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors" onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-outline-variant rounded-xl bg-surface hover:border-primary transition-colors cursor-pointer group relative">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {newProduct.image ? (
                  <img src={newProduct.image} className="h-32 object-contain" alt="Preview" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary mb-2">upload_file</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">Click to upload product image</span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Product Name</label>
                  <input 
                    required
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="e.g. Berry Blast" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Price (GH₵)</label>
                  <input 
                    required
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="0.00" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-on-surface-variant">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                    <option>Parfait</option>
                    <option>Juice</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-outline text-on-surface-variant rounded-xl font-label-md text-label-md hover:bg-surface-container-high transition-colors" type="button">
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-label-md text-label-md hover:opacity-90 transition-all active:scale-95" type="submit">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
