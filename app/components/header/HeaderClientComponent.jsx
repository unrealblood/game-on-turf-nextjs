"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { createClient } from "@/lib/supabase/client";

export default function HeaderClientComponent() {
    const [user, setUser] = useState(null);
    const [showMobileHeader, setMobileHeader] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            listener.subscription.unsubscribe();
        }
    }, [supabase]);

    function toggleMobileHeader() {
        setMobileHeader(!showMobileHeader);
    }

    return (
        <header className="fixed w-full p-4 bg-white/60 backdrop-blur-md border-b border-gray-200 z-10">
            <div className="hidden sm:flex justify-between items-center">
                <Link href={"/"}><h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-teal-900">GameOnTurf</h1></Link>
                
                <nav className="hidden sm:flex justify-center items-center gap-4 text-gray-500">
                    <Link href={"/"}>Home</Link>
                    <Link href={"/book-grounds"}>Book a Ground</Link>
                    <Link href={"/list-ground"}>List Ground</Link>
                </nav>

                {(user !== null)
                ?
                <div className="flex justify-center items-center gap-4">
                    <Link href="/dashboard" className="text-gray-500">Dashboard</Link>
                    <LogoutButton setUser={setUser} />
                </div>
                :
                <Link href={"/auth/login"} className="block px-4 py-2 bg-gray-800 text-white rounded-md">Login / Register</Link>
                }
            </div>

            <div className="sm:hidden block">
                <div className="flex justify-between items-center">
                    <Link href={"/"}><h1 className="sm:text-2xl text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-teal-900">GameOnTurf</h1></Link>

                    <button type="button" className="cursor-pointer" onClick={toggleMobileHeader}><span className="text-xl bi-list" /></button>
                </div>

                {showMobileHeader
                &&
                <div className="border-t border-gray-200 mt-2">
                    <div className="flex flex-col justify-start items-start p-4 gap-2 text-gray-500">
                        <Link href={"/"}>Home</Link>

                        {(user !== null)
                        ?
                        <div className="flex flex-col justify-start items-start gap-2">
                            <Link href={"/book-grounds"}>Book a Ground</Link>
                            <Link href={"/list-ground"}>List Ground</Link>
                            <Link href="/dashboard" className="text-gray-500">Dashboard</Link>
                            <LogoutButton setUser={setUser} />
                        </div>
                        :
                        <Link href={"/auth/login"} className="px-4 py-2 bg-gray-800 text-white rounded-md">Login / Register</Link>
                        }
                    </div>
                </div>}
            </div>
        </header>
    );
}