
import  Card  from '@/components/productCard'
import React from 'react'

export default function page() {
  return (
    
    <div className='h-full w-full p-1 md:p-8 mt-18 md:mt-20'>
     
        <div className='h-full w-full '>
            <h1 className='text-2xl text-white font-bold mb-4 pl-4'>Products Page</h1>
            <p className='text-lg text-white mb-5 pl-3'>This is the products page where you can find various items.</p>
            <Card />
        </div>
      
    </div>
  )
}
