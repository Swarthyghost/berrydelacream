import { useState, useRef } from 'react';
import { Product } from '../types';
import { Package, Plus, Trash2, Edit2, Upload, X, ArrowLeft, DatabaseBackup } from 'lucide-react';
import { PRODUCTS } from '../data';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onClose: () => void;
}

export default function Admin({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onClose }: AdminProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'ice-cream' | 'yoghurt' | 'juice'>('ice-cream');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAdding(false);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category);
    setDescription(product.description);
    setImage(product.image);
    setBadge(product.badge || '');
  };

  const openAdd = () => {
    setEditingProduct(null);
    setIsAdding(true);
    setName('');
    setPrice('');
    setCategory('ice-cream');
    setDescription('');
    setImage('');
    setBadge('');
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsAdding(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File is too large! Please upload an image smaller than 2MB to ensure local storage doesn't fail.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description || !image) {
      alert("Please fill in all required fields (Name, Price, Description, Image)");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) {
      alert("Price must be a valid number");
      return;
    }

    const productData = {
      name,
      price: priceNum,
      category,
      description,
      image,
      badge: badge.trim() === '' ? undefined : badge
    };

    if (editingProduct) {
      onUpdateProduct({ ...productData, id: editingProduct.id });
    } else {
      onAddProduct(productData);
    }
    handleCloseForm();
  };

  const handleSeedDatabase = async () => {
    if(confirm('Are you sure you want to seed the database with default products? This will add initial data to your Firestore.')) {
      for (const prod of PRODUCTS) {
        try {
          const { id, ...prodData } = prod;
          await onAddProduct(prodData);
        } catch (e) {
          console.error("Failed to seed", prod.name, e);
        }
      }
      alert('Seeding complete! Check your products list.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-stone-100 transition">
              <ArrowLeft className="h-5 w-5 text-berry-purple" />
            </button>
            <h1 className="text-3xl font-bold font-serif text-berry-purple flex items-center space-x-2">
              <Package className="h-8 w-8" />
              <span>Product Manager</span>
            </h1>
          </div>
          {!isAdding && !editingProduct && (
            <div className="flex items-center space-x-3">
              {products.length === 0 && (
                <button 
                  onClick={handleSeedDatabase}
                  className="flex items-center space-x-2 bg-stone-200 text-stone-700 px-4 py-2 rounded-xl shadow-sm hover:bg-stone-300 transition"
                >
                  <DatabaseBackup className="h-4 w-4" />
                  <span className="font-semibold hidden sm:inline">Seed Default Data</span>
                </button>
              )}
              <button 
                onClick={openAdd}
                className="flex items-center space-x-2 bg-berry-purple text-white px-4 py-2 rounded-xl shadow-md hover:bg-berry-purple/90 transition"
              >
                <Plus className="h-4 w-4" />
                <span className="font-semibold">Add New</span>
              </button>
            </div>
          )}
        </div>

        {(isAdding || editingProduct) ? (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-stone-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-berry-purple">
                {isAdding ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button onClick={handleCloseForm} className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Product Name *</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-berry-purple" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Price (₵) *</label>
                    <input type="number" step="0.1" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-berry-purple" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Category *</label>
                    <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-berry-purple">
                      <option value="ice-cream">Ice Cream</option>
                      <option value="yoghurt">Yoghurt</option>
                      <option value="juice">Juice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Badge (Optional e.g. Bestseller)</label>
                    <input type="text" value={badge} onChange={e => setBadge(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-berry-purple" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Description *</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-berry-purple resize-none" required></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1">Image *</label>
                    <div className="flex items-center space-x-4">
                      <div 
                        className="h-24 w-24 rounded-xl border-2 border-dashed border-stone-300 flex items-center justify-center bg-stone-50 overflow-hidden relative"
                      >
                        {image ? (
                          <img src={image} alt="Preview" className="object-cover w-full h-full" />
                        ) : (
                          <Upload className="h-6 w-6 text-stone-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={fileInputRef} 
                          className="hidden" 
                          onChange={handleImageUpload} 
                        />
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-stone-100 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-200 transition text-sm font-semibold"
                        >
                          Choose File...
                        </button>
                        <p className="text-xs text-stone-500 mt-2">Max size: 2MB. Image is stored locally.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-stone-200">
                <button type="button" onClick={handleCloseForm} className="px-6 py-2 rounded-xl font-semibold text-stone-600 hover:bg-stone-100 transition">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-xl font-semibold text-white bg-fresh-green hover:bg-emerald-600 shadow-md transition">
                  {isAdding ? 'Save Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-sm">
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-stone-50 transition">
                      <td className="p-4 flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="font-bold text-stone-800">{product.name}</p>
                          <p className="text-xs text-stone-500 truncate max-w-xs">{product.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-berry-pink/20 text-berry-purple rounded-full text-xs font-bold uppercase tracking-wide">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-stone-800">
                        ₵{product.price.toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => openEdit(product)}
                            className="p-2 text-stone-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              if(confirm('Are you sure you want to delete this product?')) {
                                onDeleteProduct(product.id);
                              }
                            }}
                            className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-stone-500">
                        No products found. Add some to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
