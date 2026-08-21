export default function GroundItem({name, fee_per_person, location_address}) {
    return (
        <article className="w-72 h-[350px] bg-gray-100 rounded-md">
            <header className="bg-radial from-teal-600 to-teal-900 h-[150px] flex justify-center items-center relative rounded-t-md text-sm">
                <div className="absolute right-3 top-3 text-teal-500 bg-white/80 px-2 py-1 rounded-md">
                    <span className="bi-graph-up" />
                    <span className="ml-1">₹{fee_per_person}
                        <span className="text-gray-500"> / person</span>
                    </span>
                </div>

                <h1 className="text-white text-2xl font-bold">{name}</h1>
            </header>
        </article>
    );
}