import { app } from "@/lib/firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    
    async function handleLogout() {
        setLoading(true);
        
        const auth = getAuth(app);
        await signOut(auth);

        setLoading(false);

        router.push("/auth/login");
    }

    return (
        <button type="button" className={`${loading ? `bg-gray-200 text-black`: `bg-red-500 text-white`} px-4 py-2 rounded-md cursor-pointer`} onClick={handleLogout}>{loading ? "Logout..." : "Logout"}</button>
    );
}