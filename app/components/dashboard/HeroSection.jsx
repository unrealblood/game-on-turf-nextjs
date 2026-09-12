export default function HeroSection({cards}) {
    return (
        <section className="mt-8">
            <div className="flex flex-wrap justify-start items-start gap-8">
                {cards.map((card, index) => (
                    <div key={index} className="bg-gray-100 py-6 px-12 rounded-md flex justify-center items-start gap-2">
                        <div className={`p-3 ${card.bgColor} rounded-md`}>
                            <span className={`bi-${card.icon} ${card.textColor} text-2xl`} />
                        </div>
                        
                        <div>
                            <p className="text-gray-500">{card.title}</p>
                            <p className="text-2xl font-bold">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}