import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { HttpErrorHandling } from "../services/httpErrorHandling";
import { useAlert, useAuth, useFetch } from "../store";




export default function Login() {

    let alert = useAlert()
    let login = useAuth()
    let router = useRouter()
    let urlFetch = useFetch()

    const [loginDetails, setLoginDetails] = useState({
        identifier: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        // console.log(loginDetails);
        e.preventDefault()

        // let res = await login.fetchReq('', loginDetails)
        // let data = await res?.json()
        // console.log(res);

        // mkae fetch request
        try {
            let res = await urlFetch.urlFetch('/auth/local', 'POST', loginDetails, false)
            console.log(res, 'in res 32');
            let data = await res?.json()
            console.log(data);

            HttpErrorHandling({
                response: res,
                onSucess: async () => {
                    let res = data
                    // console.log(response)
                    login.login(res)
                    alert.open('Logged in successfully', 'Logged in successful.', 'success')
                    console.log('opeinf alert')

                    // check if the user is redirected from a page
                    if (router.query.callback) {
                        console.log('checkout');
                        router.push(router.query.callback)
                    } else {
                        console.log('Home')
                        Router.push('/')
                    }
                },
                onError: () => alert.open(data?.error?.message || 'No internet', 'wrong credential. ', 'error')

            })
        } catch (error) {
            alert.open('Some error occured', 'Network error', 'error')

        }





    }

    useEffect(() => {
        // console.log(login.user, 'lo', router);
        // console.log(process.env.NODE_ENV);
        if (login.user) {
            Router.push('/')
        }
    }, [login])


    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html className="h-full bg-gray-50">
          <body className="h-full">
          ```
        */}

            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/signup" type="button">
                            <span className="font-medium text-indigo-600 hover:text-indigo-500" role='button'>
                                Need an account?
                            </span>
                        </Link>
                    </p>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={e => handleSubmit(e)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Usename
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="usename"
                                        name="username"
                                        type="text"
                                        onChange={e => setLoginDetails({ ...loginDetails, identifier: e.target.value })}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={e => setLoginDetails({ ...loginDetails, password: e.target.value })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    <Link href="/forget-password" className="">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    // onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <Link
                                        href="https://strapi-meshv.herokuapp.com/api/connect/google"
                                        target='_blank'
                                    >
                                        <span

                                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <span className="sr-only">Sign in with Google</span>
                                            <Image src='/google.svg' className="w-5 h-5" width={20} height={20} />
                                        </span>

                                    </Link>
                                </div>
                                <div>
                                    <a
                                        href="#"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Sign in with Facebook</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </div>

                                <div>
                                    <a
                                        href="#"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Sign in with Twitter</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}