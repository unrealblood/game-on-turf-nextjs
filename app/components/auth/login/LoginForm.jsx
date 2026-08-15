"use client";

import { app } from "@/lib/firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [statusMode, setStatusMode] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    
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
        signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            // Signed In
            const user = userCredential.user;            

            if(user) {
                //Await token generation
                const accessToken = await user.getIdToken();

                //Proceed with the fetch call using the awaited token
                const response = await fetch("/api/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({userId: user.uid})
                });

                const result = await response.json();
                
                if (result.error) {
                    setStatusMode("error");
                    setStatus(result.error);

                    return;
                }

                if(response.ok) {
                    setStatusMode("success");
                    setStatus("Login successfull.");

                    router.push("/");
                }
            }

            setLoading(false);
        })
        .catch((error) => {
            setStatusMode("error");
            setStatus(error.message);
            setLoading(false);
        });
    }

    async function handleLoginWithGoogle() {
        setStatusMode("");
        setStatus("");

        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            if(user) {
                setStatusMode("success");
                setStatus("Successfully logged in.");

                router.push("/");
            }
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

            <button type="button" className="w-full px-8 py-2 rounded-md border border-blue-500 flex justify-center items-center gap-2 cursor-pointer" onClick={handleLoginWithGoogle}>
                <span className="bi-google" />
                <span>Login with Google</span>
            </button>

            <div className="text-center w-full text-teal-500">
                <Link href={"/auth/register"}>Don't have an account. Register here.</Link>
            </div>
        </form>
    );
}