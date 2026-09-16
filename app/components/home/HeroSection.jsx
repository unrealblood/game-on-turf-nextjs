import Link from "next/link";

export default async function HeroSection() {
    return (
        <section className="px-8 py-4">
            <div className="bg-linear-to-r from-teal-600 to-teal-950 text-white rounded-xl sm:h-[600px] h-[500px] flex justify-center items-center flex-col gap-10 text-center">
                <h1 className="sm:text-6xl text-3xl font-bold px-8">Book the Perfect Pitch,<br />Play Your Best Game.</h1>

                <p className="sm:px-16 px-8">Discover and book premium sports grounds in your city instantly. From 5-a-side football turfs to full-size cricket arenas.</p>

                <div className="flex justify-center items-center sm:gap-16 gap-4 px-4 sm:px-0">
                    <Link href={"/book-grounds"} className="bg-teal-400 sm:px-12 sm:py-4 rounded-xl px-4 text-base sm:text-xl"><span className="font-bold">Book a Ground</span> &gt;</Link>

                    <Link href={"/list-ground"} className="bg-white/20 sm:px-12 sm:py-4 rounded-xl font-bold sm:text-xl text-base px-4 hover:bg-white/30">List your Ground</Link>
                </div>
            </div>
        </section>
    );
}