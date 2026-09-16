"use client";

import { createClient } from "@/lib/supabase/client";
import HeroSection from "./HeroSection";
import RecentBookings from "./RecentBookings";
import { useEffect, useState } from "react";

export default function DashboardClientComponent() {
    const cards = [
        {
            icon: "bounding-box",
            title: "Total Grounds",
            bgColor: "bg-blue-200",
            textColor: "text-blue-500",
            value: 0
        },
        {
            icon: "calendar",
            title: "Total Bookings",
            bgColor: "bg-teal-200",
            textColor: "text-teal-500",
            value: 0
        }
    ];

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchBookings() {
        const supabase = createClient();

        const { data: userData, fetchUserError } = await supabase.auth.getUser();

        if(fetchUserError) {
            throw new Error("Failed to fetch user. Error: " + fetchUserError.message);
        }

        const { data: bookingsData, fetchBookingsError } = await supabase.from("bookings_summary").select("grounds(name), start_times, end_times, booking_date, team_name, total_amount").eq("user_id", userData?.user?.id);

        if(fetchBookingsError) {
            throw new Error("Failed to fetch bookings. Error: " + fetchBookingsError.message);
        }
        else {
            setBookings(bookingsData);
        }
    }

    useEffect(() => {
        try {
            setLoading(true);

            fetchBookings();
        }
        catch(error) {
            throw new Error("Failed to fetch bookings. Error: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="flex-1 overflow-y-auto mt-20 p-4">
            <header>
                <h1 className="text-2xl font-bold"><span className="bi-shield text-teal-500" /> User Dashboard</h1>
                <p className="text-gray-500 mt-2">Monitor bookings, and view analytics.</p>
            </header>

            <HeroSection cards={cards} bookings={bookings} />
            {loading ? <p className="mt-4">Loading...</p> : <RecentBookings bookings={bookings} />}
        </div>
    );
}