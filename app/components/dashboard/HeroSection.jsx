import { useEffect, useState } from "react";

export default function HeroSection({cards, bookings}) {
    const [totalGrounds, setTotalGrounds] = useState(0);

    useEffect(() => {
        setTotalGrounds(bookings.filter((booking, index, self) => index === self.findIndex((b) => b.grounds.name === booking.grounds.name)).length);
    }, [bookings]);

    return (
        <section className="sm:mt-8 mt-4">
            <div className="flex flex-wrap justify-start items-start sm:gap-8 gap-4">
                {cards.map((card, index) => (
                    <div key={index} className="bg-gray-100 sm:py-6 py-4 sm:px-12 px-6 rounded-md flex justify-center items-start gap-2">
                        <div className={`p-3 ${card.bgColor} rounded-md`}>
                            <span className={`bi-${card.icon} ${card.textColor} text-2xl`} />
                        </div>
                        
                        <div>
                            <p className="text-gray-500">{card.title}</p>
                            {card.title === "Total Grounds" && <p className="text-2xl font-bold">{totalGrounds}</p>}

                            {card.title === "Total Bookings" && <p className="text-2xl font-bold">{bookings.length}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}