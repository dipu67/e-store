import Product from '@/components/product';
import React from 'react';
export default async function ProductDetailPage(  {params}: {
  params: { slug: string };
}) {
  const slug  = await params.slug;

  return (
   <div className='h-full w-full flex items-center justify-center p-4 mt-18 md:mt-20'>
    <Product id={slug} />
   </div>
  )
}
