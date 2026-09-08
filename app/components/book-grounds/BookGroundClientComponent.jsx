"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function BookGroundClientComponent({groundId}) {
    const [ground, setGround] = useState({});
    const [sports, setSports] = useState([]);
    const [timeSlots] = useState(["06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [feePerHour, setFeePerHour] = useState(100);
    const [totalAmount, setTotalAmount] = useState(0);

    const supabase = createClient();

    async function fetchGround() {
        const { data, error } = await supabase.from("grounds").select("*").eq("id", groundId).single();

        if(error) {
            throw new Error("Failed to fetch ground. Error: " + error.message);
        }
        else {
            setGround(data);
            setTotalAmount(data.fee_per_person);
        }
    }

    async function fetchSports() {
        const {data, error} = await supabase.from("ground_supported_sports").select("*").eq("ground_id", groundId);

        if(error) {
            throw new Error("Failed to fetch ground supported sports. Error: " + error.message);
        }
        else {
            setSports(data);
        }
    }

    useEffect(() => {
        fetchGround();
        fetchSports();
    }, []);

    function handleNumberOfPlayersChange(value) {
        setNumberOfPlayers(value);
        setTotalAmount((value * ground.fee_per_person) + (selectedTimeSlots.length * feePerHour));
    }

    function handleSelectTimeSlot(ts) {
        setSelectedTimeSlots(prev => prev.includes(ts) ? prev.filter(t => t !== ts) : [...prev, ts]);
        
        setTotalAmount((numberOfPlayers * ground.fee_per_person) + (selectedTimeSlots.includes(ts) ? ((selectedTimeSlots.length - 1) * feePerHour) : ((selectedTimeSlots.length + 1) * feePerHour)));
    }

    function handleSelectSport(sport) {
        setSelectedSport(sport)
        setFeePerHour(sports.filter(s => s.sport_name === sport)[0].fee_per_hour);
    }

    return (
        <section className="flex justify-start px-8 items-start gap-8 mt-8">
            <div className="bg-gray-50 w-[750px] flex-none">
                <div className="p-4">
                    <header>
                        <h1 className="text-2xl font-bold"><span className="bi-calendar mr-1" /> Book {ground.name} Turf</h1>
                    </header>

                    <form className="mt-8">
                        <div className="flex flex-col justify-start items-start gap-4">
                            <div className="flex justify-center items-start gap-8 w-full">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <label className="font-bold" htmlFor="sportInput">Select Sport</label>
                                    
                                    <select id="sportInput" className="bg-gray-100 px-4 py-2 rounded-md" value={selectedSport} onChange={(e) => handleSelectSport(e.target.value)}>
                                        <option value="-"> None </option>
                                        {sports.map((sport, index) => (
                                            <option key={index} value={sport.sport_name}>{sport.sport_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-start items-center gap-4 w-full">
                                    <label className="font-bold" htmlFor="dateInput">Select Date</label>
                                    
                                    <input type="date" id="dateInput" className="bg-gray-100 px-4 py-2 rounded-md" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                </div>
                            </div>

                            <div className="flex justify-center items-start gap-8 w-full">
                                <div className="flex justify-start items-center gap-4 w-full">
                                    <label className="font-bold" htmlFor="teamNameInput">Team Name</label>
                                    
                                    <input type="text" id="teamNameInput" className="bg-gray-100 px-4 py-2 rounded-md" placeholder="Enter Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                                </div>

                                <div className="flex justify-start items-center gap-4 w-full">
                                    <label className="font-bold" htmlFor="playersInput">Number of Players</label>
                                    
                                    <input type="number" id="playersInput" className="bg-gray-100 px-4 py-2 rounded-md" placeholder="0" value={numberOfPlayers || 0} onChange={(e) => handleNumberOfPlayersChange(e.target.valueAsNumber)} />
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

            <div className="bg-gray-50 w-72 flex-none flex flex-col justify-start items-start rounded-t-md">
                <header className="bg-radial from-teal-600 to-teal-900 h-[150px] flex justify-center items-center rounded-t-md w-full">
                    <p className="text-white font-bold text-2xl">{ground.name}</p>
                </header>

                <section className="flex flex-col justify-center items-start gap-4 rounded-b-md w-full flex-1">
                    <div className="px-4 mt-4">
                        <h2 className="text-2xl font-bold">{ground.name}</h2>
                        <p className="text-gray-500 text-sm"><span className="bi-geo-alt" /> {ground.location_address}</p>
                    </div>

                    <div className="px-4 pb-4 w-full">
                        <div className="bg-gray-100 w-full p-4 rounded-md">
                            <div className="flex flex-col justify-between items-start gap-4 w-full">
                                <div className="flex justify-between items-start w-full">
                                    <p>Fee Per Person</p>
                                    <p>{ground.fee_per_person}</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between items-start gap-4 w-full">
                                <div className="flex justify-between items-start w-full">
                                    <p>Selected Sport</p>
                                    <p>{selectedSport}</p>
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
                                    <p>{selectedTimeSlots.length}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-500 my-4" />

                            <div className="flex flex-col justify-between items-start gap-4 w-full">
                                <div className="flex justify-between items-start w-full">
                                    <p className="font-bold">Total</p>
                                    <p className="text-teal-500 font-bold">{totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-auto w-full">
                    <button type="button" className="cursor-pointer bg-gray-900 text-white py-2 w-full rounded-md p-4"><span className="bi-check-circle mr-2" />Confirm Booking</button>
                </div>
            </div>
        </section>
    );
}