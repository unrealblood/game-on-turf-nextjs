"use client";

import { useEffect, useState } from "react";
import GroundItem from "./GroundItem";
import { createClient } from "@/lib/supabase/client";

export default function GroundsGrid() {
    const [grounds, setGrounds] = useState([]);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);

    async function fetchGrounds() {
        setLoading(true);

        try {
            const supabase = createClient();
            const { data, error } = await supabase.from("grounds").select("*");

            if(error) {
                setStatus("Failed to fetch grounds. Error: " + error.message);
                return;
            }
            else {
                setGrounds(data);
            }
        }
        catch(error) {
            throw new Error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGrounds();
    }, []);

    if(loading) {
        return (
            <p className="px-8">Loading grounds...</p>
        );
    }

    return (
        <section className="px-8 flex justify-start items-start gap-8 flex-wrap">
            {(grounds.length > 0)
            ?
            grounds.map((ground, index) => (
                <GroundItem key={index} {...ground} />
            ))
            :
            <p>No grounds found.</p>
            }
        </section>
    );
}