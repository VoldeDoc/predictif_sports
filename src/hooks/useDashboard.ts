import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/services/axios-client";
import { addMembersValues, AssignMemberRoleValues, createGroupValues, createStrategyValues, deleteMessageValues, editMessageValues, FormationValues, MatchDay, sendMessageValues, setSquadPlayers, SubstitutionValues, SurveyDataValues } from "@/types";
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
            router(`/forum/messages/${result.id}`);
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
            console.error(errorMessage);
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
    const getTeamLeague = async (data: string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/getLeague/${data}`)
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
    const getTeam = async (data: string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/getTeam/${data}`)
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
    const submmitClub = async (payload: { club: string }) => {
        try {
            setLoading(true);
            const response = await client.post('/user/submitSelection', payload);
            const result = response?.data.data;
            console.log(result);
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

    const getClubFollowed = async () => {
        try {
            setLoading(true)
            const response = await client.get("/user/getClubFollowing")
            return response?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const unFollowClub = async (id: string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/unfollowingClub/${id}`)
            console.log(response.data);
            return Promise.resolve("unfollowed")
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const submitPlayer = async (club: string, payload: { players: string }) => {
        try {
            setLoading(true);
            const response = await client.post('/user/submitClubPlayerSelection', {
                club,
                players: payload.players
            });
            const result = response?.data.data;
            console.log(result);
            return Promise.resolve("Player submitted successfully");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };


    const getPlayer = async (data: string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/getClubPlayer/${data}`)
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

    const getPlayerFollowed = async () => {
        try {
            setLoading(true)
            const response = await client.get("/user/getClubPlayerFollowing")
            return response?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const unFollowPlayer = async (id: string) => {
        try {
            setLoading(true)
            const response = await client.get(`/user/unfollowingClubPlayer/${id}`)
            console.log(response);
            return Promise.resolve('unfollowed player')
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }

    const getStrategyItem = async () => {
        try {
            setLoading(true)
            const res = await client.get('/user/getStrategyItem')
            return res?.data?.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const createStrategies = async (data: createStrategyValues) => {
        try {
            setLoading(true)
            const res = await client.post('/user/strategiesCreate', data)
            console.log(res.data)
            router('/user/strategies')
            return Promise.resolve("Strategy created successfully")
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);

        }
        finally {
            setLoading(false)
        }
    }

    const updateStrategies = async (data: createStrategyValues) => {
        try {
            setLoading(true)
            const res = await client.post('/user/strategiesUpdate', data)
            console.log(res.data)
            router('/user/strategies')
            return Promise.resolve("Strategy updated successfully")
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);

        }
        finally {
            setLoading(false)
        }
    }

    const getMyStrategies = async (type: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMyStrategy/${type}`)
            return res?.data?.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        }
        finally {
            setLoading(false)
        }
    }

    const deleteStrategies = async (id: string) => {
        try {
            setLoading(true)
            await client.get(`/user/deleteMyStrategy/${id}`)
            return Promise.resolve()
        }
        catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return Promise.reject(`${errorMessage}`);
        }
        finally {
            setLoading(false)
        }
    }

    const getMatchAlert = async () => {
        try {
            setLoading(true)
            const response = await client.get('/user/getMatchAlert')
            return response?.data?.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getLastMessagesForGroups = async () => {
        try {
            setLoading(true)
            const response = await client.get('/forum/messages/lastUser')
            return response?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getLastMessagesForGroupsById = async () => {
        try {
            setLoading(true)
            const response = await client.get('/forum/messages/last')
            return response?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const saveUserWidget = async (widget_state: string) => {
        try {
            setLoading(true);
            const response = await client.post('/updateUserWidget', { widget_state });
            return response?.data.data;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const response = await client.get('/getUserDetails')
            return response?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }

    }


    const updateUserOnboarding = async (onboarding_state: string) => {
        try {
            setLoading(true);
            const response = await client.post('/updateUserOnboarding', { onboarding_state });
            return response?.data.data;
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getStrategyById = async (strategy_id: string) => {
        try {
            setLoading(true)
            const response = await client.get(`user/getStrategyById/${strategy_id}`)
            return response?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getPlayerById = async (player_id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getPlayerById/${player_id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getTeamById = async (player_id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getClubById/${player_id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getMatchDetail = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchDetail/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getUpcomingMatch = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertUpComing`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }
    const getUpcomingMatchPublic = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertUpComing/public`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }


    const getTodayMatch = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertToday/`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }
    const getTodayMatchPublic = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertToday/public`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getResultMatch = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertResult`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }
    const getResultMatchPublic = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertResult/public`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    const getNewsEvent = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getNewEvent`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }


    const getNewsEventBySubject = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getNewEventBySubject/${id}/subject`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured";
            console.error(errorMessage)
        }
        finally {
            setLoading(false)
        }

    }

    const getNewsEventById = async (id: number) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getNewEventById/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured";
            console.error(errorMessage)
        }
        finally {
            setLoading(false)
        }

    }

    const getRegion = async () => {
        try {
            setLoading(true)
            const res = await client.get('/user/getRegion')
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getCountryRegion = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getRegionByCountry/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getCountryRegionLeague = async ({ id, sport }: { id: string, sport: string }) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getLeague/${id}/${sport}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getCountryRegionLeagueByIdUpcoming = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertUpComing/public/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getCountryRegionLeagueByIdLatest = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertUpComing/public/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }
    const getCountryRegionLeagueByIdUpcomingPrivate = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertUpComing/user/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getCountryRegionLeagueByIdLatestPrivate = async (id: string) => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getMatchAlertUpComing/user/${id}`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getPlayersByLeague = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/getClubPlayerLeague/eyJpdiI6IjR4Y1k5YW1JUGdzU3ZIS0tGYnVmdlE9PSIsInZhbHVlIjoia3lpaHNENTFlbC9HV3Q5dkNjUnRFQT09IiwibWFjIjoiYjYzMDUxOGY5Y2JhMjc2ZTY4OTk2NzQ1ZGQxMDAzZDI3YjkzOWVlYWM3YWE0NTE1NWViN2VjZTRkYWRmZDY5YyIsInRhZyI6IiJ9`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const getFantasyPlayerById = async (id: string) => {
        try {
            setLoading(true);
            const res = await client.get(`/user/fantasy/getSquadbyId/${id}`);
            console.log(res?.data?.data);

            return { data: res?.data?.data, status: res?.status };
        } catch (error: any) {
            console.log(error);

            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return { data: [], status: 404 };
        } finally {
            setLoading(false);
        }
    }

    const getFantasyPlayerAccount = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/fantasy/getuser`)
            return res?.data.data
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
    }

    const TransferPlayerIn = async (id: string) => {
        try {
            setLoading(true);
            const res = await client.get(`/user/fantasy/transferPlayerIn/${id}`);
            console.log(res?.data?.data);

            return { data: res?.data?.data, status: res?.status };
        } catch (error: any) {
            console.log(error);

            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occurred";
            console.error(errorMessage);
            return { data: [], status: 404 };
        } finally {
            setLoading(false);
        }
    }

    const getFantasySquadPlayers = async () => {
        try {
            setLoading(true)
            const res = await client.get(`/user/fantasy/getSquad`)
            return res?.data.data
        }
        catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
        finally {
            setLoading(false)
        }
    }

    const createMatchDay = async (data: MatchDay) => {
        try {
            setLoading(true)
            const res = await client.post(`/user/fantasy/matchDay`, data)
            const result = res.data.data;
            console.log(result);
            return Promise.resolve("Group created successfully!");
        } catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
        finally {
            setLoading(false)
        }
    }

    const getMatchDay = async () => {
        try {
            setLoading(true)
            const res = await client.get('/user/fantasy/getMatchDay')
            return res?.data?.data
        }
        catch (error: any) {
            const resError = error.response?.data;
            const errorMessage = resError?.message || resError?.data || "An error occured"
            console.error(errorMessage);

        }
        finally {
            setLoading(false)
        }
    }

const setSquad = async (data: setSquadPlayers) => {
    try {
        setLoading(true);
        const res = await client.post('/user/fantasy/setSquad', data);
        return res?.data?.data;
    } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage = resError?.message || resError?.data || "An error occurred";
        console.error(errorMessage);
    } finally {
        setLoading(false);
    }
}

const getMatchDaySquad = async (id: string) => {
    try {
        setLoading(true);
        const res = await client.get(`/user/fantasy/getMatchDaySquad/${id}`);
        return res?.data?.data;
    } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage = resError?.message || resError?.data || "An error occurred";
        console.error(errorMessage);
    } finally {
        setLoading(false);
    }
}

const setFormation  = async (data:FormationValues) =>{
    try {
        setLoading(true);
        const res = await client.post('/user/fantasy/matchDayUpdate', data);
        return res?.data?.data;
    } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage = resError?.message || resError?.data || "An error occurred";
        console.error(errorMessage);
    } finally {
        setLoading(false);
} 
    }


   
const substitute  = async (data:SubstitutionValues) =>{
    try {
        setLoading(true);
        const res = await client.post('/user/fantasy/matchDaySquad', data);
        return res?.data?.data;
    } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage = resError?.message || resError?.data || "An error occurred";
        console.error(errorMessage);
    } finally {
        setLoading(false);
} 
    }

const getUpcomingMatchPrivate = async () => {
    try {
        setLoading(true)
        const res = await client.get(`/user/getMatchAlertUpComing/user`)
        return res?.data.data
    } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage = resError?.message || resError?.data || "An error occured"
        console.error(errorMessage);

    }
    finally {
        setLoading(false)
    }
}
const getResultMatchPrivate = async () => {
    try {
        setLoading(true)
        const res = await client.get(`/user/getMatchAlertResult/user/`)
        return res?.data.data
    } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage = resError?.message || resError?.data || "An error occured"
        console.error(errorMessage);

    }
    finally {
        setLoading(false)
    }
}


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
        submmitClub,
        getClubFollowed,
        unFollowClub,
        getPlayer,
        submitPlayer,
        getPlayerFollowed,
        unFollowPlayer,
        getStrategyItem,
        createStrategies,
        getMyStrategies,
        getMatchAlert,
        getLastMessagesForGroups,
        getLastMessagesForGroupsById,
        saveUserWidget,
        getUserDetails,
        updateUserOnboarding,
        getStrategyById,
        updateStrategies,
        getPlayerById,
        getTeamById,
        getMatchDetail,
        getUpcomingMatch,
        getResultMatch,
        getTodayMatch,
        getNewsEventBySubject,
        getNewsEvent,
        getNewsEventById,
        deleteStrategies,
        getUpcomingMatchPublic,
        getResultMatchPublic,
        getTodayMatchPublic,
        getRegion,
        getCountryRegion,
        getCountryRegionLeague,
        getPlayersByLeague,
        getFantasyPlayerAccount,
        getFantasyPlayerById,
        TransferPlayerIn,
        getFantasySquadPlayers,
        createMatchDay,
        getMatchDay,
        setSquad,
        getMatchDaySquad,
        setFormation,
        substitute,
        getCountryRegionLeagueByIdUpcoming,
        getCountryRegionLeagueByIdLatest,
        getCountryRegionLeagueByIdUpcomingPrivate,
        getCountryRegionLeagueByIdLatestPrivate,
        getUpcomingMatchPrivate,
        getResultMatchPrivate,
    };
}

export default useDashBoardManagement;