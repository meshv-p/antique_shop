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
            <div className="bg-white">
                {product && <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol
                            role="list"
                            className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
                        >
                            {product.breadcrumbs && product.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a
                                            href={breadcrumb.href}
                                            className="mr-2 text-sm font-medium text-gray-900"
                                        >
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="w-4 h-5 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm font-medium text-gray-500 hover:text-gray-600">
                                <Link
                                    href='/'
                                    aria-current="page"
                                    className=""
                                >
                                    Home /
                                </Link>
                                {' ' + product.attributes.name}
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                            <Image
                                loading='lazy'
                                src={`http://localhost:1337${product.attributes.Imgs.data[0].attributes.formats.large.url}`}
                                alt={product.attributes.name}
                                className="w-full h-full object-center object-cover"
                                width={product.attributes.Imgs.data[0].attributes.formats.large.width}
                                height={product.attributes.Imgs.data[0].attributes.formats.large.height}

                            />
                        </div>
                        {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                <img
                                    src={product.images[1].src}
                                    alt={product.images[1].alt}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            {/* <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                <img
                                    src={product.images[2].src}
                                    alt={product.images[2].alt}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div> 
                        </div> */}
                        {/* <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                            <img
                                src={product.images[3].src}
                                alt={product.images[3].alt}
                                className="w-full h-full object-center object-cover"
                            />
                        </div> */}
                    </div>

                    {/* Product info */}
                    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:tracking-tight sm:text-3xl">
                                {product.attributes.name}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="tracking-tight text-3xl text-gray-900">
                                &#8377; {product.attributes.Price}
                            </p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center"></div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a
                                        href={reviews.href}
                                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>

                            <div className="mt-10">
                                {/* Colors */}
                                <div>
                                    <h3 className="text-sm text-gray-900 font-medium">Color</h3>
                                </div>

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Size guide
                                        </a>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={addToCart}
                                >
                                    Add to bag
                                </button>
                            </div>
                        </div>

                        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    {/* <p className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: md.renderInline(product.attributes.desc) }} /> */}
                                    <p className="text-base text-gray-900" dangerouslySetInnerHTML={{ __html: md.render(product.attributes.desc) }} />
                                    {/* {renderedHTML} */}
                                    {/* </p> */}
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">
                                    Highlights
                                </h3>

                                <div className="mt-4">
                                    <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                                        {product.attributes?.highlights?.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.attributes?.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

        </>
    )
}

export default ProductItem


export async function getServerSideProps(context) {
    const { id } = context.params

    const res = await fetch(`http://localhost:1337/api/items?filters[Slug]=${id}&populate=*`)
    const item = await res.json()


    // generate HTML
    // const renderedHTML = await markdownToHtml(item.data[0].attributes.desc);

    return {
        props: {
            item,
            // renderedHTML
        },
    }
}