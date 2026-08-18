"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

        if(!confirmPassword || confirmPassword.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please confirm your password");
            return;
        }

        if(password !== confirmPassword) {
            setStatusMode("error");
            setStatus("Passwords do not match");
            return;
        }

        setLoading(true);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6 mt-8 px-8">
            <input type="email" placeholder="Enter your email address" className="border border-gray-200 p-2 rounded-md w-full" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="Enter your password" className="border border-gray-200 p-2 rounded-md w-full" value={password} onChange={(e) => setPassword(e.target.value)} />

            <input type="password" placeholder="Confirm password" className="border border-gray-200 p-2 rounded-md w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

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

            <button type="submit" className={`cursor-pointer ${loading ? `bg-gray-200 text-black` : `bg-green-500 text-white`} w-full px-8 py-2 rounded-md`}>{loading ? "Processing..." : "Register"}</button>

            <div className="text-center w-full text-teal-500">
                <Link href={"/auth/login"}>Already have an account. Login here.</Link>
            </div>
        </form>
    );
}