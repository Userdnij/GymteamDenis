"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

      const onLogin = async () => {
        setLoading(true);
        axios.post("/api/users/login", user)
            .then((response) => {
                console.log(response.data);
                router.push("/home");
                window.localStorage.setItem("user", JSON.stringify(response.data.user));
            }).catch((error) => {
                setError(error.response.data.error);
                console.log(error.response.data.error);
            }).finally(() => {
                setLoading(false);
            });
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5" style={ { color: 'red', fontWeight: '600' } }>
                {error}
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                <div>
                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900">E-pasta adrese</label>
                    <div className="mt-2">
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        autocomplete="email"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                    />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        autocomplete="current-password"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                    </div>
                </div>
                <div>
                    <button onClick={onLogin} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</Link>
                </p>
            </div>
        </div>
    )

    // return (
    // <div classNameName="flex flex-col items-center justify-center min-h-screen py-2">
    //     <h1>{loading ? "Processing" : "Login"}</h1>
    //     <hr />

    //     <label htmlFor="email">email</label>
    //     <input
    //         id="email"
    //         type="text"
    //         value={user.email}
    //         onChange={(e) => setUser({...user, email: e.target.value})}
    //         placeholder="email"
    //         />
    //     <label htmlFor="password">password</label>
    //     <input
    //         id="password"
    //         type="password"
    //         value={user.password}
    //         onChange={(e) => setUser({...user, password: e.target.value})}
    //         placeholder="password"
    //         />
    //         <button
    //             onClick={onLogin}
    //         >
    //             Log In
    //         </button>
    //         <Link href="/signup">Visit signup page</Link>
    //     </div>
    // )

}