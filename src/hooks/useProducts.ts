import { useState, useEffect } from 'react';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, doc, deleteDoc, onSnapshot, query, addDoc, updateDoc } from 'firebase/firestore';
import { uploadImageToCloudinary } from '../cloudinary';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Listen for real-time updates from Firestore
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData: Product[] = [];
      snapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsData);
      setIsLoaded(true);
    }, (error) => {
      console.error("Error fetching products:", error);
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Uploads a base64 data-URL image to Cloudinary and returns the
   * public download URL. If the value is already an https:// URL (i.e. not
   * a newly-selected file) it is returned unchanged.
   */
  const uploadImage = async (base64Image: string): Promise<string> => {
    try {
      return await uploadImageToCloudinary(base64Image);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  const DUMMY_IDS = [
    'unsweetened-bowl', 'unsweetened-cup', 'sweetened-bowl', 'sweetened-cup',
    'extra-berries', 'extra-nuts', 'juice-orange', 'juice-pine', 'juice-cucumber',
    'juice-carrot', 'juice-apple', 'juice-coconut', 'combo-pine-ginger',
    'combo-watermelon-ginger-lemon', 'combo-tropical-chill', 'combo-detox-burst',
    'combo-sunrise-glow', 'combo-pink-breeze'
  ];

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      // Remove dummy data when the first real product is uploaded
      const dummyProducts = products.filter(p => 
        DUMMY_IDS.includes(p.id) || (p.image && p.image.includes('unsplash.com'))
      );
      
      for (const dummy of dummyProducts) {
        try {
          await deleteDoc(doc(db, 'products', dummy.id));
        } catch (err) {
          console.error(`Failed to delete dummy product ${dummy.id}:`, err);
        }
      }

      // First add the document to get an ID
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        // temporary image URL until we upload it
      });

      // Now upload the image
      if (product.image) {
        const imageUrl = await uploadImage(product.image);
        // Update the document with the real image URL
        await updateDoc(docRef, { image: imageUrl });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const docRef = doc(db, 'products', product.id);
      
      let imageUrl = product.image;
      if (product.image && product.image.startsWith('data:image')) {
        imageUrl = await uploadImage(product.image);
      }

      await updateDoc(docRef, {
        name: product.name,
        price: product.price,
        category: product.category,
        segment: product.segment ?? '',
        size: product.size ?? '',
        description: product.description ?? '',
        image: imageUrl,
        badge: product.badge ?? '',
        popular: product.popular ?? false,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return {
    products,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
