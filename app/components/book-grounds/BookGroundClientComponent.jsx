"use client";

import { useEffect, useState } from "react";
import BookingDetailsPanel from "./BookingDetailsPanel";
import GroundBookForm from "./GroundBookForm";
import { createClient } from "@/lib/supabase/client";

export default function BookGroundClientComponent({groundId}) {
    const [ground, setGround] = useState({});
    const [sports, setSports] = useState([]);
    const [timeSlots, setTimeSlots] = useState(["06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"]);
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [teamName, setTeamName] = useState("");
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

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
        <section className="flex justify-start px-8 items-start gap-8 mt-8">
            <GroundBookForm {...ground} groundId={groundId} sports={sports} setSports={setSports} timeSlots={timeSlots} selectedTimeSlots={selectedTimeSlots} setSelectedTimeSlots={setSelectedTimeSlots} teamName={teamName} setTeamName={setTeamName} numberOfPlayers={numberOfPlayers} setNumberOfPlayers={setNumberOfPlayers} selectedSport={selectedSport} setSelectedSport={setSelectedSport} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            <BookingDetailsPanel {...ground} groundId={groundId} selectedTimeSlots={selectedTimeSlots} numberOfPlayers={numberOfPlayers} selectedSport={selectedSport} />
        </section>
    );
}