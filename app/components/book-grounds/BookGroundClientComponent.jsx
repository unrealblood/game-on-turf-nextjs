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
    const [selectedSport, setSelectedSport] = useState({});
    const [selectedSportName, setSelectedSportName] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [feePerHour, setFeePerHour] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [status, setStatus] = useState("");
    const [statusMode, setStatusMode] = useState("");
    const [loadGround, setLoadGround] = useState(true);
    const [loadSports, setLoadSports] = useState(true);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    async function fetchGround() {
        try {
            setLoadGround(true);

            const { data, error } = await supabase.from("grounds").select("*").eq("id", groundId).single();

            if(error) {
                throw new Error("Failed to fetch ground. Error: " + error.message);
            }
            else {
                setGround(data);
            }
        }
        catch(error) {
            throw new Error(error.message);
        }
        finally {
            setLoadGround(false);
        }
    }

    async function fetchSports() {
        try {
            setLoadSports(true);

            const {data, error} = await supabase.from("ground_supported_sports").select("*").eq("ground_id", groundId);

            if(error) {
                throw new Error("Failed to fetch ground supported sports. Error: " + error.message);
            }
            else {
                setSports(data);
            }
        }
        catch(error) {
            throw new Error(error.message);
        }
        finally {
            setLoadSports(false);
        }
    }

    useEffect(() => {
        fetchGround();
        fetchSports();
    }, []);

    function handleNumberOfPlayersChange(value) {
        const nextValue = value;
        setNumberOfPlayers(nextValue);

        if(selectedSportName === "" || selectedTimeSlots.length === 0 || nextValue === 0) {
            setTotalAmount(0);
            return;
        }
        else {
            const sportFee = selectedSport.fee_per_hour ?? 0;
            
            setTotalAmount((value * ground.fee_per_person) + (selectedTimeSlots.length * sportFee));
        }
    }

    function handleSelectTimeSlot(ts) {
        const nextTimeSlots = selectedTimeSlots.includes(ts) ? selectedTimeSlots.filter(t => t !== ts) : [...selectedTimeSlots, ts];

        setSelectedTimeSlots(nextTimeSlots);

        if(selectedSportName === "" || nextTimeSlots.length === 0) {
            setTotalAmount(0);
            return;
        }
        else {
            const sportFee = selectedSport.fee_per_hour ?? 0;
            
            setTotalAmount((numberOfPlayers * ground.fee_per_person) + (selectedTimeSlots.includes(ts) ? ((selectedTimeSlots.length - 1) * sportFee) : ((selectedTimeSlots.length + 1) * sportFee)));
        }
    }

    function handleSelectSport(sportId) {
        if(sportId === "") {
            setSelectedSport({});
            setSelectedSportName("");
            setFeePerHour(0);
            setTotalAmount(0);

            return;
        }

        const sport = sports.find(s => s.id === sportId);

        setSelectedSport(sport);
        setSelectedSportName(sport.sport_name);
        setFeePerHour(sport.fee_per_hour);

        if(numberOfPlayers === 0 || selectedTimeSlots.length === 0) {
            setTotalAmount(0);
            return;
        }
        
        setTotalAmount((numberOfPlayers * ground.fee_per_person) + (selectedTimeSlots.length * sport.fee_per_hour));
    }

    async function handleSubmit() {
        try {
            setLoading(true);

            setStatusMode("");
            setStatus("");

            if(!selectedSportName || selectedSportName.trim().length === 0) {
                setStatusMode("error");
                setStatus("Please select sport");
                return;
            }

            if(!selectedDate || selectedDate.trim().length === 0) {
                setStatusMode("error");
                setStatus("Please select booking date");
                return;
            }

            if(!teamName || teamName.trim().length === 0) {
                setStatusMode("error");
                setStatus("Please enter your team name");
                return;
            }

            if(numberOfPlayers === 0) {
                setStatusMode("error");
                setStatus("Please enter number of players");
                return;
            }

            if(selectedTimeSlots.length === 0) {
                setStatusMode("error");
                setStatus("Please select at least one time slot");
                return;
            }

            const { data: userData, error: userFetchError } = await supabase.auth.getUser();
            if(userFetchError) {
                setStatusMode("error");
                setStatus(userFetchError.message);
                return;
            }
            else {
                const promises = selectedTimeSlots.map(async (timeSlot) => {
                    const { error } = await supabase.from("bookings").insert([{ground_id: groundId, user_id: userData?.user?.id, team_name: teamName, booking_date: selectedDate, start_time: timeSlot.split(" - ")[0], end_time: timeSlot.split(" - ") [1], total_amount: totalAmount ?? 0}]);

                    if(error) {
                        throw new Error("Failed to create booking. Error: " + error.message);
                    }
                });

                await Promise.all(promises);

                setStatusMode("success");
                setStatus("Successfully booked");
            }
        }
        catch(error) {
            throw new Error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className="flex justify-start px-8 items-start gap-8 mt-8">
            {!loadGround
            ?
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
                                    
                                    <select id="sportInput" className="bg-gray-100 px-4 py-2 rounded-md" value={selectedSport.id} onChange={(e) => handleSelectSport(e.target.value)}>
                                        <option value={""}> None </option>
                                        {sports.map((sport, index) => (
                                            <option key={index} value={sport.id}>{sport.sport_name}</option>
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
            :
            <p>Loading...</p>
            }

            {!loadSports
            ?
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
                                    <p>₹{ground.fee_per_person}</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between items-start gap-4 w-full">
                                <div className="flex justify-between items-start w-full">
                                    <p>Selected Sport</p>
                                    <p>{selectedSportName === "" ? "-" : selectedSportName}</p>
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
                                    <p>₹{feePerHour}</p>
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
                                    <p className="text-teal-500 font-bold">₹{totalAmount.toString() === "NaN" ? 0 : totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-auto w-full">
                    {statusMode === "error"
                    &&
                    <div className="text-red-500 text-center mb-2">
                        <p>{status}</p>
                    </div>}

                    {statusMode === "success"
                    &&
                    <div className="text-green-500 text-center mb-2">
                        <p>{status}</p>
                    </div>}

                    <button type="button" disabled={loading} className={`cursor-pointer ${loading ? "bg-gray-200 text-black" : "bg-gray-900 text-white"} py-2 w-full rounded-md p-4`} onClick={handleSubmit}><span className="bi-check-circle mr-2" />{loading ? "Processing" : "Confirm Booking"}</button>
                </div>
            </div>
            :
            <p>Loading...</p>
            }
        </section>
    );
}