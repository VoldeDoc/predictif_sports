import { AuthLayout } from "@/components/Layout/layout";
import { useState } from "react";

export default function RemoveMember() {
    const [users] = useState([
        { id: 1, username: "musa", email: "musa@silexsecure.com" },
        { id: 2, username: "jane.doe", email: "jane.doe@example.com" },
        { id: 3, username: "john.smith", email: "john.smith@example.com" },
        { id: 4, username: "alice.wang", email: "alice.wang@example.com" },
        { id: 5, username: "bob.miller", email: "bob.miller@example.com" },
        { id: 6, username: "charlie.brown", email: "charlie.brown@example.com" },
        { id: 7, username: "daisy.fields", email: "daisy.fields@example.com" },
        { id: 8, username: "eve.green", email: "eve.green@example.com" },
        { id: 9, username: "frank.stone", email: "frank.stone@example.com" },
        { id: 10, username: "grace.hill", email: "grace.hill@example.com" },
    ]);

    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const handleCheckboxChange = (userId: number) => {
        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleAddUsers = () => {
        console.log("Selected Users:", selectedUsers);
        alert(`Selected Users: ${selectedUsers.join(", ")}`);
    };

    return (
        <AuthLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Users</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-4 shadow rounded-lg flex items-center space-x-4 border hover:shadow-lg"
                        >
                            <input
                                type="checkbox"
                                id={`user-${user.id}`}
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleCheckboxChange(user.id)}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`user-${user.id}`} className="flex-grow">
                                <p className="text-lg font-medium text-gray-700">{user.username}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleAddUsers}
                    className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Remove Selected Members
                </button>
            </div>
        </AuthLayout>
    );
}
