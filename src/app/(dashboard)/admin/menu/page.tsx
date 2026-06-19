"use client";

import { useState, useRef } from 'react';
import { useProducts } from '../../../../hooks/useProducts';
import { Product } from '../../../../types';

type ProductFormData = Omit<Product, 'id'>;

const EMPTY_FORM: ProductFormData = {
  name: '',
  price: 0,
  category: 'parfait',
  segment: 'sweetened',
  size: '',
  description: '',
  image: '',
  badge: '',
};

// ─── Shared Image Upload Field ────────────────────────────────────────────────
function ImageUploadField({
  imageValue,
  onChange,
}: {
  imageValue: string;
  onChange: (base64: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-outline-variant rounded-xl bg-surface hover:border-primary transition-all cursor-pointer group min-h-[160px]"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {imageValue ? (
        <div className="relative w-full flex flex-col items-center gap-3">
          <img
            src={imageValue}
            className="h-28 object-contain rounded-lg shadow"
            alt="Preview"
          />
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
            Click to replace image
          </span>
        </div>
      ) : (
        <>
          <span className="material-symbols-outlined text-5xl text-on-surface-variant group-hover:text-primary mb-2 transition-colors">
            add_photo_alternate
          </span>
          <span className="font-semibold text-on-surface-variant group-hover:text-primary text-sm transition-colors">
            Click to upload product image
          </span>
          <span className="text-xs text-on-surface-variant/60 mt-1">
            PNG, JPG, WEBP supported
          </span>
        </>
      )}
    </div>
  );
}

// ─── Shared Product Form ───────────────────────────────────────────────────────
function ProductForm({
  data,
  onChange,
  onSubmit,
  onCancel,
  isSaving,
  submitLabel,
}: {
  data: ProductFormData;
  onChange: (updated: ProductFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSaving: boolean;
  submitLabel: string;
}) {
  const field = (key: keyof ProductFormData, value: string | number) =>
    onChange({ ...data, [key]: value });

  return (
    <form onSubmit={onSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="font-label-md text-label-md text-on-surface-variant block">
          Product Image
        </label>
        <ImageUploadField
          imageValue={data.image}
          onChange={(base64) => field('image', base64)}
        />
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Product Name *
          </label>
          <input
            required
            value={data.name}
            onChange={(e) => field('name', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="e.g. Berry Blast Parfait"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Price (GH₵) *
          </label>
          <input
            required
            value={data.price || ''}
            onChange={(e) => field('price', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Category
          </label>
          <select
            value={data.category}
            onChange={(e) => field('category', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="parfait">Parfait</option>
            <option value="juice">Juice</option>
            <option value="extras">Extras</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Segment
          </label>
          <select
            value={data.segment}
            onChange={(e) => field('segment', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="sweetened">Sweetened (Parfait)</option>
            <option value="unsweetened">Unsweetened (Parfait)</option>
            <option value="single">Single (Juice)</option>
            <option value="combo">Combo (Juice)</option>
            <option value="extras">Extras</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Size (Optional)
          </label>
          <input
            value={data.size || ''}
            onChange={(e) => field('size', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="e.g. 500ml or Cup 350ml"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Badge (Optional)
          </label>
          <input
            value={data.badge || ''}
            onChange={(e) => field('badge', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="e.g. Best Seller, New"
            type="text"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="font-label-md text-label-md text-on-surface-variant block">
            Description (Optional)
          </label>
          <textarea
            value={data.description || ''}
            onChange={(e) => field('description', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="Short description of the product..."
            rows={3}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex-1 px-6 py-3 border border-outline text-on-surface-variant rounded-xl font-label-md text-label-md hover:bg-surface-container-high transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-label-md text-label-md hover:opacity-90 transition-all active:scale-95 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <span className="material-symbols-outlined animate-spin text-base">
                progress_activity
              </span>
              Saving...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">save</span>
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MenuManager() {
  const { products, deleteProduct, addProduct, updateProduct } = useProducts();

  // ── Tab State ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'All' | 'Parfait' | 'Juice' | 'Extras'>('All');

  // ── Add Modal State ──────────────────────────────────────────────────────
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductFormData>({ ...EMPTY_FORM });

  // ── Edit Modal State ─────────────────────────────────────────────────────
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<ProductFormData>({ ...EMPTY_FORM });
  const [isSaving, setIsSaving] = useState(false);

  // ── Delete Confirmation State ────────────────────────────────────────────
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      segment: product.segment || 'sweetened',
      size: product.size || '',
      description: product.description || '',
      image: product.image || '',
      badge: product.badge || '',
    });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setIsAdding(true);
    await addProduct(newProduct as Omit<Product, 'id'>);
    setIsAdding(false);
    setIsAddOpen(false);
    setNewProduct({ ...EMPTY_FORM });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);
    await updateProduct({ ...editForm, id: editingProduct.id });
    setIsSaving(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeletingId(null);
  };

  // ── Category badge colours ────────────────────────────────────────────────
  const catStyle = (cat: string) => {
    if (cat === 'parfait') return 'bg-primary-container text-on-primary-container';
    if (cat === 'juice') return 'bg-tertiary-container text-on-tertiary-container';
    return 'bg-surface-container-high text-on-surface-variant';
  };

  const filteredProducts = products.filter(p => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Parfait') return p.category === 'parfait';
    if (activeTab === 'Juice') return p.category === 'juice';
    if (activeTab === 'Extras') return p.category === 'extras';
    return true;
  });

  return (
    <div className="p-container-padding w-full relative">
      {/* ── Header ── */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Menu Manager</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Add, edit, or remove your artisanal parfaits and fresh juice offerings.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-secondary hover:opacity-90 text-white font-label-md text-label-md px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined">add</span>
          Add New Item
        </button>
      </header>

      {/* ── Category Tabs ── */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Parfait', 'Juice', 'Extras'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Product Table ── */}
      <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Product
                </th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">
                  Category
                </th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Price (GH₵)
                </th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-surface-container-lowest transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-surface-container overflow-hidden shrink-0 border border-outline-variant/20">
                        {product.image ? (
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            src={product.image}
                            alt={product.name}
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl text-on-surface-variant/40">
                              image
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-on-surface truncate">{product.name}</p>
                        {product.size && (
                          <p className="text-xs text-on-surface-variant">{product.size}</p>
                        )}
                        {product.badge && (
                          <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${catStyle(product.category)}`}>
                      {product.category}
                    </span>
                    {product.segment && (
                      <span className="block text-xs text-on-surface-variant opacity-70 mt-1 capitalize">
                        {product.segment}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-price-display text-secondary font-bold text-base">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {/* Edit */}
                      <button
                        onClick={() => openEdit(product)}
                        title="Edit product"
                        className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary-container/40 transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => setDeletingId(product.id)}
                        title="Delete product"
                        className="p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/40 transition-all"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 block mb-3">
                      restaurant_menu
                    </span>
                    <p className="text-on-surface-variant">
                      No products found in this category. Click <strong>"Add New Item"</strong> to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add Modal ── */}
      {isAddOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            onClick={() => !isAdding && setIsAddOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0px_24px_60px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-surface-container-low px-8 py-5 flex justify-between items-center border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">add_circle</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Add New Product</h3>
              </div>
              <button
                onClick={() => !isAdding && setIsAddOpen(false)}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <ProductForm
              data={newProduct}
              onChange={setNewProduct}
              onSubmit={handleAdd}
              onCancel={() => setIsAddOpen(false)}
              isSaving={isAdding}
              submitLabel="Save Product"
            />
          </div>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"
            onClick={() => !isSaving && setEditingProduct(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0px_24px_60px_rgba(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-surface-container-low px-8 py-5 flex justify-between items-center border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">edit_note</span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Edit Product</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5 truncate max-w-[260px]">
                    {editingProduct.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => !isSaving && setEditingProduct(null)}
                className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <ProductForm
              data={editForm}
              onChange={setEditForm}
              onSubmit={handleUpdate}
              onCancel={() => setEditingProduct(null)}
              isSaving={isSaving}
              submitLabel="Update Product"
            />
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deletingId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-on-background/50 backdrop-blur-sm" onClick={() => setDeletingId(null)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-[0px_24px_60px_rgba(0,0,0,0.15)] p-8 animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-3xl text-error">delete_forever</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Delete Product?</h3>
            <p className="text-sm text-on-surface-variant mb-8">
              This action cannot be undone. The product will be permanently removed from your menu.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 px-5 py-3 border border-outline text-on-surface-variant rounded-xl font-semibold text-sm hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="flex-1 px-5 py-3 bg-error text-on-error rounded-xl font-semibold text-sm hover:opacity-90 transition-all active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
