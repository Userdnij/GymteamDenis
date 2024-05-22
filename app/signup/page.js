"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { isEmailInvalid, isPasswordInvalid } from '@/util/validate';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        vards: "",
        uzvards: "",
        talrunis: "",
        password: "",
    });
    const [error, setError] = useState("")


    const onSignup = async () => {
        const requiredFields = Object.keys(user);
        for (const field of requiredFields) {
            if (!user[field]) {
                if (field === 'email') {
                    setError("Epasts ir obligāts");
                    return;
                }

                setError(`${field.charAt(0).toUpperCase() + field.slice(1)} ir obligāts`);
                return;
            }
        }

        if (isEmailInvalid(user.email)) {
            setError(isEmailInvalid(user.email));
            return;
        }

        if (isPasswordInvalid(user.password)) {
            setError(isPasswordInvalid(user.password));
            return;
        }

        try {
            const response = await axios.post("/api/users/signup", user);
            router.push("/login");

        } catch (error) {
            setError("Lietotajs ar tadu epastu jau eksiste");
            console.log("Signup failed", error.message);
        }
    }

    return (
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5" style={ { color: 'red', fontWeight: '600' } }>
                {error}
            </div>

            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <div class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-pasta adrese</label>
                    <div class="mt-2">
                    <input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        autocomplete="email"
                        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                    </div>
                </div>

                <div>
                    <label for="Vards" class="block text-sm font-medium leading-6 text-gray-900">Vards</label>
                    <div class="mt-2">
                    <input
                        id="vards"
                        type="text"
                        value={user.vards}
                        onChange={(e) => setUser({...user, vards: e.target.value})}
                        autocomplete="text"
                        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                    </div>
                </div>

                <div>
                    <label for="Uzvards" class="block text-sm font-medium leading-6 text-gray-900">Uzvards</label>
                    <div class="mt-2">
                    <input
                        id="uzvards"
                        type="text"
                        value={user.uzvards}
                        onChange={(e) => setUser({...user, uzvards: e.target.value})}
                        autocomplete="text"
                        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                    </div>
                </div>

                <div>
                    <label for="Tālrunis" class="block text-sm font-medium leading-6 text-gray-900">Tālrunis</label>
                    <div class="mt-2">
                    <input
                        id="talrunis"
                        type="text"
                        value={user.talrunis}
                        onChange={(e) => setUser({...user, talrunis: e.target.value})}
                        autocomplete="text"
                        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                    <input
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        autocomplete="current-password"
                        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                        />
                    </div>
                </div>

                <div>
                    <button onClick={onSignup} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </div>

                <p class="mt-10 text-center text-sm text-gray-500">
                Already a member?
                <Link href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</Link>
                </p>
            </div>
        </div>
    )
}