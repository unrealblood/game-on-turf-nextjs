"use client";

import { useEffect, useState } from "react";
import BookingDetailsPanel from "./BookingDetailsPanel";
import GroundBookForm from "./GroundBookForm";
import { createClient } from "@/lib/supabase/client";

export default function BookGroundClientComponent({groundId}) {
    const [ground, setGround] = useState({});

    async function fetchGround() {
        const supabase = createClient();
        const { data, error } = await supabase.from("grounds").select("*").eq("id", groundId).single();

        if(error) {
            throw new Error("Failed to fetch ground. Error: " + error.message);
        }
        else {
            setGround(data);
        }
    }

    useEffect(() => {
        fetchGround();
    }, []);

    return (
        <section className="flex justify-between px-8 items-start gap-4 mt-8">
            <GroundBookForm ground={ground} />
            <BookingDetailsPanel ground={ground} />
        </section>
    );
}