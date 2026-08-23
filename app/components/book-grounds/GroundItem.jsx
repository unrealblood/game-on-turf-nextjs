import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import GroundBookForm from "./GroundBookForm";

export default function GroundItem({id, name, fee_per_person, location_address, rating, length_meters, width_meters}) {
    const [supportedSports, setSupportedSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookForm, setBookForm] = useState(false);

    async function fetchSupportedSports() {
        setLoading(true);

        try {
            const supabase = createClient();
            const {data, error} = await supabase.from("ground_supported_sports").select("sport_name").eq("ground_id", id);

            if(error) {
                throw new Error("Failed to fetch ground supported sports with ground_id: " + id + ". Error: " + error.message);
            }
            else {
                setSupportedSports(data);
            }
        }
        catch(error) {
            throw new Error("Failed to fetch ground supported sports with ground_id: " + id + ". Error: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSupportedSports();
    }, []);

    function toggleBookForm() {
        setBookForm(!bookForm);
    }

    return (
        <article className="w-72 h-[470px] bg-gray-100 rounded-md flex flex-col">
            <header className="bg-radial from-teal-600 to-teal-900 h-[150px] flex justify-center items-center relative rounded-t-md text-sm">
                <div className="absolute right-3 top-3 text-teal-500 bg-white/80 px-2 py-1 rounded-md">
                    <span className="bi-graph-up" />
                    <span className="ml-1">₹{fee_per_person}
                        <span className="text-gray-500"> / person</span>
                    </span>
                </div>

                <h1 className="text-white text-2xl font-bold">{name}</h1>
            </header>

            <div className="flex-1 flex flex-col">
                <section className="flex justify-between items-start p-2">
                    <div>
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-gray-500 mt-2">{location_address}</p>
                    </div>

                    <div>
                        <p className="text-yellow-500"><span className="bi-star mr-1" />{rating}</p>
                    </div>
                </section>

                <section className="mt-4 px-2 flex justify-start items-center gap-4 flex-wrap text-sm">
                    {loading ? <p className="p-2">Loading...</p> : supportedSports.map((sport, index) => (
                        <div key={index} className="bg-white px-2 py-1 text-teal-500 rounded-md">
                            {sport.sport_name}
                        </div>
                    ))}
                </section>

                <section className="mt-4 px-2">
                    <span className="bi-check-circle mr-1 text-teal-500" /><span className="text-gray-500">{length_meters}m x {width_meters}m</span>
                </section>

                <div className="mt-auto mb-2 mr-4">
                    <button type="button" className="bg-gray-900 text-white cursor-pointer rounded-md w-full py-2 mx-2" onClick={toggleBookForm}>Book Now</button>
                </div>
            </div>

            {bookForm
            &&
            <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-10" onClick={toggleBookForm}>
                <div className="relative bg-white text-black w-[450px] h-auto rounded-md" onClick={(e) => e.stopPropagation()}>
                    <section>
                        <header className="p-4 relative">
                            <h2 className="text-xl font-bold text-center">Ground Book Form</h2>

                            <button type="button" className="absolute top-3 right-5 bi-x-circle text-red-500 text-2xl cursor-pointer" onClick={toggleBookForm} />
                        </header>

                        <GroundBookForm groundName={name} fee_per_person={fee_per_person} setBookForm={setBookForm} />
                    </section>
                </div>
            </div>
            }
        </article>
    );
}