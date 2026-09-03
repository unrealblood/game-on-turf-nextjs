import BookingDetailsPanel from "@/app/components/book-grounds/BookingDetailsPanel";
import GroundBookForm from "@/app/components/book-grounds/GroundBookForm";
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

            <section className="flex justify-between px-8 items-start gap-4 mt-8">
                <GroundBookForm />
                <BookingDetailsPanel />
            </section>
        </div>
    );
}