import Link from "next/link";
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { HttpErrorHandling } from "../services/httpErrorHandling";
import { useAlert, useAuth, useFetch } from "../store";




export default function ResetPassword() {

    let alert = useAlert()
    let router = useRouter()
    let urlFetch = useFetch()

    const [details, setDetails] = useState({
        password: "",
        passwordConfirmation: "",
        code: "",
    })


    const handleSubmit = async (e) => {
        // console.log(loginDetails);
        e.preventDefault()

        // let res = await login.fetchReq('', loginDetails)
        // let data = await res?.json()
        // console.log(res);


        try {
            // mkae fetch request
            let res = await urlFetch.urlFetch('/auth/reset-password', 'POST', details, false)
            console.log(res, 'in res 32');
            let data = await res?.json()
            console.log(data);




            HttpErrorHandling({
                response: res,
                onSucess: async () => {
                    let res = data
                    // console.log(response)
                    // login.login(res)
                    alert.open('Password has been successfully changed', 'You can now login with your new password', 'success')
                    // console.log('opeinf alert')

                    // check if the user is redirected from a page
                    // if (router.query.callback) {
                    //     router.push(router.query.callback)
                    // } else {

                    //     Router.push('/')
                    // }
                },
                onError: () => alert.open(data?.error?.message || 'No internet', 'Looks like network problem', 'error')

            })
        } catch (error) {
            alert.open('No internet', 'Network error', 'error')

        }

    }

    useEffect(() => {
        //set the code
        setDetails({ ...details, code: router.query.code })

    }, [router.query.code])



    return (
        <>


            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Set a new Password</h2>

                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={e => handleSubmit(e)}>
                            <div>
                                <label htmlFor="pasword" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="pasword"
                                        name="pasword"
                                        type="password"
                                        required
                                        onChange={(e) => setDetails(details => ({ ...details, password: e.target.value }))} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        type="password"
                                        required
                                        onChange={(e) => setDetails(details => ({ ...details, passwordConfirmation: e.target.value }))} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">


                                <div className="text-sm text-indigo-600 hover:text-indigo-500">
                                    <Link href="/login" className="font-medium ">
                                        Have password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    // onClick={handleSubmit}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Done
                                </button>
                            </div>
                        </form>

                        {/* <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>


                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}