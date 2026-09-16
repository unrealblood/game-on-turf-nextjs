export default function RecentBookings({bookings}) {
    return (
        <section className="bg-gray-50 mt-8 rounded-md w-full">
            <header className="w-full">
                <h2 className="text-xl p-4">Recent Bookings</h2>
            </header>

            <table className="w-full overflow-x-auto">
                <thead className="bg-gray-100 w-full border-t border-b border-gray-200">
                    <tr>
                        <th className="text-gray-500 sm:text-lg text-sm py-2 pr-8 text-left pl-4">TEAM </th>
                        <th className="text-gray-500 sm:text-lg text-sm py-2 pr-12 text-left pl-4">GROUND</th>
                        <th className="text-gray-500 sm:text-lg text-sm py-2 pr-16 text-left pl-4">DATE & TIME</th>
                        <th className="text-gray-500 sm:text-lg text-sm py-2 pr-5 text-left pl-4">AMOUNT</th>
                    </tr>
                </thead>

                <tbody className="w-full overflow-x-auto">
                    {bookings.length > 0
                    ?
                    bookings.map((booking, index) => (
                        <tr key={index} className="w-full">
                            <td className="text-gray-500 p-4">{booking.team_name}</td>
                            <td className="text-gray-500 p-4">{booking.grounds.name}</td>
                            <td className="text-gray-500 p-4">
                                <p>{booking.booking_date}</p>
                                <span>
                                    {booking.start_times.map((st, index) => (<span key={index}>{st}, </span>))}
                                    {booking.end_times.map((et, index) => (<span key={index}>{et}, </span>))}
                                </span>
                            </td>
                            <td className="text-gray-500 p-4">₹{booking.total_amount}</td>
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