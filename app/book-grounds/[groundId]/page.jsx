import BookGroundClientComponent from "@/app/components/book-grounds/BookGroundClientComponent";
import Link from "next/link";

export default async function BookGround({params}) {
    const { groundId } = await params;

    return (
        <div className="flex-1 overflow-y-auto my-18">
            <section className="pt-8 pl-8">
                <p>
                    <Link href="/book-grounds" className="font-bold text-teal-500 text-xl"><span className="bi-arrow-left mr-2" /> Back to Grounds</Link>
                </p>
            </section>

            <BookGroundClientComponent groundId={groundId} />
        </div>
    );
}