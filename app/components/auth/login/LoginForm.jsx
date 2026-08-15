"use client";

import { app } from "@/lib/firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [statusMode, setStatusMode] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handleSubmit(e) {
        e.preventDefault();

        setStatusMode("");
        setStatus("");

        if(!email || email.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your email address");
            return;
        }

        if(!password || password.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your password");
            return;
        }

        setLoading(true);
        
        const auth = getAuth(app);
        (auth, email, password)
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed In
            const user = userCredential.user;
            if(user) {
                setStatusMode("success");
                setStatus("Successfully logged in.");
            }

            setLoading(false);
        })
        .catch((error) => {
            setStatusMode("error");
            setStatus(error.message);
            setLoading(false);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6 mt-8 px-8">
            <input type="email" placeholder="Enter your email address" className="border border-gray-200 p-2 rounded-md w-full" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="Enter your password" className="border border-gray-200 p-2 rounded-md w-full" value={password} onChange={(e) => setPassword(e.target.value)} />

            {(statusMode === "error")
            &&
            <div className="text-red-500 w-full text-center">
                {status}
            </div>
            }

            {(statusMode === "success")
            &&
            <div className="text-green-500 w-full text-center">
                {status}
            </div>
            }

            <button type="submit" className={`cursor-pointer ${loading ? `bg-gray-200 text-black` : `bg-green-500 text-white`} w-full px-8 py-2 rounded-md`}>{loading ? "Processing..." : "Login"}</button>

            <div className="text-center w-full text-teal-500">
                <Link href={"/auth/register"}>Don't have an account. Register here.</Link>
            </div>
        </form>
    );
}