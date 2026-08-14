import Link from "next/link";

export default async function Footer() {
    return (
        <footer className="bg-gray-900 py-8">
            <div className="flex justify-between items-start text-white px-8 pb-8">
                <div>
                    <Link href={"/"}><h2 className="font-bold text-xl">GameOnTurf</h2></Link>

                    <p className="mt-4 text-gray-500 w-96">The premier platform for finding and booking sports facilities. Bringing athletes and ground owners together.</p>
                </div>

                <div>
                    <h3 className="text-lg font-bold">Quick Links</h3>

                    <nav className="flex justify-start items-start gap-2 flex-col mt-4 text-gray-500">
                        <Link href={"/"}>Home</Link>
                        <Link href={"/book-grounds"}>Book a Ground</Link>
                        <Link href={"/list-ground"}>List Ground</Link>
                    </nav>
                </div>

                <div>
                    <h3 className="text-lg font-bold">Contact</h3>

                    <p className="mt-4 text-gray-500">shubhamsingh.contact@gmail.com</p>
                </div>
            </div>

            <p className="pt-8 text-center border-t border-gray-200 text-gray-500">Copyright &copy; 2026 GameOnTurf. All rights reserved.</p>
        </footer>
    );
}