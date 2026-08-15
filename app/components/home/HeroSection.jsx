import Link from "next/link";

export default async function HeroSection() {
    return (
        <section className="px-8 py-4">
            <div className="bg-linear-to-r from-teal-600 to-teal-950 text-white rounded-xl h-[600px] flex justify-center items-center flex-col gap-10 text-center">
                <h1 className="text-6xl font-bold px-8">Book the Perfect Pitch,<br />Play Your Best Game.</h1>

                <p className="px-16">Discover and book premium sports grounds in your city instantly. From 5-a-side football turfs to full-size cricket arenas.</p>

                <div className="flex justify-center items-center gap-16">
                    <Link href={"/book-grounds"} className="bg-teal-400 px-12 py-4 rounded-xl text-xl"><span className="font-bold">Book a Ground</span> &gt;</Link>

                    <Link href={"/list-ground"} className="bg-white/20 px-12 py-4 rounded-xl font-bold text-xl">List your Ground</Link>
                </div>
            </div>
        </section>
    );
}