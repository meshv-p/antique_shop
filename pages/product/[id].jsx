import React from 'react'
import Head from "next/head";
import Image from "next/image";
// import md from 'markdown-it';
var md = require('markdown-it')();
import { useState } from "react";
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { useCartStore } from '../../store';
import { renderMarkdown } from '../../services/markdown';
import { markdownToHtml } from '../../services/markdownToHtml';
import Link from 'next/link';
import { ImageCompo } from '../../compo/ImageCompo';
import { Dialog, Disclosure, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';



// const product = {
//     name: "Basic Tee 6-Pack",
//     price: "$192",
//     href: "#",
//     breadcrumbs: [
//         { id: 1, name: "Men", href: "#" },
//         { id: 2, name: "Clothing", href: "#" },
//     ],
//     images: [
//         {
//             src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//             alt: "Two each of gray, white, and black shirts laying flat.",
//         },
//         {
//             src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//             alt: "Model wearing plain black basic tee.",
//         },
//         {
//             src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//             alt: "Model wearing plain gray basic tee.",
//         },
//         {
//             src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//             alt: "Model wearing plain white basic tee.",
//         },
//     ],
//     colors: [
//         { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//         { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//         { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//     ],
//     sizes: [
//         { name: "XXS", inStock: false },
//         { name: "XS", inStock: true },
//         { name: "S", inStock: true },
//         { name: "M", inStock: true },
//         { name: "L", inStock: true },
//         { name: "XL", inStock: true },
//         { name: "2XL", inStock: true },
//         { name: "3XL", inStock: true },
//     ],
//     description:
//         'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//     highlights: [
//         "Hand cut and sewn locally",
//         "Dyed with our proprietary colors",
//         "Pre-washed & pre-shrunk",
//         "Ultra-soft 100% cotton",
//     ],
//     details:
//         'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };


const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const ProductItem = ({ item }) => {
    const [product, setProduct] = useState(item.data[0])

    let url = useRouter()
    let cart = useCartStore()

    useEffect(() => {
        console.log(product, 'pre');

    }, [product])


    function addToCart() {
        console.log("add to cart", product);
        // alert("Added to cart") id,name,qty,price,pic
        let item = { id: product.id, name: product.attributes.name, price: product.attributes.Price, qty: 1, pic: product.attributes.Imgs, Slug: product.attributes.Slug }
        cart.add(item)
        console.log(cart.cart)
    }



    return (
        <>


            <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                        {/* Image gallery */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                            {/* Image selector */}
                            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                                <Tab.List className="grid grid-cols-4 gap-6">
                                    {product?.attributes?.Imgs?.data?.map((image) => (
                                        <Tab
                                            key={image.id}
                                            className="mb-5 relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className="sr-only">{image.name}</span>
                                                    <span className="absolute inset-0 rounded-md overflow-hidden">
                                                        <img src={image.attributes.formats.large.url} alt="" className="w-full h-full object-center object-cover" />
                                                    </span>
                                                    <span
                                                        className={classNames(
                                                            selected ? 'ring-indigo-500' : 'ring-transparent',
                                                            'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            )}
                                        </Tab>
                                    ))}
                                </Tab.List>
                            </div>

                            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
                                {product?.attributes?.Imgs?.data?.map((image) => (
                                    <Tab.Panel key={image.id}>
                                        <img
                                            src={image.attributes.formats.large.url}
                                            alt={image.alt}
                                            className="w-full h-full object-center object-cover sm:rounded-lg"
                                        />
                                    </Tab.Panel>
                                ))}
                            </Tab.Panels>
                        </Tab.Group>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.attributes.name}</h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-gray-900"> &#8377; {product.attributes.Price}</p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-3">
                                <h3 className="sr-only">Reviews</h3>
                                {/* <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{product.rating} out of 5 stars</p>
                                </div> */}
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    className="text-base text-gray-700 space-y-6"
                                    dangerouslySetInnerHTML={{ __html: md.render(product.attributes.desc) }}
                                />
                            </div>

                            <div className="mt-6">
                                {/* Colors */}
                                <div>
                                    <h3 className="text-sm text-gray-600">Color</h3>

                                    {/* <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {product.colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedColor,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="p" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.bgColor,
                                                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup> */}
                                </div>

                                <div className="mt-10 flex sm:flex-col1">
                                    <button
                                        type="submit"
                                        onClick={addToCart}

                                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                    >
                                        Add to bag
                                    </button>

                                    <button
                                        type="button"
                                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                    >
                                        <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Add to favorites</span>
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        addToCart()
                                        url.push('/cart')
                                    }
                                    }

                                    className="my-1 max-w-xs flex-1 border-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-700 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                >
                                    Buy now
                                </button>
                            </div>

                            <section aria-labelledby="details-heading" className="mt-12">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>

                                <div className="border-t divide-y divide-gray-200">
                                    {/* {product.details.map((detail) => ( */}
                                    <Disclosure as="div" >
                                        {({ open }) => (
                                            <>
                                                <h3>
                                                    <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                                                        <span
                                                            className={classNames(
                                                                open ? 'text-indigo-600' : 'text-gray-900',
                                                                'text-sm font-medium'
                                                            )}
                                                        >
                                                            Description
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon
                                                                    className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusSmIcon
                                                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel as="div" className="pb-6 prose prose-sm"

                                                    dangerouslySetInnerHTML={{ __html: md.render(product.attributes.desc) }}
                                                />
                                                {/* <ul role="list"> */}
                                                {/* {md.render(product.attributes.desc)} */}
                                                {/* {detail.items.map((item) => (
                                                            <li key={item}>{item}</li>
                                                        ))} */}
                                                {/* </ul> */}
                                                {/* </Disclosure.Panel> */}
                                            </>
                                        )}
                                    </Disclosure>
                                    {/* ))} */}
                                </div>
                            </section>
                        </div>
                    </div>


                </div>
            </main>

        </>
    )
}

export default ProductItem


export async function getServerSideProps(context) {
    const { id } = context.params

    const res = await fetch(`https://strapi-meshv.herokuapp.com/api/items?filters[Slug]=${id}&populate=*`)
    const item = await res.json()
    console.log(item, 'item ============>');

    // generate HTML
    // const renderedHTML = await markdownToHtml(item.data[0].attributes.desc);

    return {
        props: {
            item,
            // renderedHTML
        },
    }
}