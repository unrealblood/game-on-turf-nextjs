"use client";

import { useState } from "react";

export default function ListGroundForm() {
    const [supportedSports] = useState(["Football", "Cricket", "Volleyball", "Basketball", "Swimming", "Tennis", "Badminton"]);
    const [selectedSports, setSelectedSports] = useState([]);

    function handleSportClick(sport) {
        setSelectedSports(prev => prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <section className="my-6 mx-6">
            <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start gap-6">
                <div className="w-full">
                    <label htmlFor="groundNameInput">Ground / Turf Name</label>
                    
                    <input id="groundNameInput" type="text" placeholder="Enter Ground/Turf name" className="w-full border border-gray-200 p-2 rounded-md" />
                </div>

                <div className="w-full">
                    <label htmlFor="locationInput">Location / Address</label>
                    
                    <input id="locationInput" type="text" placeholder="Full address of facility" className="w-full border border-gray-200 p-2 rounded-md" />
                </div>

                <div className="w-full flex justify-start items-center gap-6">
                    <div>
                        <label htmlFor="lengthInput">Length (meters)</label>
                    
                        <input id="lengthInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" />
                    </div>

                    <div>
                        <label htmlFor="widthInput">Width (meters)</label>
                    
                        <input id="widthInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" />
                    </div>
                </div>

                <div className="w-full flex justify-start items-center gap-6">
                    <div>
                        <label htmlFor="feePerPersonInput">Fee per person</label>
                
                        <input id="feePerPersonInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" />
                    </div>

                    <div>
                        <label htmlFor="feePerHourInput">Fee per Hour</label>
                
                        <input id="feePerHourInput" type="number" placeholder="0" className="w-full border border-gray-200 p-2 rounded-md" />
                    </div>
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
                    <label htmlFor="imageInput">Image (Optional)</label>
                    
                    <input id="imageInput" type="text" placeholder="Enter url of your turf image" className="w-full border border-gray-200 p-2 rounded-md" />
                </div>

                <div className="w-full flex justify-center items-center">
                    <button type="submit" className="bg-gray-900 text-white rounded-md cursor-pointer px-8 py-2">Submit Registration</button>
                </div>
            </form>
        </section>
    )
}