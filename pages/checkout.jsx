import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'
import { useAuth, useCartStore } from '../store'
import Link from 'next/link'
import { PlusSmIcon as PlusSmIconSolid, MinusSmIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { ImageCompo } from '../compo/ImageCompo'
import Head from 'next/head';
import Script from 'next/script'

const products = [
    {
        id: 1,
        title: 'Basic Tee',
        href: '#',
        price: '$32.00',
        color: 'Black',
        size: 'Large',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },
    // More products...
]
const deliveryMethods = [
    { id: 1, title: 'On Shop', turnaround: 'You have to come to shop for your order' },
    { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    let auth = useAuth()
    let router = useRouter()
    let cart = useCartStore();
    const [products, setProducts] = useState(cart.cart);


    useEffect(() => {

        auth.isLoggedinUser();

    }, [])



    useEffect(() => {
        if (typeof window !== "undefined") {



            if (!localStorage?.getItem("user")) {
                console.log('Not logged')
                router.push('/login?callback=/checkout')
            }

        }
        if (cart.cart) {
            console.log(cart.cart);
            setProducts(cart.cart);
        }


    }, [cart.cart, auth])



    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])


    async function startPayment({ cart, subTotal }) {




        let txnToken;
        let oid = Math.floor(Math.random() * Date.now());


        let data = {
            MID: process.env.NEXT_PUBLIC_MID,
            oid,
            cart,
            subTotal,
            email: "meshv1823@gmail.com"
        }

        // Get a transaction token
        let a = await fetch(`https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_MID}&orderId=${oid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let b = await a.json()
        txnToken = b.body.txnToken;
        console.log(b)

        // function openJsCheckoutPopup(orderId, txnToken, amount){
        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": oid,
                "token": txnToken,
                "tokenType": "TXN_TOKEN",
                "amount": subTotal
            },
            "merchant": {
                "redirect": true
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };
        if (window.Paytm && window.Paytm.CheckoutJS) {
            // initialze configuration using init method 
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke checkoutjs
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            });
        }
        else {

            console.log('Not checkpr');
            console.log(window.Paytm);
        }
        //   }



    }



    return (
        <div className="bg-gray-50">
            <Head>

                <title>Paytm JS Checkout - NodeJs</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
                <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} />

                {/* 
PAYTM_MID = "ZLaVfW76654802288395"
PAYTM_MERCHANT_KEY = "MU3inA3i3Ara5GX&"

var ENV= 'securegw-stage.paytm.in';
var WEBSITE= 'WEBSTAGING';

exports.MID = MID;
exports.MKEY = MKEY;
exports.ENV = ENV;
exports.WEBSITE = WEBSITE; */}


                <Script type="application/javascript" crossOrigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`} />


            </Head>
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Checkout</h2>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                            <div className="mt-4">
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={auth?.user?.email}
                                        type="email"
                                        disabled
                                        id="email-address"
                                        name="email-address"
                                        autoComplete="email"
                                        className="disabled block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <span className='text-sm text-gray-500'>Make sure your email is Correct. As we will send you payment receipt once you make your order successful via online.</span>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            value={auth?.user?.name}
                                            type="text"
                                            id="first-name"
                                            name="first-name"
                                            autoComplete="given-name"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>





                                <div className="sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="street-address"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>





                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <div className="mt-1">
                                        <div className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                value='India'
                                                disabled
                                                autoComplete="street-address"
                                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                        State / Province
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            value='Gujrat'
                                            disabled
                                            autoComplete="address-level1"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>



                                <div className="sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            autoComplete="tel"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-10">
                            <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                                <RadioGroup.Label className="text-lg font-medium text-gray-900">Delivery method</RadioGroup.Label>

                                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {deliveryMethods.map((deliveryMethod) => (
                                        <RadioGroup.Option
                                            key={deliveryMethod.id}
                                            value={deliveryMethod}
                                            className={({ checked, active }) =>
                                                classNames(
                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                )
                                            }
                                        >
                                            {({ checked, active }) => (
                                                <>
                                                    <div className="flex-1 flex">
                                                        <div className="flex flex-col">
                                                            <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                                                {deliveryMethod.title}
                                                            </RadioGroup.Label>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className="mt-1 flex items-center text-sm text-gray-500"
                                                            >
                                                                {deliveryMethod.turnaround}
                                                            </RadioGroup.Description>
                                                            <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                                                {deliveryMethod.price}
                                                            </RadioGroup.Description>
                                                        </div>
                                                    </div>
                                                    {checked ? <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" /> : null}
                                                    <div
                                                        className={classNames(
                                                            active ? 'border' : 'border-2',
                                                            checked ? 'border-indigo-500' : 'border-transparent',
                                                            'absolute -inset-px rounded-lg pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>


                    </div>

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <h3 className="sr-only">Items in your cart</h3>
                            <ul role="list" className="divide-y divide-gray-200">
                                {products.map((product) => (
                                    <li key={product.item.id} className="flex py-6 px-4 sm:px-6">
                                        <div className="flex-shrink-0">
                                            {/* <img
                                                src={`https://strapi-meshv.herokuapp.com${product.item?.pic.data[0].attributes.formats.large.url}`}

                                                alt={product.item.imageAlt} className="w-20 rounded-md" /> */}


                                            <ImageCompo
                                                src={product.item?.pic}
                                                className="w-20 rounded-md"
                                                width={100}
                                                height='120'
                                                layout="fill"
                                                alt={product.item.imageAlt}
                                            />

                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <Link href={`/product/${product.item.Slug}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                            {product.item.name}
                                                        </Link>
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">{product.item.category}</p>
                                                    <p className="mt-1 text-sm text-gray-500">{product.item.size}</p>
                                                </div>

                                                <div className="ml-4 flex-shrink-0 flow-root">
                                                    <button
                                                        type="button"
                                                        onClick={() => cart.remove(product.idOfItem)}
                                                        className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-1 pt-2 flex items-end justify-between">
                                                <p className="mt-1 text-sm font-medium text-gray-900">&#8377; {product.item.price}</p>

                                                <div className="ml-4">
                                                    <label htmlFor="quantity" className="sr-only">
                                                        Quantity
                                                    </label>
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
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">&#8377; {cart.totalAmount}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Shipping</dt>
                                    <dd className="text-sm font-medium text-gray-900">&#8377; {cart.shipAmount}</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Taxes</dt>
                                    <dd className="text-sm font-medium text-gray-900">&#8377; {cart.taxAmount}</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">Total</dt>
                                    <dd className="text-base font-medium text-gray-900">&#8377; {cart.totalAmount}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                <button
                                    type="button"
                                    onClick={startPayment}
                                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                >
                                    Pay &#8377; {cart.totalAmount}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}