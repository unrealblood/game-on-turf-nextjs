"use client";

import Link from "next/link";

export default function RegisterForm() {
    async function handleSubmit(e) {
        e.preventDefault();

        console.log("Register team successfull.");
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6 mt-8 px-8">
            <input type="email" placeholder="Enter your email address" className="border border-gray-200 p-2 rounded-md w-full" />

            <input type="password" placeholder="Enter your password" className="border border-gray-200 p-2 rounded-md w-full" />

            <button type="submit" className="cursor-pointer bg-green-500 text-white w-full px-8 py-2 rounded-md">Register Team</button>

            <div className="text-center w-full text-teal-500">
                <Link href={"/auth/login"}>Already have an account. Login here.</Link>
            </div>
        </form>
    );
}