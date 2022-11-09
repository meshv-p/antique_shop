
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import { ImageCompo } from '../../compo/ImageCompo'
import Link from 'next/link'
import qs from 'qs'


const sortOptions = [
    'Most Popular',
    'Best Rating',
    'Newest',
    'Price: Low to High',
    'Price: High to Low'
]
const subCategories = [
    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Category({ products: p }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [products, setProducts] = useState(p.data)
    // sort by
    const [sortBy, setSortBy] = useState(sortOptions[3].name)



    useEffect(() => {

        console.log(products, 'in')
    }, [])


    // sort by end
    function sortArray(array, key, order = 'asc') {
        console.log(array, key, order);
        return array.sort((a, b) => {
            const x = a.attributes[key]
            const y = b.attributes[key]
            console.log(x, y, 'x, y');
            if (order === 'asc') {

                return y - x
            }
            return x - y
        })
    }

    // let sortCategory = {
    //     'Price: High to Low': sortArray(products, 'Price', 'desc'),
    //     'Price: Low to High': sortArray(products, 'Price'),
    //     'Most Popular': sortArray(products, 'id'),
    //     'Best Rating': sortArray(products, 'rating'),
    //     'Newest': sortArray(products, 'id', 'desc'),

    // }
    //useEffect for sort by
    useEffect(() => {
        console.log(sortBy, 'sort by', products)

        if (sortBy === 'Price: High to Low') {
            console.log(sortBy, 'sort by', products)
            let sorted = sortArray(products, 'Price', 'desc')
            console.log(sorted, 'sorted arr')
            setProducts(sorted)
        }
        if (sortBy === 'Price: Low to High') {
            console.log(sortBy, 'sort by', products)
            let sorted = sortArray(products, 'Price')
            console.log(sorted, 'sorted arr')
            setProducts(sorted)
        }
        if (sortBy === 'Most Popular') {
            console.log(sortBy, 'sort by', products)
            let sorted = sortArray(products, 'id')
            console.log(sorted, 'sorted arr')
            setProducts(sorted)
        }
        if (sortBy === 'Best Rating') {
            setProducts(sorted)
        }
        if (sortBy === 'Newest') {
            let sorted = sortArray(products, 'createdAt', 'desc')
            console.log(sorted, 'sorted arr')
            setProducts(sorted)
        }



    }, [sortBy, products])


    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                                <div className="px-4 flex items-center justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                        {subCategories.map((category) => (
                                            <li key={category.name}>
                                                <a href={category.href} className="block px-2 py-3">
                                                    {category.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>

                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-mx-2 -my-3 flow-root">
                                                        <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">{section.name}</span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-6">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {false && sortOptions.map((option) => (
                                                <Menu.Item key={option}
                                                    onClick={() => {
                                                        console.log(option)
                                                        setSortBy(option);
                                                        // setMobileSortByOpen(false);
                                                    }}
                                                // className='border border-black'
                                                >
                                                    {({ active }) => (
                                                        <div
                                                            // role='button'
                                                            // onClick={() => {
                                                            //     console.log(option)
                                                            //     setSortBy(option)
                                                            // }}
                                                            className={classNames(
                                                                'font-medium text-gray-900',
                                                                active ? 'bg-gray-100' : '',
                                                                // 'bg-gray-100',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option}
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            <select name="" id=""
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                    setSortBy(e.target.value)
                                                }}
                                                value='Sort by'
                                            >
                                                <option value="Newest">Newest</option>
                                                <option value="Price: High to Low">Price: High to Low</option>
                                                <option value="Price: Low to High">Price: Low to High</option>
                                            </select>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View grid</span>
                                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FilterIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>




                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                            {/* {/* Filters  */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <div
                                                onClick={() => { }}

                                            >{category.name}</div>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* {/* Product grid  */}
                            <div className="lg:col-span-3">
                                {/* {/* Replace with your content */}
                                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {products && products.map((product) => (
                                        <Link

                                            key={product.id}
                                            href={`/product/${product.attributes.Slug}`} className="group"
                                            style={{
                                                cursor: 'pointer'
                                            }

                                            }
                                        >
                                            <span className='group' style={{ cursor: 'pointer' }}>
                                                <div className="w-full  bg-gray-200 rounded-lg overflow-hidden ">

                                                    <ImageCompo
                                                        src={product.attributes.Imgs}
                                                        layout="fill"

                                                        alt={product.attributes.name}
                                                        width={product.attributes?.Imgs?.data?.attributes?.formats?.large?.width ?? 600}
                                                        height={product.attributes?.Imgs?.data?.attributes?.formats?.large?.height ?? 1000}
                                                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                                                    />
                                                    {/* <img
                                                    src={product.attributes.Imgs.data.attributes.formates.large.url}
                                                    alt={product.imageAlt}
                                                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                                                /> */}
                                                </div>
                                                <h3 className="mt-4 text-sm text-gray-700">{product.attributes.name}</h3>
                                                <p className="mt-1 text-lg font-medium text-gray-900">&#8377; {product.attributes.Price}</p>
                                            </span>

                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    // get the subcategory from the url
    const { category } = context.query

    console.log(category, 'id')

    const query = qs.stringify({
        filters: {
            category: {
                name: {
                    $eq: category
                }
            }
        }
    }, {
        encodeValuesOnly: true, // prettify URL
    })

    // console.log(query, 'query');
    const res = await fetch(`https://strapi-meshv.herokuapp.com/api/items?${query}&populate=*`)
    const products = (await res.json())

    // console.log('Item ====================>', products);
    // generate HTML
    // const renderedHTML = await markdownToHtml(item.data[0].attributes.desc);

    return {
        props: {
            products,
            // renderedHTML
        },
    }
}