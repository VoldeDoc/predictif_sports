import { setOtpMail, setToken, setUser } from "@/components/Auth/store";
import { AppDispatch } from "@/context/store";
import axiosClient from "@/services/axios-client";
import { ChangePassswordDataValues, EmailForgetPasswordDataValues, ForgetPassswordDataValues, LoginDataValues, SignUpDataValues } from "@/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const client = axiosClient();

const signInFunction = async (data: LoginDataValues) => {
    try {
        setLoading(true);
        const res = await client.post("/login", data);
        const token = res.data.data.token;
      const user = res.data.data.user;
        console.log(user);
  
        dispatch(setToken(token));
        dispatch(setUser(user));
        // Redirect to the dashboard or another page
        router("/dashboard");
        return Promise.resolve(`Login Successful ${user.username}`);
      } catch (error: any) {
        const resError = error.response?.data;
        const errorMessage =
          resError?.message || resError?.data || "An error occurred";
        if (resError?.data === "Please verify your email before logging in.") {
          const email = data.email;
          console.log(email);
          dispatch(setOtpMail(email));
          router("/auth/otp-verification");
          return Promise.reject(
            "Please verify your email before logging in.\n\n We just sent an OTP to your mail"
          );
        } else {
          return Promise.reject(`${errorMessage}`);
        }
      } finally {
        setLoading(false);
      }
}


const signUpFunction = async (data: SignUpDataValues) => {
  try {
    setLoading(true);
    const res = await client.post("/register", data);
    const otp = res.data.data.otp;
    console.log(otp);
    dispatch(setOtpMail(data.email));
    router("/auth/otp-verification");
    return Promise.resolve(`this is your otp `);
  } catch (error: any) {
    const resError = error.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    const errors: Record<string, string[]> | undefined = resError?.errors;
    let formattedErrors = "";
    if (errors) {
      formattedErrors = Object.values(errors)
        .flat()
        .map((error: unknown) => `• ${String(error)}`)
        .join("\n");
    }

    return Promise.resolve(`${errorMessage}\n${formattedErrors}`);
  } finally {
    setLoading(false);
  }
}

const Logout = async () => {
  try {
    setLoading(true);
    await client.post("/logout");
    dispatch(setToken(""));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    router("/auth/signin");
    return Promise.resolve("Logged out successfully");
  } catch (error: any) {
    const resError = error.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    return Promise.reject(`${errorMessage}`);
  }
  finally{
    setLoading(false);
  }
 
}

const forgetPasswordSendOtpMail = async (data:EmailForgetPasswordDataValues) => {
  try {
    setLoading(true);
    const res = await client.post('/resendOtp', data);
    const message = res.data.message;
    dispatch(setOtpMail(data.email));
    router("/auth/otp-forgetpwd")
    return Promise.resolve(message);
  } catch (error: any) {
    const resError = error.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    return Promise.reject(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

const changePasswordSendOtpMail = async (data:EmailForgetPasswordDataValues) => {
  try {
    setLoading(true);
    const res = await client.post('/resendOtp', data);
    const message = res.data.message;
    dispatch(setOtpMail(data.email));
    router("/auth/otp-changepwd")
    return Promise.resolve(message);
  } catch (error: any) {
    const resError = error.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    return Promise.reject(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

const forgetPassword = async (data:ForgetPassswordDataValues) => {
  try {
    setLoading(true)
    const respone =  await client.post("/resetForgetPassword",data)
    const message =  respone.data.message;
    router("/auth/signin")
    return Promise.resolve(message)
  }  catch (error: any) {
    const resError = error.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    console.error(errorMessage)
    return Promise.reject(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

const changePassword = async (data:ChangePassswordDataValues) => {
  try {
    setLoading(true)
    const respone =  await client.post("/resetPassword",data)
    const message =  respone.data.message;
    router("/auth/signin")
    return Promise.resolve(message)
  }  catch (error: any) {
    const resError = error.response?.data;
    const errorMessage = resError?.message || "An error occurred";
    console.error(errorMessage)
    return Promise.reject(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

    return  {
        loading,
        signInFunction,
        signUpFunction,
        Logout,
        forgetPasswordSendOtpMail,
        forgetPassword,
        changePasswordSendOtpMail,
        changePassword,
    }

}

export default useAuth