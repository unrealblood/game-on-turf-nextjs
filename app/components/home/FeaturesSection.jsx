export default async function FeaturesSection() {
    const features = [
        {
            icon: "geo-alt",
            title: "Find Venues Near You",
            description: "Easily locate premium sports facilities in your neighborhood using our location-based search."
        },
        {
            icon: "calendar4-event",
            title: "Instant Booking",
            description: "Check real-time availablity and book your slot instantly. No waiting, no hassle."
        }
    ];

    return (
        <section className="my-4 mx-8">
            <div className="flex justify-center items-start flex-wrap gap-8">
                {features.map((feature, index) => (
                    <article key={index} className="bg-gray-200 p-4 rounded-md w-[300px] flex justify-start items-start flex-col gap-4 shadow-sm">
                        <div className="w-16 rounded-full bg-green-200 p-2 text-center">
                            <span className={`bi-${feature.icon} text-teal-500 text-xl`} />
                        </div>

                        <h2 className="font-bold text-2xl">{feature.title}</h2>

                        <p className="text-gray-500">{feature.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}