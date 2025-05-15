/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionBreadcumb from '@/components/section-breadcumb';
import type { Product } from '@/types/product.type';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios'
import { ProductCard } from '@/components/product-card';
import { ProductFilterSidebar } from '@/components/product-filter-sidebar';
import { ProductSkeletonCard } from '@/components/product-skeleton-card';

const ProductPage: React.FC = () => {
    const [productData, setProductData] = useState<Product[] | []>([]);
    const [loading, setLoading] = useState(true);
    const getAllProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://fakestoreapi.com/products');
            if(response) {
                setProductData(response.data)
            }
        } catch (error: any) {
            toast(error.message, {
                    description: "Something went wrong",
                    action: {
                        label: "Try again",
                        onClick: () => console.log("Try again"),
                    },
            })
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getAllProduct()
    }, [])
    
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const applyFilters = (filters: {
    categories: string[]
    minRating: number
    priceRange: number[]
    }) => {
    const { categories, minRating, priceRange } = filters
    const filtered = productData.filter(p => {
        const matchCategory = categories.length === 0 || categories.includes(p.category)
        const matchRating = p.rating.rate >= minRating
        const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
        return matchCategory && matchRating && matchPrice
    })
    setFilteredProducts(filtered)
    }

    useEffect(() => {
    setFilteredProducts(productData)
    }, [productData])
    return (
        <div className='flex flex-col items-start'>
          <SectionBreadcumb title='Products' link='/products' />
          <h1 className='font-bold text-2xl'>Products</h1>
          <div className='grid grid-cols-1 md:grid-cols-[2fr_8fr] w-full my-3'>
            <div className='mr-6'>
                <ProductFilterSidebar allProducts={productData} onFilterChange={applyFilters} />
            </div>
           <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 w-full gap-4'>
            {loading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <ProductSkeletonCard key={idx} />
                ))
                : filteredProducts.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))}
            </div>
          </div>    
        </div>
    );
};

export default ProductPage;