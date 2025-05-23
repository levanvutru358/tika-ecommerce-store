import React from 'react';
import { Button } from '../ui/button';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product } from '@/types/product.type';

const sampleCartItems: Product[] = [
  {
    id: 1,
    title: "Men's Cotton T-Shirt",
    price: 199000,
    description: "Soft and breathable cotton t-shirt, perfect for all occasions.",
    category: "Men's Fashion",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.5, count: 120 },
  },
  {
    id: 2,
    title: "Slim Fit Jeans",
    price: 499000,
    description: "Stylish slim-fit jeans, durable and comfortable material.",
    category: "Men's Fashion",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 4.2, count: 85 },
  },
];

const Header: React.FC = () => {
  const navData = [
    { title: 'Products', link: '/products' },
    { title: 'Categories', link: '/categories' },
    { title: 'Blog', link: '/blog' },
    { title: 'Contact', link: '/contact' },
  ];

  return (
    <header className='flex flex-row items-center justify-between'>
      <NavLink to={'/'} className='text-2xl font-bold text-primary uppercase'>TruShop</NavLink>
      <div className='flex flex-row items-center gap-6'>
        {navData.map(({ title, link }, index) => (
          <NavLink key={index} to={link} className={'capitalize hover:underline hover:text-primary mx-5'}>
            {title}
          </NavLink>
        ))}
      </div>
      <div className='flex flex-row items-center gap-5'>
        <Sheet>
          <SheetTrigger>
            <Button variant={'outline'}><ShoppingCart /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Shopping Cart</SheetTitle>
              <SheetDescription>
                Review your selected products. You can edit quantities, remove items, or proceed to checkout.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 mx-4">
              {sampleCartItems.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {sampleCartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/64')} 
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => alert(`Remove item ${item.id}`)} 
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="mt-4 flex justify-end">
                    <Button asChild>
                      <Link to="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <div className='flex flex-row items-center gap-2'>
          <Button variant={'default'} asChild>
            <Link to={'/login'}>Login</Link>
          </Button>
          <Button variant={'secondary'} asChild>
            <Link to={'/register'}>Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;