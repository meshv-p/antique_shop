/*
  This example requires Tailwind CSS v3.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useFetch, useSearch } from '../store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ImageCompo, getImgUrl } from './ImageCompo';
import Image from 'next/image'

const items = [
    {
        id: 1,
        name: 'Sliders',
        description: 'A collection of sliders for selecting a range of values.',
        url: '#',
        imageUrl: 'https://tailwindui.com/img/component-images/icon-sliders.png',
    },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    let isSearch = useSearch(state => state.isSearch);
    let closeSearch = useSearch(state => state.close);

    const [query, setQuery] = useState('')

    const [open, setOpen] = useState(true)
    const [items, setItems] = useState([])
    let urlFetch = useFetch()
    let router = useRouter()

    function search(query) {
        return urlFetch.urlFetch(`/items?_q=${query}&populate=*`, 'GET').then((data) => {
            // console.log(data)
            return data
        })
    }



    // on change input value and fetch data
    function handleChange(e) {
        console.log(e.target.value)
        setQuery(e.target.value)
        search(e.target.value).then((data) => {
            console.log(data.data)
            setItems(data.data)
        })
    }




    return (
        <Transition.Root show={isSearch} as={Fragment} afterLeave={() => setQuery('')}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={closeSearch}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50  backdrop-blur-0 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Combobox
                        as="div"
                        className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                        onChange={(item) => {
                            router.push(`/product/${item.attributes.Slug}`)
                            closeSearch()
                        }}
                    >

                        <div className="relative">
                            <SearchIcon
                                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <Combobox.Input
                                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-purple-600 focus-visible:outline-none ring-1 ring-purple-600"
                                placeholder="Search..."
                                onChange={(event) => handleChange(event)}
                            />
                        </div>


                        {items.length !== 0 && (
                            <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">

                                {items.map((item) => (
                                    <Combobox.Option
                                        key={item.id}
                                        value={item}
                                        className={({ active }) =>
                                            classNames('flex cursor-default select-none rounded-xl p-3', active && 'bg-gray-100')
                                        }
                                    >
                                        {({ active }) => (
                                            <>
                                                <div
                                                    className={classNames(
                                                        'flex h-10 w-10 flex-none items-center justify-center rounded-full',
                                                        active ? 'bg-gray-700' : 'bg-gray-500'
                                                    )}
                                                >
                                                    <Image
                                                        src={`${item.attributes.Imgs.data[0].attributes.formats.thumbnail.url}`}
                                                        className=" rounded-full object-cover"
                                                        alt=""
                                                        height='32px' width='32px'

                                                    // layout="fill"
                                                    // alt={i.attributes.name}
                                                    />
                                                    {/* <img

                                                        src={`https://strapi-meshv.herokuapp.com${item.attributes?.Imgs.data[0].attributes.formats.large.url}`}

                                                        // src={item.attributes.imageUrl}

                                                        alt="" className="h-8 w-8" /> */}
                                                </div>
                                                <div className="ml-4 flex-auto">
                                                    <p className={classNames('text-sm font-medium', active ? 'text-gray-900' : 'text-gray-700')}>
                                                        {item.attributes.name}
                                                    </p>
                                                    <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}>
                                                        {(item.attributes.desc).slice(0, 10)}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        )}

                        {query !== '' && items.length === 0 && (
                            <div className="py-14 px-6 text-center text-sm sm:px-14">
                                <ExclamationCircleIcon
                                    type="outline"
                                    name="exclamation-circle"
                                    className="mx-auto h-6 w-6 text-gray-400"
                                />
                                <p className="mt-4 font-semibold text-gray-900">No results found</p>
                                <p className="mt-2 text-gray-500">No items found for this search term. Please try again.</p>
                            </div>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}