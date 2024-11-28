import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apple, google, logo, signin_img } from "../../../public";
import Textinput from "../Ui/Textinput";
import Checkbox from "../Ui/CheckBox";
import { useState } from "react";

import Button from "../Ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/services/axios-client";
import { AppDispatch } from "@/context/store";
import { useDispatch } from "react-redux";
import { setOtpMail, setToken, setUser } from "./store";
import { toast } from "react-toastify";
import Loading from "@/utils/Loading";

// Define the validation schema using yup
const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

// Define the form values interface
interface FormValues {
  email: string;
  password: string;
}

const SigninComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const client = axiosClient();
      const res = await client.post("/auth/login", data);
      const token = res.data.data.token;
      const user = res.data.data.user;
      console.log(user);
      
      dispatch(setToken(token));
      dispatch(setUser(user));
      toast.success(`Login Successful ${user.username}`);
      // Redirect to the dashboard or another page
      router("/dashboard");
    } catch (error: any) {
      const resError = error.response?.data;
      const errorMessage =
        resError?.message || resError?.data || "An error occurred";
      if (resError?.data === "Please verify your email before logging in.") {
        const email = data.email;
        console.log(email);
        dispatch(setOtpMail(email));
        toast.warning(
          "Please verify your email before logging in.\n\n We just sent an OTP to your mail"
        );
        router("/auth/otp-verification");
      } else {
        // Show error message
        toast.error(`${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className=" w-[100%] bg-white  flex justify-start md:items-start items-center">
      <div className=" md:w-1/2 w-full h-[100vh] justify-center md:justify-start flex flex-col items-start md:px-[10%] px-[7%]   gap-5  pt-[5%] ">
        <div>
          <img src={logo} alt="logo" width={200} height={200} />
        </div>
        <div className="space-y-5">
          <h1 className=" font-bold text-xl">Sign in</h1>
          <h5 className=" font-normal text-base">
            If you don’t have an account register
          </h5>
          <div className=" font-normal text-base">
            <span>You can</span>{" "}
            <Link to="/auth/signup">
              <span className=" text-primary font-bold pl-1">
                Register Here
              </span>
            </Link>
          </div>
        </div>
        <form className="w-[100%]  " onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-[100%]   space-y-7">
            <Textinput
              type="email"
              label="Email"
              className="h-10 w-full "
              placeholder="Enter your email"
              register={register}
              name="email"
              msgTooltip
              error={errors.email}
              validate={
                !errors.email && touchedFields.email
                  ? "Yeah!  this look good"
                  : undefined
              }
            />

            <Textinput
              type="password"
              label="Password"
              className="h-10"
              placeholder="Enter your password"
              register={register}
              name="password"
              msgTooltip
              error={errors.password}
              validate={
                !errors.password && touchedFields.password
                  ? " Correct! login to continue"
                  : undefined
              }
              hasIcon
            />
            <div className="flex justify-between items-center">
              <Checkbox
                label="Remenber me"
                value={rememberMe}
                activeClass="ring-primary bg-primary"
                onChange={() => setRememberMe(!rememberMe)}
              />
              <Link to="/auth/forget-password">
                <div className=" text-sm text-gray-500"> Forget Password?</div>
              </Link>
            </div>
          </div>

          <Button
            className=" flex items-center w-full justify-center mx-auto rounded-full mt-5"
            text="Login"
            type="submit"
            isLoading={false}
          />
        </form>
        <div className="flex flex-col justify-center items-center gap-5 mx-auto">
          <div className="text-gray-500"> or continue with</div>
          <div className=" flex items-center gap-4">
            {" "}
            <img src={apple} alt="applw" width={30} height={30} />
            <img src={google} alt="logo" width={30} height={30} />
          </div>
        </div>
      </div>

      <div className=" relative hidden md:flex w-1/2  bg-primary h-[90vh] m-5 rounded-xl px-10 flex-col justify-center items-center">
        {/* <div className=" absolute top-[3%] right-[3%] text-white flex items-center gap-2">
          <span>
            <MdOutlineLocalPhone />
          </span>
          <span>+94 0116 789 754</span>
        </div> */}
        <div className=" object-cover">
          <img src={signin_img} width={500} height={500} alt="side image" />
        </div>

        <div className="space-y-3 px-10 pt-10">
          <div className=" font-bold text-3xl text-white ">
            Place Your Bets with Confidence.
          </div>
          <div className="text-xs text-white ">
            PredictifSports™ empowers you to bet smart and confidently by
            delivering the right information at the right time—before you place
            any bet. With PreMatch Match Alerts, InPlay Match Alerts, over 14
            years of historical stats, and much more!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninComponent;
