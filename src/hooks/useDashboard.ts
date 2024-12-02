import axiosClient from "@/services/axios-client"
import { SurveyDataValues } from "@/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function useDashBoardManagement() {
    const [loading, setLoading] = useState(false)
    const client = axiosClient()
    const router = useNavigate()
    const surveyQuestions = async (data:SurveyDataValues)=>{
        try{
            setLoading(true)
            const res = await client.post('/user/sportsBettingQuestionnaire',data)
            const questions = res.data.data
            console.log(questions);
            router('/dashboard')
            return Promise.resolve("survey filled successfully!")
        }
        catch(error:any){
            const resError = error.response?.data
            const errorMessage = resError?.message || resError?.data || "An error occurred"
            return Promise.reject(`${errorMessage}`)
        }
        finally{
            setLoading(false)
        }
    }


    return {
        loading,
        surveyQuestions,
    }
}

export default useDashBoardManagement