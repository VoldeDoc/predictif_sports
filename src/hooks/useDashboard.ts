import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/services/axios-client";
import { createGroupValues, editMessageValues, sendMessageValues, SurveyDataValues } from "@/types";
import { useState } from "react";
import { RootState } from "@/context/store/rootReducer";
import { toast } from "react-toastify";

function useDashBoardManagement() {
    const [loading, setLoading] = useState(false);
    const client = axiosClient();
    const router = useNavigate();
    const userdata = useSelector((state: RootState) => state.auth?.user);
    const isquestionnaireFilled = userdata?.is_questionnaire_filled === "yes";

    const surveyQuestions = async (data: SurveyDataValues) => {
        try {
            setLoading(true);
            const res = await client.post("/user/sportsBettingQuestionnaire", data);
            const questions = res.data.data;
            console.log(questions);
            router("/progress-survey");
            return Promise.resolve("survey filled successfully!");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage =
                resError?.message || resError?.data || "An error occurred";
            console.log(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const CreateGroup = async (data: createGroupValues) => {
        try {
            setLoading(true);
            const group = await client.post("/forum/groups", data);
            const result = group.data.data;
            console.log(result);
            router(`/user-group/${result.id}`);
            return Promise.resolve("Group created successfully!");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage =
                resError?.message || resError?.data || "An error occurred";
            console.log(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const getUserGroupById = async (id: number) => {
        try {
            setLoading(true);
            const group = await client.get(`/forum/groups/${id}`);
            const result = group.data.data;
            return result
        } catch (error: any) {
            const resError = error.response?.data;
            console.log(resError.status);
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            if (resError?.status === 403) {
                router("/dashboard");
                toast.error(`${errorMessage}`);
            }
            console.log(errorMessage);
            //   return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const getGroupUsers = async (id: number) => {
        try {
            setLoading(true);
            const users = await client.get(`/forum/groups/${id}/users`);
            const result = users.data.data;
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.log(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const getAllGroups = async () => {
        try {
            setLoading(true)
            const allgroups = await client.get("/forum/groups")
            return allgroups.data.data
        } catch (error: any) {
            const resError = error.respose?.data
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.log(errorMessage);
            return Promise.reject({ errorMessage })

        }
        finally {
            setLoading(false)
        }
    }

    const updateGroup = async (id: number, data: createGroupValues) => {
        try {
            setLoading(true);
            const group = await client.put(`/forum/groups/${id}`, data);
            const result = group.data.data;
            console.log(result);
            router(`/user-group/${result.id}`);
            return Promise.resolve("Group updated successfully!");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage =
                resError?.message || resError?.data || "An error occurred";
            console.log(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const deleteGroup = async (id: number) => {
        try {
            setLoading(true);
            const group = await client.delete(`/forum/groups/${id}`);
            const result = group.data.data;
            console.log(result);
            router(`/all-groups`);
            return Promise.resolve("Group deleted successfully!");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage =
                resError?.message || resError?.data || "An error occurred";
            console.log(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const leaveGroup = async (groupId: number) => {
        try {
            setLoading(true);
            const group = await client.post(`/forum/groups/users/leave`, { group_id: groupId });
            const result = group.data.data;
            console.log(result);
            router(`/all-groups`);
            return Promise.resolve("You have left the group!");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage =
                resError?.message || resError?.data || "An error occurred";
            console.log(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const sendMessage = async (data: sendMessageValues) => {
        try {
            setLoading(true)
            const sentMessage = await client.post('/forum/messages/send', data)
            const res = sentMessage.data.data
            console.log(res);
            return res
        } catch (error: any) {
            const resError = error.response?.data
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.log(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }


    const getMessage = async (group_Id: number) => {
        try {
            setLoading(true);
            const response = await client.get(`/forum/messages`, { params: { group_id: group_Id } });
            const result = response.data?.data || [];
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error("Error fetching messages:", errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const EditMessage = async (data: editMessageValues) => {
        try {
            setLoading(true)
            const response = await client.post('/forum/messages/edit', data)
            const result = response.data?.data
            return result
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error("Error editing message", errorMessage)

        } finally {
            setLoading(false)
        }

    }


    // const DeleteMessage = async (group_Id: number) => {
    //     try {
    //         setLoading(false)
    //     }
    //     catch {

    //     }
    // }



    return {
        loading,
        surveyQuestions,
        CreateGroup,
        isquestionnaireFilled,
        getUserGroupById,
        getGroupUsers,
        getAllGroups,
        updateGroup,
        deleteGroup,
        leaveGroup,
        sendMessage,
        getMessage,
        EditMessage,
    };
}

export default useDashBoardManagement;