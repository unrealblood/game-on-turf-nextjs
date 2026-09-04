import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function GroundBookForm({groundId, name}) {
    const [sports, setSports] = useState([]);
    const [timeSlots, setTimeSlots] = useState(["06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

    const supabase = createClient();

    async function fetchSports() {
        const {data, error} = await supabase.from("ground_supported_sports").select("sport_name").eq("ground_id", groundId);

        if(error) {
            throw new Error("Failed to fetch ground supported sports. Error: " + error.message);
        }
        else {
            setSports(data);
        }
    }

    useEffect(() => {
        fetchSports();
    }, []);

    function handleSelectTimeSlot(ts) {
        setSelectedTimeSlots(prev => prev.includes(ts) ? prev.filter(t => t !== ts) : [...prev, ts]);
    }

    return (
        <div className="bg-gray-50 w-[750px] flex-none">
            <div className="p-4">
                <header>
                    <h1 className="text-2xl font-bold"><span className="bi-calendar mr-1" /> Book {name} Turf</h1>
                </header>

                <form className="mt-8">
                    <div className="flex flex-col justify-start items-start gap-4">
                        <div className="flex justify-center items-start gap-8 w-full">
                            <div className="flex justify-start items-center gap-4 w-full">
                                <label className="font-bold" htmlFor="sportInput">Select Sport</label>
                                
                                <select id="sportInput" className="bg-gray-100 px-4 py-2 rounded-md">
                                    <option value="">-- None ---</option>
                                    {sports.map((sport, index) => (
                                        <option key={index}>{sport.sport_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-start items-center gap-4 w-full">
                                <label className="font-bold" htmlFor="dateInput">Select Date</label>
                                
                                <input type="date" id="dateInput" className="bg-gray-100 px-4 py-2 rounded-md" />
                            </div>
                        </div>

                        <div className="flex justify-center items-start gap-8 w-full">
                            <div className="flex justify-start items-center gap-4 w-full">
                                <label className="font-bold" htmlFor="teamNameInput">Team Name</label>
                                
                                <input type="text" id="teamNameInput" className="bg-gray-100 px-4 py-2 rounded-md" placeholder="Enter Team Name" />
                            </div>

                            <div className="flex justify-start items-center gap-4 w-full">
                                <label className="font-bold" htmlFor="playersInput">Number of Players</label>
                                
                                <input type="number" id="playersInput" className="bg-gray-100 px-4 py-2 rounded-md" placeholder="0" />
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="w-full">
                            <p className="font-bold">Select Time Slots</p>

                            <div className="flex justify-start items-start gap-2 flex-wrap mt-2">
                                {timeSlots.map((timeSlot, index) => (
                                    <button key={index} type="button" className={`${selectedTimeSlots.includes(timeSlot) ? `bg-teal-500 text-white` : `bg-gray-100 text-black`} px-4 py-2 cursor-pointer rounded-md`} onClick={() => handleSelectTimeSlot(timeSlot)}>{timeSlot}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}