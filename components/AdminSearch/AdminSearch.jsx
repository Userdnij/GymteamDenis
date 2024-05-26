"use client";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import './AdminSearch.scss';

export default function AdminSearch({ search, setSearch }) {
    return (
        <div className="AdminSearch" style={{backgroundColor: "white"}}>
            <div className="flex lg:ml-3">
                <a href="#" className="p-2 text-stone-500 hover:text-stone-800">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-8 w-8" aria-hidden="true" />
                </a>
                <input style={{background: "transparent"}} type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </div>
    );
}