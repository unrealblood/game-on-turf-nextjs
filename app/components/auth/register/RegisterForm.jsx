"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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

        if(!name || name.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your full name");
            return;
        }

        if(!email || email.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your email address");
            return;
        }

        if(!phoneNumber || phoneNumber.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your phone number");
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

        try {
            setLoading(true);
            
            const supabase = createClient();
            const { error: signupError } = await supabase.auth.signUp({email, password});

            if(signupError) {
                setStatusMode("error");
                setStatus(signupError.message);
                return;
            }
            else {
                const { error: insertError } = await supabase.from("users").insert([{email, phone_number: phoneNumber, name}]);

                if(insertError) {
                    setStatusMode("error");
                    setStatus(insertError.message);
                    return;
                }
                else {
                    setStatusMode("success");
                    setStatus("Registration successfull. You may now login.");
                }
            }
        }
        catch(error) {
            setStatusMode("error");
            setStatus(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6 mt-8 px-8">
            <input type="text" placeholder="Enter your full name" className="border border-gray-200 p-2 rounded-md w-full" value={name} onChange={(e) => setName(e.target.value)} />

            <input type="email" placeholder="Enter your email address" className="border border-gray-200 p-2 rounded-md w-full" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="text" placeholder="Enter your phone number" className="border border-gray-200 p-2 rounded-md w-full" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

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

            <button type="submit" className={`cursor-pointer ${loading ? `bg-gray-200 text-black` : `bg-green-500 text-white`} w-full px-8 py-2 rounded-md`} disabled={loading}>{loading ? "Processing..." : "Register"}</button>

            <div className="text-center w-full text-teal-500">
                <Link href={"/auth/login"}>Already have an account. Login here.</Link>
            </div>
        </form>
    );
}