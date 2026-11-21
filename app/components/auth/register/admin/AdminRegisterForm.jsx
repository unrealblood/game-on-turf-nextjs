"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [country, setCountry] = useState("India");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("");
    const [statusMode, setStatusMode] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    function handlePincodeValueChange(value) {
        if(isNaN(value)) {return;}

        setPincode(value);
    }

    function handlePhoneNumberValueChange(value) {
        if(isNaN(value) || value.length > 10) {return;}

        setPhoneNumber(value);
    }

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

        if(!adress || adress.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your address");
            return;
        }

        if(!city || city.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please select your city");
            return;
        }

        if(!state || state.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please select your state");
            return;
        }

        if(!pincode || pincode.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter your pincode");
            return;
        }

        if(!country || country.trim() !== "India") {
            setStatusMode("error");
            setStatus("GameOnTurf is only available in India currently");
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

        /*
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
        */
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6 mt-8 sm:px-8 px-2">
            <input type="text" placeholder="Enter your full name" className="border border-gray-200 p-2 rounded-md w-full" value={name} onChange={(e) => setName(e.target.value)} />

            <input type="email" placeholder="Enter your email address" className="border border-gray-200 p-2 rounded-md w-full" value={email} onChange={(e) => setEmail(e.target.value)} />

            <textarea placeholder="Enter your current address" className="w-full border border-gray-200 p-2 rounded-md" value={adress} onChange={(e) => setAddress(e.target.value)}></textarea>

            <div className="flex justify-start items-start gap-4 w-full">
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-gray-200 p-2 rounded-md">
                    <option value={""}>Select City</option>
                    <option value={"Delhi"}>Delhi</option>
                </select>

                <select value={state} onChange={(e) => setState(e.target.value)} className="w-full border border-gray-200 p-2 rounded-md">
                    <option value={""}>Select State</option>
                    <option value={"Delhi"}>Delhi</option>
                </select>
            </div>

            <div className="flex justify-start items-start gap-4 w-full">
                <input type="text" placeholder="Pincode" className="border border-gray-200 p-2 rounded-md w-full" value={pincode} onChange={(e) => handlePincodeValueChange(e.target.value)} />

                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-gray-200 p-2 rounded-md bg-gray-200 cursor-not-allowed" disabled>
                    <option value={""}>-- Select Country --</option>
                    <option value={"India"}>India</option>
                </select>
            </div>

            <input type="text" placeholder="Enter your phone number" className="border border-gray-200 p-2 rounded-md w-full" value={phoneNumber} onChange={(e) => handlePhoneNumberValueChange(e.target.value)} />

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

            <button type="submit" className={`cursor-pointer ${loading ? `bg-gray-200 text-black` : `bg-red-500 text-white`} w-full px-8 py-2 rounded-md`} disabled={loading}>{loading ? "Processing..." : "Register"}</button>

            <button type="button" className="w-full px-8 py-2 rounded-md border bg-blue-500 text-white flex justify-center items-center gap-2 cursor-pointer" disabled={loading}>
                <span className="bi-google" />
                <span>Login with Google</span>
            </button>

            <div className="flex justify-start items-start w-full gap-4">
                <button type="button" className={`cursor-pointer w-full py-2 rounded-md bg-orange-500 text-white`} onClick={() => router.push("/auth/register/turf-owner")}>Register as Turf Owner</button>

                <button type="button" className={`cursor-pointer w-full py-2 rounded-md bg-green-500 text-white`} onClick={() => router.push("/auth/register/user")}>Register as Player</button>
            </div>

            <div className="text-center w-full text-teal-500 sm:text-base text-sm">
                <Link href={"/auth/login/admin"}>Already have an account. Login here.</Link>
            </div>
        </form>
    );
}