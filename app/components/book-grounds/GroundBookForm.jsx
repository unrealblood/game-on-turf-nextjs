export default function GroundBookForm({groundName, fee_per_person}) {
    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="px-4 mb-4 flex flex-col justify-start items-start gap-4">
                <p>Ground Name: {groundName}</p>
                <p>Fee per person: {fee_per_person}</p>

                <div className="flex justify-start items-start flex-col gap-2 w-full">
                    <label htmlFor="teamNameInput">Team Name</label>

                    <input type="text" id="teamNameInput" className="bg-gray-200 p-2 rounded-md w-full" placeholder="Enter team name" />
                </div>

                <div className="flex justify-start items-start flex-col gap-2 w-full">
                    <label htmlFor="playersInput">Players</label>

                    <input type="number" id="playersInput" className="bg-gray-200 p-2 rounded-md w-full" placeholder="0" />
                </div>

                <div className="flex justify-start items-start flex-col gap-2 w-full">
                    <label htmlFor="dateInput">Booking Date</label>

                    <input type="date" id="dateInput" className="bg-gray-200 p-2 rounded-md" />
                </div>

                <div className="w-full flex justify-start items-start gap-4">
                    <div className="flex justify-start items-start flex-col gap-2 w-full">
                        <label htmlFor="startTimeInput">Start Time</label>

                        <input type="time" id="startTimeInput" className="bg-gray-200 p-2 rounded-md" />
                    </div>

                    <div className="flex justify-start items-start flex-col gap-2 w-full">
                        <label htmlFor="startTimeInput">End Time</label>

                        <input type="time" id="endTimeInput" className="bg-gray-200 p-2 rounded-md" />
                    </div>
                </div>

                <p>Total Amount: 500</p>

                <div className="w-full flex justify-center items-center">
                    <button type="submit" className="bg-gray-900 text-white cursor-pointer rounded-md px-4 py-2">Confirm Booking</button>
                </div>
            </form>
        </div>
    );
}