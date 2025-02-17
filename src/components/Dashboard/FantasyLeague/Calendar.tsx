import { useState } from "react";
import { format, addMonths, subMonths, setMonth, setYear } from "date-fns";

const events: { [key: string]: string[] } = {
    "2025-02-16": ["Football Match", "Team Practice"],
    "2025-02-20": ["Press Conference"],
    "2025-03-05": ["Friendly Match"],
};

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value);
        setSelectedMonth(newMonth);
        setCurrentDate(setMonth(currentDate, newMonth));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newYear = parseInt(e.target.value);
        setSelectedYear(newYear);
        setCurrentDate(setYear(currentDate, newYear));
    };

    const getEventsForDate = (date: Date) => {
        const dateString: string = format(date, "yyyy-MM-dd");
        return events[dateString] || [];
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-8">
                <button onClick={handlePrevMonth} className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded mb-2 md:mb-0">Previous</button>
                <h2 className="text-xl md:text-3xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
                <button onClick={handleNextMonth} className="bg-blue-500 text-white px-2 py-1 md:px-4 md:py-2 rounded mt-2 md:mt-0">Next</button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4 md:mb-8">
                <label className="font-semibold">Select Month:</label>
                <select value={selectedMonth} onChange={handleMonthChange} className="border p-1 md:p-2 rounded">
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>{format(new Date(2021, i, 1), "MMMM")}</option>
                    ))}
                </select>

                <label className="font-semibold">Select Year:</label>
                <input
                    type="number"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="border p-1 md:p-2 rounded w-16 md:w-24"
                />
            </div>

            <div className="grid grid-cols-7 gap-2 md:gap-4">
                {"Sun Mon Tue Wed Thu Fri Sat".split(" ").map((day) => (
                    <div key={day} className="text-center font-semibold text-sm md:text-lg">{day}</div>
                ))}

                {Array.from({ length: startOfMonth.getDay() }, (_, i) => (
                    <div key={i} className="" />
                ))}

                {daysInMonth.map((day) => {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const dayEvents = getEventsForDate(date);
                    return (
                        <div key={day} className="border p-2 md:p-8 rounded hover:bg-blue-100 flex flex-col justify-between">
                            <p className="font-bold text-lg md:text-xl mb-1 md:mb-2">{day}</p>
                            {dayEvents.map((event, index) => (
                                <p key={index} className="text-xs md:text-sm text-blue-600">{event}</p>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}