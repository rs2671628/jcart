import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import { FaPlus, FaMinus } from "react-icons/fa6";
import displayInrCurrency from '../helpers/displayCurrency';
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount).fill(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.addToCardProductView.url, {
                method: SummaryApi.addToCardProductView.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
            });
            const responseData = await response.json();
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const increaseQty = async (id) => {
        const updatedData = data.map(product => 
            product._id === id ? { ...product, quantity: product.quantity + 1 } : product
        );
        setData(updatedData);

        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: updatedData.find(product => product._id === id).quantity
                })
            });
            const responseData = await response.json();
            if (!responseData.success) {
                // Revert the update if the API call fails
                fetchData();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            fetchData();
        }
    };

    const decreaseQty = async (id) => {
        const product = data.find(product => product._id === id);
        if (product.quantity <= 1) return;

        const updatedData = data.map(product => 
            product._id === id ? { ...product, quantity: product.quantity - 1 } : product
        );
        setData(updatedData);

        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: updatedData.find(product => product._id === id).quantity
                })
            });
            const responseData = await response.json();
            if (!responseData.success) {
                // Revert the update if the API call fails
                fetchData();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            fetchData();
        }
    };

    const deleteCartProduct = async (id) => {
        const updatedData = data.filter(product => product._id !== id);
        setData(updatedData);
        try {
            const response = await fetch(SummaryApi.deleteCartProduct.url, {
                method: SummaryApi.deleteCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    _id: id
                })
            });
            const responseData = await response.json();
            if (!responseData.success) {
                // Revert the update if the API call fails
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            fetchData();
        }
    };
    const totalQty=data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
    const calculateTotal = () => {
        return data.reduce((total, product) => total + (product.quantity * product.productId.sellingPrice), 0);
    };

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )}
            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((el, index) => (
                            <div key={el+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={product?.productId?.productName} />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <div className='absolute right-0 text-red-500 text-2xl p-2 hover:text-red-700 cursor-pointer rounded-full' onClick={() => deleteCartProduct(product?._id)}>
                                        <MdDeleteForever />
                                    </div>
                                    <h2 className='text-lg lg:text-2xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>Category: {product?.productId?.category}</p>
                                    <div className='flex items-center justify-between'>
                                    <p className='text-red-500 font-medium text-lg'>{displayInrCurrency(product?.productId?.sellingPrice)}</p>
                                    <p className='text-slate-600 font-semibold text-lg'>Total : {displayInrCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>

                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 font-bold text-black bg-green-500 hover:bg-green-700 hover:text-white w-6 h-6 flex justify-center items-center rounded-full' onClick={() => decreaseQty(product?._id)}>
                                            <FaMinus />
                                        </button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 font-bold text-black bg-green-500 hover:bg-green-700 hover:text-white w-6 h-6 flex justify-center items-center rounded-full' onClick={() => increaseQty(product?._id)}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>Total: {displayInrCurrency(0)}</div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className=' bg-red-400 font-semibold text-black px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg '>
                                <p className='text-slate-600'>Quantity :</p>
                                <p className='text-slate-800'>{totalQty}</p>
                                
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p className='text-slate-600'>Total Price :</p>
                                <p className='text-slate-800'>{displayInrCurrency(calculateTotal())}</p>
                            </div>
                            <button className='bg-green-500 w-full p-1 mt-4 rounded text-white hover:bg-green-700'>Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
