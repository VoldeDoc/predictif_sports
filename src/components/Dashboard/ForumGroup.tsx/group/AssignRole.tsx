import { AuthLayout } from "@/components/Layout/layout";
import { useState } from "react";

type User = {
    id: number;
    username: string;
    email: string;
    role: string; // "Member" or "Moderator"
};

export default function AssignRolesPage() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, username: "musa", email: "musa@silexsecure.com", role: "Member" },
        { id: 2, username: "jane.doe", email: "jane.doe@example.com", role: "Member" },
        { id: 3, username: "john.smith", email: "john.smith@example.com", role: "Moderator" },
        { id: 4, username: "alice.wang", email: "alice.wang@example.com", role: "Member" },
        { id: 5, username: "bob.miller", email: "bob.miller@example.com", role: "Member" },
    ]);

    const handleRoleChange = (userId: number, newRole: string) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    const handleSaveRoles = () => {
        console.log("Updated User Roles:", users);
        alert("Roles have been updated!");
    };

    return (
        <AuthLayout>
            <div className="p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Assign Roles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-4 shadow rounded-lg border hover:shadow-lg flex flex-col space-y-2"
                        >
                            <p className="text-lg font-medium text-gray-700">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            <div className="flex items-center space-x-2">
                                <label htmlFor={`role-${user.id}`} className="text-sm font-medium text-gray-600">
                                    Role:
                                </label>
                                <select
                                    id={`role-${user.id}`}
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                >
                                    <option value="Member">Member</option>
                                    <option value="Moderator">Moderator</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSaveRoles}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Save Changes
                </button>
            </div>
        </AuthLayout>
    );
}
