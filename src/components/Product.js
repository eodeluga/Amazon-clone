import Image from 'next/image';
import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Currency from './Currency';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image, }) {

    const randomVal = Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 11)) + MIN_RATING;
    const [rating] = useState(randomVal);
    const [hasPrime] = useState(Math.random() < 0.5);
    const [hasMounted, setHasMounted] = useState(false);

    const dispatch = useDispatch();
    const persistConfig = {
        key: 'counter',
        storage,
    };

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        };

        // Sending the product as an action to the REDUX store...the basket slice
        dispatch(addToBasket(product));
    }

    useEffect(() => {
        // Toggle on client-side, because useEffect doesn't run on server-side/during SSG build
        setHasMounted(true);
    });

    return (

        <div className="relative flex-col m-5 bg-white z-30 p-10">
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">
                {category}
            </p>
            <Image className='object-fill'
                src={image}
                height={200}
                width={200}
                alt="item image" />
            <h4 className="my-3">{title}</h4>

            {/* Only render the StarIcons on client-side, as hasMounted will always be false on server-side */}
            {hasMounted && (
                <div className="flex">
                    {Array(randomVal)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                </div>
            )}

            <p className="text-xs my-2 line-clamp-2">{description}</p>
            {
                <div className="mb-5">
                    <Currency value={price} symbol="£" />
                </div>
            }

            {hasMounted && hasPrime && (
                <div className="flex items-center space-x-2 -mt-5">
                    <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
                    <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                </div>
            )}

            <button onClick={addItemToBasket} className="m-auto button">Add to Basket</button>
        </div>
    )
}
export default Product