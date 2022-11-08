import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import { ImageCompo, getImgUrl } from './ImageCompo';

const callouts = [
    {
        name: 'Animal Crossing: New Horizons',
        description: 'Work from home accessories',
        imageSrc: '/animal.jfif',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
    },
    {
        name: 'Clock',
        description: 'Journals and note-taking',
        imageSrc: 'clock.jfif',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
    },
    {
        name: 'Ganesha',
        description: 'Daily commute essentials',
        imageSrc: 'ganesh_murti.jfif',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
    },
]

export default function Category() {

    const [items, setItems] = useState([]);

    function getItems() {
        // cache the api 


        fetch('https://strapi-meshv.herokuapp.com/api/items?populate=*')
            .then(response => response.json())
            .then(data => setItems((data.data).slice(0, 3)));

    }

    // const getItems = useMemo(() => {
    //     return fetch('https://strapi-meshv.herokuapp.com/api/items?populate=*')
    //         .then(response => response.json())
    //         .then(data => setItems(data.data))
    // }, [])


    useEffect(() => {

        getItems();
        // console.log(items)
    }, [])




    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-16 lg:py-12 lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                        {items && items.map((i) => (
                            <Link href={`/product/${i?.attributes?.Slug}`} key={i.attributes.name}>
                                <div key={i.attributes.name} className="group relative" style={{ cursor: 'pointer' }}>

                                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        {/* <img
                                            // loading='lazy'
                                            // src={`https://strapi-meshv.herokuapp.com${i.attributes.Imgs.data[0].attributes.formats.large.url}`}
                                            src={`https://strapi-meshv.herokuapp.com${getImgUrl(i.attributes.Imgs)}`}
                                            alt={i.attributes.name}
                                            className="w-full h-full object-center object-cover"
                                            layout="fill"
                                        /> */}
                                        {
                                            i.attributes.Imgs &&

                                            <ImageCompo src={i?.attributes?.Imgs}
                                                className="w-full h-full object-center object-cover"
                                                width={500}
                                                height={500}

                                                layout="fill"
                                                alt={i?.attributes?.name}
                                            />
                                        }
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        {/* <React.Fragment> */}
                                        {/* <a href="/"> */}

                                        <span className="absolute inset-0" />
                                        {i.attributes.category.data.attributes.name}

                                        {/* </a> */}
                                        {/* </React.Fragment> */}
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{i.attributes.name}</p>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
