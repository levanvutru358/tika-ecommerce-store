/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ProductCard } from '@/components/product-card';
import { ProductSkeletonCard } from '@/components/product-skeleton-card';
import type { Product } from '@/types/product.type';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingTopSelling, setLoadingTopSelling] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch featured products
  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await axios.get('https://fakestoreapi.com/products?limit=4');
      if (response) {
        setProducts(response.data);
      }
    } catch (error: any) {
      toast(error.message, {
        description: 'Something went wrong',
        action: {
          label: 'Try again',
          onClick: () => getProducts(),
        },
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch top selling products (sorted by rating)
  const getTopSellingProducts = async () => {
    try {
      setLoadingTopSelling(true);
      const response = await axios.get('https://fakestoreapi.com/products?limit=4');
      if (response) {
        // Sort by rating client-side since fakestoreapi doesn't support sorting
        const sorted = response.data.sort((a: Product, b: Product) => b.rating.rate - a.rating.rate);
        setTopSellingProducts(sorted.slice(0, 4));
      }
    } catch (error: any) {
      toast(error.message, {
        description: 'Something went wrong',
        action: {
          label: 'Try again',
          onClick: () => getTopSellingProducts(),
        },
      });
    } finally {
      setLoadingTopSelling(false);
    }
  };

  // Fetch categories
  const getCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      if (response) {
        setCategories(response.data);
      }
    } catch (error: any) {
      toast(error.message, {
        description: 'Something went wrong',
        action: {
          label: 'Try again',
          onClick: () => getCategories(),
        },
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    getProducts();
    getTopSellingProducts();
    getCategories();
  }, []);

  return (
    <div className="flex flex-col items-start w-full px-4 md:p-8">

      {/* Banner Section */}
      <div className="w-full rounded-lg py-30 px-6 text-center mb-8 bg-[url(https://images.unsplash.com/photo-1544724677-744ce69a22c6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]">
        <h1 className="text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
          Welcome to TruShop
        </h1>
        <p className="text-gray-600 mt-4 max-w-lg mx-auto">
          Discover the best deals on fashion, electronics, and more. Start shopping now!
        </p>
        <Button asChild className="mt-6 px-6 py-3 bg-primary text-white font-semibold uppercase rounded hover:bg-primary/90 transition">
          <Link to="/products">Shop Now</Link>
        </Button>
      </div>

      {/* Featured Categories Section */}
      <h2 className="font-bold text-2xl md:text-3xl text-gray-800 mb-6">Featured Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
        {loadingCategories ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
          ))
        ) : (
          categories.map((category, idx) => (
            <div
              key={idx}
              className="relative h-40 bg-gray-100 rounded-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition"></div>
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="text-lg font-semibold text-gray-800 capitalize">
                  {category}
                </h3>
                <Button asChild variant="outline" className="mt-2">
                  <Link to={`/categories/${category}`}>Shop Now</Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Featured Products Section */}
      <h2 className="font-bold text-2xl md:text-3xl text-gray-800 mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
        {loadingProducts ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <ProductSkeletonCard key={idx} />
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Promotional Banner */}
      <div className="w-full bg-[url(https://images.unsplash.com/photo-1586377886011-46cd9ef84a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] rounded-lg py-12 px-6 text-center mb-12">
        <h3 className="text-xl md:text-3xl font-bold text-white">
          Special Offer: Up to 50% Off!
        </h3>
        <p className="text-white mt-2 max-w-md mx-auto font-md">
          Don't miss our limited-time deals on top products.
        </p>
        <Button asChild className="mt-4 bg-primary text-white" size={'lg'}>
          <Link to="/products">Grab the Deal</Link>
        </Button>
      </div>

      {/* Top Selling Products Section */}
      <h2 className="font-bold text-2xl md:text-3xl text-gray-800 mb-6">Top Selling Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12">
        {loadingTopSelling ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <ProductSkeletonCard key={idx} />
          ))
        ) : (
          topSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* Why Shop Section */}
      <div className="w-full text-center mt-12">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          Why Shop with TruShop?
        </h3>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Enjoy fast shipping, top-quality products, and excellent customer service.
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/about">Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;