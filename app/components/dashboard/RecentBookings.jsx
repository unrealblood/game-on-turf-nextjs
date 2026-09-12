import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function RecentBookings() {
    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState("");

    async function fetchBookings() {
        const supabase = createClient();

        const { data: userData, fetchUserError } = await supabase.auth.getUser();

        if(fetchUserError) {
            throw new Error("Failed to fetch user. Error: " + fetchUserError.message);
        }
        else {
            setUserId(userData?.user?.id);
        }

        const { data: bookingsData, fetchBookingsError } = await supabase.from("bookings").select("*").eq("user_id", userData?.user?.id);

        if(fetchBookingsError) {
            throw new Error("Failed to fetch bookings. Error: " + fetchBookingsError.message);
        }
        else {
            setBookings(bookingsData);
        }
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <section className="bg-gray-50 p-4 mt-8 rounded-md">
            <header>
                <h2 className="text-xl">Recent Bookings</h2>
            </header>

            <table className="w-full mt-4">
                <thead className="bg-gray-100 w-full border-t border-b border-gray-200">
                    <tr>
                        <th className="text-gray-500 text-lg py-2 px-8">TEAM </th>
                        <th className="text-gray-500 text-lg py-2 px-12">GROUND</th>
                        <th className="text-gray-500 text-lg py-2 px-16">DATE & TIME</th>
                        <th className="text-gray-500 text-lg py-2 px-5">AMOUNT</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length > 0
                    ?
                    bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="text-gray-500 p-4">{booking.team_name}</td>
                            <td className="text-gray-500 p-4">{booking.ground_id}</td>
                            <td className="text-gray-500 p-4">{booking.start_time}-{booking.end_time}</td>
                            <td className="text-gray-500 p-4 text-center">{booking.total_amount}</td>
                        </tr>
                    ))
                    :
                    <tr>
                        <td className="p-4 text-center text-gray-500" colSpan={4}>No bookings found.</td>
                    </tr>
                    }
                </tbody>
            </table>
        </section>
    );
}