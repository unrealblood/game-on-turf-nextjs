"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function ListGroundForm() {
    const [supportedSports] = useState(["Football", "Cricket", "Volleyball", "Basketball", "Swimming", "Tennis", "Badminton"]);
    const [selectedSports, setSelectedSports] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [feePerPerson, setFeePerPerson] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [status, setStatus] = useState("");
    const [statusMode, setStatusMode] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSportClick(sport) {
        setSelectedSports(prev => prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setStatusMode("");
        setStatus("");

        if(!name || name.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter ground name");
            return;
        }

        if(!location || location.trim().length === 0) {
            setStatusMode("error");
            setStatus("Please enter ground full address");
            return;
        }

        if(!length || length <= 0) {
            setStatusMode("error");
            setStatus("Please enter correct length in meters");
            return;
        }

        if(!width || width <= 0) {
            setStatusMode("error");
            setStatus("Please enter correct width in meters");
            return;
        }

        if(!feePerPerson || feePerPerson <= 0) {
            setStatusMode("error");
            setStatus("Please enter correct fee per person in rupees");
            return;
        }

        if(selectedSports.length <= 0) {
            setStatusMode("error");
            setStatus("Please select at least one supported sports");
            return;
        }

        try {
            setLoading(true);

            const supabase = createClient();
            const { data: insertedGroundData, error: groundInsertError } = await supabase.from("grounds").insert([{
                name, location_address: location, city: "Delhi", country: "India", length_meters: length, width_meters: width, fee_per_person: feePerPerson, image_url: imageUrl
            }]).select("id").single();

            if(groundInsertError) {
                setStatusMode("error");
                setStatus(groundInsertError.message);
                return;
            }
            else {
                const promises = selectedSports.map(async (sport) => {
                    const { error: sportsInsertError } = await supabase.from("ground_supported_sports").insert([{ground_id: insertedGroundData.id, sport_name: sport}]);

                    if(sportsInsertError) {
                        setStatusMode("error");
                        setStatus(sportsInsertError.message);
                        return;
                    }
                    else {
                        setStatusMode("success");
                        setStatus("Ground registered successfully");
                    }
                });
                await Promise.all(promises);

                setStatusMode("success");
                setStatus("Ground registered successfully");
            }
        }
        catch(error) {
            setStatusMode("error");
            setStatus(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className="my-6 mx-6">
            <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6">
                <div className="w-full">
                    <label htmlFor="groundNameInput">Ground / Turf Name</label>
                    
                    <input id="groundNameInput" type="text" placeholder="Enter Ground/Turf name" className="w-full border border-gray-200 p-2 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="w-full">
                    <label htmlFor="locationInput">Location / Address</label>
                    
                    <input id="locationInput" type="text" placeholder="Full address of facility" className="w-full border border-gray-200 p-2 rounded-md" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>

                <div className="w-full flex justify-start items-center gap-6">
                    <div className="w-full">
                        <label htmlFor="lengthInput">Length (meters)</label>
                    
                        <input id="lengthInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" value={length || 0} onChange={(e) => setLength(e.target.valueAsNumber)} />
                    </div>

                    <div className="w-full">
                        <label htmlFor="widthInput">Width (meters)</label>
                    
                        <input id="widthInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" value={width || 0} onChange={(e) => setWidth(e.target.valueAsNumber)} />
                    </div>
                </div>

                <div className="w-full">
                    <label htmlFor="feePerPersonInput">₹ Fee per person</label>
                
                    <input id="feePerPersonInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" value={feePerPerson || 0} onChange={(e) => setFeePerPerson(e.target.valueAsNumber)} />
                </div>

                <div className="w-full">
                    <p>Supported Sports</p>
                    
                    <div className="flex justify-start items-center gap-4 flex-wrap mt-4">
                        {supportedSports.map((sport, index) => (
                            <button key={index} type="button" className={`w-32 px-4 py-2 bg-gray-100 border border-gray-200 rounded-md text-center cursor-pointer ${selectedSports.includes(sport) ? `bg-teal-500 text-white` : `bg-gray-100 text-black`}`} onClick={() => handleSportClick(sport)}>
                                {sport}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                    <label htmlFor="imageInput">Image URL (Optional)</label>
                    
                    <input id="imageInput" type="text" placeholder="Enter url of your turf image" className="w-full border border-gray-200 p-2 rounded-md" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>

                {(statusMode === "error")
                &&
                <div className="text-red-500 w-full text-center">
                    {status}
                </div>
                }

                {(statusMode === "success")
                &&
                <div className="text-green-500 w-full text-center">
                    {status}
                </div>
                }

                <div className="w-full flex justify-center items-center">
                    <button type="submit" disabled={loading} className={`${loading ? `bg-gray-200 text-black`: `bg-gray-900 text-white`} rounded-md cursor-pointer px-8 py-2`}>{loading ? "Processing..." : "Submit Registration"}</button>
                </div>
            </form>
        </section>
    )
}