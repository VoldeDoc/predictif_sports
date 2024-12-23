import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/services/axios-client";
import { addMembersValues, AssignMemberRoleValues, createGroupValues, deleteMessageValues, editMessageValues, sendMessageValues, SurveyDataValues } from "@/types";
import { useState } from "react";
import { RootState } from "@/context/store/rootReducer";
import { toast } from "react-toastify";

function useDashBoardManagement() {
    const [loading, setLoading] = useState(false);
    const client = axiosClient();
    const router = useNavigate();
    const userdata = useSelector((state: RootState) => state.auth?.user);
    const isquestionnaireFilled = userdata?.is_questionnaire_filled === "yes";
    const username = userdata?.username;
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
            router(`/forum/messages/${result.id}`);
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
            router(`/forum`);
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
            router(`/forum`);
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


    // const DeleteMessage = async (data) => {
    //     try {
    //         setLoading(false)
    //         const delsms = await client.delete('/forum/messages/delete',data)
    //     }
    //     catch {

    //     }
    // }


    const LockChat = async (group_Id: number) => {
        try {
            setLoading(true)
            const locked = await client.post('/forum/groups/close-chat', { group_id: group_Id })
            const result = locked.data?.data
            console.log(result)
            return result
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error("Error editing message", errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const OpenChat = async (group_id: number) => {
        try {
            setLoading(true)
            const OpenChat = await client.post("/forum/groups/reopen-chat", { group_id: group_id })
            const result = OpenChat.data?.data
            return result
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error("Error editing message", errorMessage)
        }
        finally {
            setLoading(false)
        }
    }


    const getAllUsers = async () => {
        try {
            setLoading(true)
            const getUser = await client.get("/listusers")
            const res = getUser.data?.data
            return res
        }
        catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error("Error getting users", errorMessage)
        }
        finally {
            setLoading(false)
        }

    }

    const AddUserToGroup = async (data: addMembersValues) => {
        try {
            setLoading(true)
            const addUser = await client.post("/forum/groups/users", data)
            const res = addUser.data?.data
            console.log(res);
            router(`/forum/messages/${data.group_id}`)
            return Promise.resolve(`Users Added to group ${data.group_id}`)
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error("Error getting users", errorMessage)
        }
        finally {
            setLoading(false)
        }
    }

    const AssignRole = async (data: AssignMemberRoleValues) => {
        try {
            setLoading(true);
            const assignRole = await client.post("/forum/groups/role/users", data);
            const res = assignRole.data?.data;
            router(`/user/all-users/${data.group_id}`);
            console.log(res);
            return Promise.resolve(`Role assigned to user`);
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error("Error assigning roles", errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };


    const RemoveUserFromGroup = async (data: addMembersValues) => {
        try {
            setLoading(true)
            const removeUser = await client.delete("/forum/groups/users/remove", { data })
            const res = removeUser.data?.data
            console.log(res);
            router(`/forum/messages/${data.group_id}`)
            return Promise.resolve(`Users removed from group ${data.group_id}`)
        }
        catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error("Error getting users", errorMessage)
            return Promise.reject(`${errorMessage}`)
        }
        finally {
            setLoading(false)
        }
    }

    const deleteMessage = async (data: deleteMessageValues) => {
        try {
            setLoading(true);
            const response = await client.delete("/forum/messages/delete", { data });
            const result = response?.data.data;
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error("Error deleting message:", errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const getSubsriptionPlans = async () => {
        try {
            setLoading(true)
            const response = await client.get('/subscription/plans')
            const result = response?.data.data;
            console.log(result);
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error( errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const subsricbeToPlan = async (data: string) => {
        try {
            setLoading(true)
            const response = await client.get(`/subscription/user/${data}`)
            const result = response?.data.data;
            console.log(result);
            return Promise.resolve("Subscribed to plan successfully");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error("Error subsribing", errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }


    const getUserPlan = async () => {
        try {
            setLoading(true)
            const response = await client.get('/subscription/userPlans')
            const result = response?.data.data;
            console.log(result);
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const getTeamCountry = async () => {
        try {
            setLoading(true)
            const response = await client.get('/user/getCountry')
            const result = response?.data.data;
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    const getTeamLeague = async (data:string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/getLeague/${data}`)
            const result = response?.data.data;
            console.log(result);
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error( errorMessage);
        } finally {
            setLoading(false);
        }
    }
    const getTeam = async (data:string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/getTeam/${data}`)
            const result = response?.data.data;
            console.log(result);
            return result;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error( errorMessage);
        } finally {
            setLoading(false);
        }
    }
    const submmitClub = async (payload: { club: string }) => {
        try {
            setLoading(true);
            const response = await client.post('/user/submitSelection', payload);
            const result = response?.data.data;
            console.log(result);
            router('/user/profile')
            return Promise.resolve("Club submitted successfully");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };
    

    return {
        loading,
        username,
        isquestionnaireFilled,
        surveyQuestions,
        CreateGroup,
        getUserGroupById,
        getGroupUsers,
        getAllGroups,
        updateGroup,
        deleteGroup,
        leaveGroup,
        sendMessage,
        getMessage,
        EditMessage,
        LockChat,
        OpenChat,
        getAllUsers,
        AddUserToGroup,
        AssignRole,
        RemoveUserFromGroup,
        deleteMessage,
        getSubsriptionPlans,
        subsricbeToPlan,
        getUserPlan,
        getTeamCountry,
        getTeamLeague,
        getTeam,
        submmitClub
    };
}

export default useDashBoardManagement;