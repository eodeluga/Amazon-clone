import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from '../components/Currency'
import Header from '../components/Header'
import { itemsTotal, selectItems } from '../slices/basketSlice'

function Checkout() {
    const items = useSelector(selectItems);
    const session = useSession();
    const total = useSelector(itemsTotal);
    
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto p-10'>
                {/* Left */}
                <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={2048}
                        height={250}
                        objectFit="contain"
                        alt="ad"
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length === 0
                                ? "Your Amazon basket is empty"
                                : "Shopping Basket"}
                        </h1>

                        {items.map((item, i) =>
                            <CheckoutProduct
                                key={i}
                                {...item}
                            />
                        )}
                    </div>
                </div>
                {/* Right */}
                {items.length > 0 && (
                    <div className='flex flex-col m-5 p-10 bg-white shadow-md'>
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items):{" "}
                                <span className='font-bold'>
                                    <Currency symbol={'£'} value={total} />
                                </span>
                            </h2>
                            <button
                                disabled={session.status === 'unauthenticated'}
                                className={`button mt-2 ${session.status === 'unauthenticated' &&
                                    'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                {session.status === 'authenticated' ? "Sign in to checkout" : "Proceed to checkout"}
                            </button>
                        </>
                    </div>
                )}
            </main>
        </div>
    );
}
export default Checkout