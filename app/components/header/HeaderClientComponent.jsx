"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase/app";

export default function HeaderClientComponent() {
    const [isAuthUser, setIsAuthUser] = useState(false);

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setIsAuthUser(true);
        }
        else {
            setIsAuthUser(false);
        }
    });

    return (
        <header className="fixed w-full flex justify-between items-center p-4 bg-white/60 backdrop-blur-md border-b border-gray-200">
            <Link href={"/"}><h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-teal-900">GameOnTurf</h1></Link>

            <nav className="flex justify-center items-center gap-4 text-gray-500">
                <Link href={"/"}>Home</Link>
                <Link href={"/book-grounds"}>Book a Ground</Link>
                <Link href={"/list-ground"}>List Ground</Link>
            </nav>

            {isAuthUser
            ?
            <div className="flex justify-center items-center gap-4">
                <h2 className="text-gray-500">Demo User</h2>
                <LogoutButton />
            </div>
            :
            <Link href={"/auth/login"} className="px-4 py-2 bg-gray-800 text-white rounded-md">Login / Register</Link>
            }
        </header>
    );
}