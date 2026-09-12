import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function RecentBookings() {
    const [bookings, setBookings] = useState([]);

    async function fetchBookings() {
        const supabase = createClient();

        const { data: userData, fetchUserError } = await supabase.auth.getUser();

        if(fetchUserError) {
            throw new Error("Failed to fetch user. Error: " + fetchUserError.message);
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
                        <th className="text-gray-500 text-lg py-2 pr-8 text-left pl-4">TEAM </th>
                        <th className="text-gray-500 text-lg py-2 pr-12 text-left pl-4">GROUND</th>
                        <th className="text-gray-500 text-lg py-2 pr-16 text-left pl-4">DATE & TIME</th>
                        <th className="text-gray-500 text-lg py-2 pr-5 text-left pl-4">AMOUNT</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.length > 0
                    ?
                    bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td className="text-gray-500 p-4">{booking.team_name}</td>
                            <td className="text-gray-500 p-4">{booking.ground_id}</td>
                            <td className="text-gray-500 p-4">
                                <p>{booking.booking_date}</p>
                                <p>{booking.start_time}-{booking.end_time}</p>
                            </td>
                            <td className="text-gray-500 p-4">{booking.total_amount}</td>
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