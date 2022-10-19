import { Fragment, useEffect, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useFetch, useSearch } from '../store'
import Image from 'next/image'
import { useRouter } from 'next/router'
var md = require('markdown-it')();

const items = [
    {
        id: 1,
        name: 'Animal Crossing: New Horizons',
        description: 'Work from home accessories',
        imageSrc: '/animal.jfif',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '/product/Animal Crossing: New Horizons',
    },
    {
        id: 2,
        name: 'Clock',
        description: 'Journals and note-taking',
        imageSrc: '/clock.jfif',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '/product/Clock',
    },
    {
        id: 3,
        name: 'Ganesha',
        description: 'Daily commute essentials',
        imageSrc: '/ganesh_murti.jfif',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '/product/Ganesha',
    },
    // More items...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CommandPalete() {

    let router = useRouter()

    // let { isSearch } = props;
    let isSearch = useSearch(state => state.isSearch);
    let closeSearch = useSearch(state => state.close);
    let urlFetch = useFetch()


    const [query, setQuery] = useState('')
    const [items, setItems] = useState([])

    async function handleSearch() {
        let data = await urlFetch.urlFetch(`/items?_q=${query}&populate=*`, 'GET')
        console.log(data);
        setItems(data.data)
        // closeSearch()
    }

    useEffect(() => {
        if (query.length > 0) {
            handleSearch()
        }


    }, [query])



    // const filteredItems =
    //     query === ''
    //         ? []
    //         : items.filter((item) => {
    //             return item.name.toLowerCase().includes(query.toLowerCase())
    //         })

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
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 blur-sm backdrop-blur-0 transition-opacity" />
                </Transition.Child>

                <Transition.Child
                    // as={Fragment}
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
                        onChange={(e) => {
                            console.log(e);
                            // return alert('hi')
                            // router.push(item.attributes.Slug)
                            // closeSearch()
                        }

                            // (window.location = item.href)

                        }
                        value={items}

                    >
                        <div className="relative focus-visible:outline-none">
                            <SearchIcon
                                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            <Combobox.Input
                                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:ring-purple-600 focus-visible:outline-none ring-1 ring-purple-600"
                                placeholder="Search..."
                                onChange={(event) => setQuery(event.target.value)}
                            />
                        </div>

                        {items.length > 0 && (
                            <Combobox.Options static className="max-h-96 scroll-py-3 overflow-y-auto p-3">
                                {items.map((item) => (
                                    <Combobox.Option
                                        key={item.idOfItem}
                                        value={item.idOfItem}
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
                                                        src={`http://localhost:1337${item.attributes?.Imgs.data[0].attributes.formats.thumbnail.url}`}

                                                        height='32px' width='32px' alt="" className="h-8 w-8 object-cover" />
                                                </div>
                                                <div className="ml-4 flex-auto">
                                                    <p className={classNames('text-sm font-medium', active ? 'text-gray-900' : 'text-gray-700')}>
                                                        {item.attributes.name}
                                                    </p>
                                                    <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}
                                                        dangerouslySetInnerHTML={{ __html: `${md.render((item.attributes.desc).slice(0, 20))}...` }}

                                                    />
                                                    {/* {item.attributes.desc}
                                                    </p> */}
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
                                <p className="mt-2 text-gray-500">No components found for this search term. Please try again.</p>
                            </div>
                        )}
                    </Combobox>
                </Transition.Child>
            </Dialog>
        </Transition.Root >
    )
}


// {{Local_URL}}/products?_q=New

