import { useState, useEffect } from 'react';
import { Product } from '../types';
import { db } from '../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, addDoc, updateDoc } from 'firebase/firestore';

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

  const uploadImage = async (base64Image: string, productId: string): Promise<string> => {
    // If it's not a base64 data URL (e.g. already a firebase/cloudinary URL), just return it
    if (!base64Image.startsWith('data:image')) {
      return base64Image;
    }
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, productId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      // First add the document to get an ID
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        // temporary image URL until we upload it
      });

      // Now upload the image with the new product ID
      if (product.image) {
        const imageUrl = await uploadImage(product.image, docRef.id);
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
      if (product.image.startsWith('data:image')) {
        imageUrl = await uploadImage(product.image, product.id);
      }

      await updateDoc(docRef, {
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: imageUrl,
        badge: product.badge
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
