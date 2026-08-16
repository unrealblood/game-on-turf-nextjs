import { app } from "@/lib/firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    
    async function handleLogout() {
        try {
            setLoading(true);
            
            const auth = getAuth(app);
            const user = auth.currentUser;
            const accessToken = await user.getIdToken();

            const response = await fetch("/api/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if(response.ok) {
                await signOut(auth);

                setLoading(false);

                router.push("/auth/login");
            }
            else {
                const result = await response.json();
            
                setLoading(false);

                throw new Error("Failed to logout the user. Error: " + result.error);
            }

            setLoading(false);
        }
        catch(error) {
            throw new Error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <button type="button" className={`${loading ? `bg-gray-200 text-black`: `bg-red-500 text-white`} px-4 py-2 rounded-md cursor-pointer`} onClick={handleLogout}>{loading ? "Logout..." : "Logout"}</button>
    );
}