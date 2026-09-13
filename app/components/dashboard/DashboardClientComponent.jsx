"use client";

import HeroSection from "./HeroSection";
import RecentBookings from "./RecentBookings";

export default function DashboardClientComponent() {
    const cards = [
        {
            icon: "bounding-box",
            title: "Total Grounds",
            value: 0,
            bgColor: "bg-blue-200",
            textColor: "text-blue-500"
        },
        {
            icon: "calendar",
            title: "Total Bookings",
            value: 0,
            bgColor: "bg-teal-200",
            textColor: "text-teal-500"
        }
    ];

    return (
        <div className="flex-1 overflow-y-auto mt-20 p-4">
            <header>
                <h1 className="text-2xl font-bold"><span className="bi-shield text-teal-500" /> User Dashboard</h1>
                <p className="text-gray-500 mt-2">Monitor bookings, and view analytics.</p>
            </header>

            <HeroSection cards={cards} />
            <RecentBookings />
        </div>
    );
}