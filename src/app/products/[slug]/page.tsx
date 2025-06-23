import Product from '@/components/product';
import React from 'react';

interface Props {
  params: { slug: string };
}

export default function ProductDetailPage( ) {


  return (
   <div className='h-full w-full flex items-center justify-center p-4 mt-18 md:mt-20'>
    <Product  />
   </div>
  )
}
