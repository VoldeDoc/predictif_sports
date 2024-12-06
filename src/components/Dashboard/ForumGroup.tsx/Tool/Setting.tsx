import { AuthLayout } from "@/components/Layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from '@/components/Ui/Button'
import useDashBoardManagement from "@/hooks/useDashboard";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";

export default function GroupSettingsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getGroupUsers, deleteGroup, leaveGroup } = useDashBoardManagement();
    const [isChatLocked, setIsChatLocked] = useState(false);
    const [groupUsers, setGroupUsers] = useState<{ group_id: number; user_id: number; role: string; joined_at: string }[]>([]);
    const [showAdminMessage, setShowAdminMessage] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await getGroupUsers(Number(id));
                if (response) {
                    const pivotData = response.map((user: any) => user.pivot);
                    setGroupUsers(pivotData);
                    console.log("Pivot data:", pivotData.role);
                } else {
                    console.error("Response data is undefined");
                }
            } catch (error) {
                console.error("Failed to fetch group users", error);
            }
        })();
    }, [id]);

    const handleLeaveGroup = async () => {
        const isAdmin = groupUsers.some((user) => user.role === "admin");
        if (isAdmin) {
            setShowAdminMessage(true);
            setTimeout(() => {
                setShowAdminMessage(false);
            }, 3000);
            return;
        }
        try {
            const response = await leaveGroup(Number(id));
            toast.success(response);
        } catch (error) {
            toast.error("Failed to leave the group.");
        }
    };

    const handleDeleteGroup = async () => {
        toast.promise(
            deleteGroup(Number(id)),
            {
                pending: "Deleting group...",
                success: {
                    render({ data }) {
                        return <div>{data as string}</div>;
                    },
                },
                error: {
                    render({ data }) {
                        return <div>{data as string}</div>;
                    },
                },
            }
        )
    };

    const handleToggleChatLock = () => {
        setIsChatLocked((prev) => !prev);
        console.log(isChatLocked ? "Unlocking chat..." : "Locking chat...");
    };

    const renderAdminButtons = () => {
        return groupUsers.map((user) => (
            (user.role === "admin" || user.role === "moderator") && (
                <div key={user.user_id} className="space-y-2">
                    <Button
                        text="Add members"
                        iconPosition="right"
                        className="bg-black-300 !text-black-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                        link={`/user/add-members/${id}`}
                    />
                    <Button
                        text="Assign Role"
                        iconPosition="right"
                        className="bg-black-300 !text-black-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                        link={`/user/role/${id}`}
                    />
                    <Button
                        text="Remove User"
                        iconPosition="right"
                        className="bg-black-300 !text-black-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                        link={`/user/remove-users/${id}`}
                    />
                    <Button
                        text="Update group"
                        iconPosition="right"
                        className="bg-black-300 !text-black-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                        link={`/user/update-group/${id}`}
                    />
                    <Button
                        text="Lock Chat"
                        iconPosition="right"
                        className="bg-black-300 !text-black-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                        onClick={handleToggleChatLock}
                    />
                    <Button
                        text="Delete group"
                        className="bg-black-300 !text-red-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                        onClick={() => setShowDeleteModal(true)}
                    />
                </div>
            )
        ));
    };

    return (
        <AuthLayout>
            <div className="sm:px-16 px-8">
                <div className="min-h-screen flex flex-col bg-gray-100 p-6">
                    <h1 className="text-xl font-bold mb-6">Group Settings</h1>
                    {/* Back Button */}
                    <div className="mt-6">
                        <Button
                            text="Back to Group"
                            className="bg-black-300 !text-gray-950 font-semibold px-8 py-2 shadow-md flex items-center space-x-2"
                            onClick={() => navigate(-1)}
                        />
                    </div>

                    {/* Actions */}
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-4">
                        <h2 className="text-lg font-semibold">Actions</h2>
                        <Button
                            text="See all members"
                            className="bg-black-300 !text-black-500 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                            link={`/user/all-users/${id}`}
                        />
                        {renderAdminButtons()}
                        <Button
                            text="Leave Group"
                            className="bg-black-300 !text-red-600 font-semibold px-8 w-full py-2 shadow-md flex items-center space-x-2"
                            onClick={handleLeaveGroup}
                        />
                        {showAdminMessage && (
                            <p className="text-red-500 text-center font-bold">Admin cannot leave the group. Please delete the group instead.</p>
                        )}
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} className="text-center flex justify-center items-center">
                    <Modal.Header className="bg-white !text-red-500">
                        Are you sure you want to delete the group?
                    </Modal.Header>
                    <Modal.Body className="bg-white">
                        <div className="text-center flex flex-col justify-center items-center">
                            <p className="font-bold">This action cannot be undone.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="bg-white">
                        <Button
                            text="Cancel"
                            className="!bg-gray-400 !text-black-800 font-semibold px-8 py-2 shadow-md"
                            onClick={() => setShowDeleteModal(false)}
                        />
                        <Button
                            text="Delete"
                            className="bg-red-500 !text-white font-semibold px-8 py-2 shadow-md"
                            onClick={handleDeleteGroup}
                        />
                    </Modal.Footer>
                </Modal>
            )}
        </AuthLayout>
    );
}