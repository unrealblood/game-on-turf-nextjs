import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function LogoutButton({setUser}) {
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();

            if(error) {
                console.log(error);
                return;
            }
            
            setUser(null);
            document.location.href = "/auth/login";
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