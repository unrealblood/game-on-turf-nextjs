export default function BookingDetailsPanel({ground}) {
    return (
        <div className="bg-gray-100">
            <p>This is ground booking details panel.</p>
            <p>{ground.name}</p>
        </div>
    );
}