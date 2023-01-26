import Image from 'next/image';
import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from './Currency';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    
    const [rating, setRating] = useState(0);
    const [hasPrime, setHasPrime] = useState(0)
    const randomVal = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 11)) + MIN_RATING;
    
    // Fixes hydration error by triggering a React re-render after setting these states 
    useEffect(() => {
        setRating(randomVal)
        setHasPrime(Math.random() < 0.5);
    });
    
    return (
        
        <div className="relative flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                {category}
            </p>
            <Image className='object-fill'
                src={image}
                height={200}
                width={200} />
            <h4 className="my-3">{title}</h4>
            
            <div className="flex">
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500"/>
                    ))}
            </div>

            <p className="text-xs my-2 line-clamp-2">{description}</p>
            {
                <div className="mb-5">
                    <Currency value={price} symbol="£"/>
                </div>
            }

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}

            <button className="m-auto button">Add to Basket</button>


        </div>
    )
}

export default Product