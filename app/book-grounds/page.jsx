import GroundsGrid from "../components/book-grounds/GroundsGrid";

export default async function BookGround() {
    return (
        <div className="flex-1 overflow-y-auto my-18">
            <section className="p-8">
                <h1 className="font-bold text-2xl">Available Grounds</h1>
                <p className="mt-2 text-gray-500">Find the perfect turf for your next match.</p>
            </section>

            <GroundsGrid />
        </div>
    );
}