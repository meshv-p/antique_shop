import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '../store'
import { PlusSmIcon as PlusSmIconSolid, MinusSmIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ImageCompo } from '../compo/ImageCompo';

const productsArr = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Sienna',
        inStock: true,
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in sienna.",
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Black',
        inStock: false,
        leadTime: '3–4 weeks',
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    {
        id: 3,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35.00',
        color: 'White',
        inStock: true,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
        imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
]

export default function Cart() {
    let router = useRouter();
    let cart = useCartStore();
    const [products, setProducts] = useState(cart.cart);


    useEffect(() => {
        if (cart.cart) {
            console.log(cart.cart);
            setProducts(cart.cart);
        }


    }, [cart.cart])


    function removeItem(e, id) {
        console.log(id, 'to be removed')
        cart.remove(id);

    }


    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                            {products.map((product, productIdx) => (
                                <li key={product.idOfItem} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        {/* <img
                                            src={`https://strapi-meshv.herokuapp.com${product.item?.pic.data[0].attributes.formats.large.url}`}

                                            // src={product.item?.pic.data[0].attributes.formats.large.url}
                                            alt={product.item.name}
                                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                        /> */}
                                        <ImageCompo
                                            src={product.item?.pic}
                                            alt={product.item.name}
                                            // layout="fill"
                                            width={200}
                                            height={200}

                                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <Link href={`product/${product.item.Slug}`} >
                                                            <span className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.item.name}
                                                            </span>
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className="mt-1 flex text-sm">
                                                    <p className="text-gray-500">{product.item.color}</p>
                                                    {product.item?.size && product.item.size ? (
                                                        <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.item.size}</p>
                                                    ) : null}
                                                </div>

                                                <p className="mt-1 text-sm font-medium text-gray-900">&#8377; {product.item.price * product.item.qty}</p>

                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">



                                                <div className="absolute top-0 right-0">
                                                    <button type="button"
                                                        className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                                        onClick={e => removeItem(e, product.idOfItem)}
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <XIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="qty flex gap-1 flex-row">

                                            <button
                                                type="button"
                                                onClick={() => cart.decrease(product.idOfItem)}
                                                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <MinusSmIcon className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                            <span className='mx-2'>

                                                {product.item.qty}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => cart.increase(product.idOfItem)}
                                                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <PlusSmIconSolid className="h-4 w-4" aria-hidden="true" />
                                            </button>
                                        </div>

                                        <label htmlFor={`quantity-${product.item.qty}`} className="sr-only">
                                            Quantity
                                        </label>

                                        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                                            {product.item?.inStock ? (
                                                <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                                            ) : (
                                                <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                            )}

                                            <span>{product.item.inStock ? 'In stock' : `Item availabe at On-Shop`}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">&#8377; {cart.totalAmount}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">&#8377; {cart.shipAmount}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">&#8377; {cart.taxAmount}</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">&#8377; {cart.totalAmount}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                // type="submit"
                                onClick={() => router.push('/checkout')}
                                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}