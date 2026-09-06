export default function BookingDetailsPanel({name, location_address, fee_per_person, selectedDate, selectedSport, numberOfPlayers, feePerHour}) {
    return (
        <div className="bg-gray-50 w-72 flex-none flex flex-col justify-start items-start rounded-t-md">
            <header className="bg-radial from-teal-600 to-teal-900 h-[150px] flex justify-center items-center rounded-t-md w-full">
                <p className="text-white font-bold text-2xl">{name}</p>
            </header>

            <section className="flex flex-col justify-center items-start gap-4 rounded-b-md w-full flex-1">
                <div className="px-4 mt-4">
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-gray-500 text-sm"><span className="bi-geo-alt" /> {location_address}</p>
                </div>

                <div className="px-4 pb-4 w-full">
                    <div className="bg-gray-100 w-full p-4 rounded-md">
                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                            <div className="flex justify-between items-start w-full">
                                <p>Fee Per Person</p>
                                <p>{fee_per_person}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                            <div className="flex justify-between items-start w-full">
                                <p>Selected Sport</p>
                                <p>{selectedSport.sport_name}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                            <div className="flex justify-between items-start w-full">
                                <p>Players Count</p>
                                <p>{numberOfPlayers.toString() === "NaN" ? 0 : numberOfPlayers}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                            <div className="flex justify-between items-start w-full">
                                <p>Fee Per Hour</p>
                                <p>{feePerHour}</p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                            <div className="flex justify-between items-start w-full">
                                <p>Selected Hours</p>
                                <p>-</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-500 my-4" />

                        <div className="flex flex-col justify-between items-start gap-4 w-full">
                            <div className="flex justify-between items-start w-full">
                                <p className="font-bold">Total</p>
                                <p className="text-teal-500 font-bold">800</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-auto w-full">
                <button type="button" className="cursor-pointer bg-gray-900 text-white py-2 w-full rounded-md p-4"><span className="bi-check-circle mr-2" />Confirm Booking</button>
            </div>
        </div>
    );
}