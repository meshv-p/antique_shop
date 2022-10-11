import Link from 'next/link'
import React from 'react'
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
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
    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto py-16 sm:py-16 lg:py-12 lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

                    <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                        {callouts.map((callout) => (
                            <Link href={`/product/${callout.name}`} key={callout.name}>
                                <div key={callout.name} className="group relative" style={{ cursor: 'pointer' }}>

                                    <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <img
                                            src={callout.imageSrc}
                                            alt={callout.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-6 text-sm text-gray-500">
                                        {/* <React.Fragment> */}
                                        {/* <a href="/"> */}

                                        <span className="absolute inset-0" />
                                        {callout.name}
                                        {/* </a> */}
                                        {/* </React.Fragment> */}
                                    </h3>
                                    <p className="text-base font-semibold text-gray-900">{callout.description}</p>

                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
