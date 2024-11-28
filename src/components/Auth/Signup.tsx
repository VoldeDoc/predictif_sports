import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { logo, signup_img } from "../../../public";
import Textinput from "../Ui/Textinput";
import Checkbox from "../Ui/CheckBox";
import { useState } from "react";
import Button from "../Ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "@/services/axios-client";
import { toast } from "react-toastify";
import Loading from "@/utils/Loading";
import { setOtpMail } from "./store";
import { AppDispatch } from "@/context/store";
import { useDispatch } from "react-redux";

// Define the validation schema using yup
const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Password confirmation is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

// Define the form values interface
interface FormValues {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

const SignupComponent = () => {
  const router = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
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

  // Handler for form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const client = axiosClient();
      setLoading(true);
      const res = await client.post("/auth/register", data);
      const otp = res.data.data.otp;
      dispatch(setOtpMail(data.email));
      toast.success(`this is your otp : ${otp}`);
      router("/auth/otp-verification");
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

      toast.error(`${errorMessage}\n${formattedErrors}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" w-[100%] bg-white  flex justify-start md:items-start items-center">
      <div className=" md:w-1/2 w-full h-[100vh] justify-center md:justify-start flex flex-col items-start md:px-[10%] px-[7%]   gap-5  pt-[2%] ">
        <div>
          <img src={logo} alt="logo" width={200} height={200} />
        </div>
        <div className="space-y-3">
          <h1 className=" font-bold text-xl">Sign up</h1>
          <h5 className=" font-normal text-base">
            If you already have an account register
          </h5>
          <div className=" font-normal text-base">
            <span>You can</span>{" "}
            <Link to="/auth/signin">
              <span className=" text-primary font-bold pl-1">Login here !</span>
            </Link>
          </div>
        </div>
        <form className=" w-[100%]  " onSubmit={handleSubmit(onSubmit)}>
          <div className=" w-[100%]   space-y-4">
            <Textinput
              type="text"
              label="Username"
              className="h-10 w-full "
              placeholder="Enter your Username"
              register={register}
              name="username"
              error={errors.username}
              validate={
                !errors.username && touchedFields.username
                  ? "Yeah!  this look good"
                  : undefined
              }
            />
            <Textinput
              type="email"
              label="Email"
              className="h-10 w-full "
              placeholder="Enter your email"
              register={register}
              name="email"
              error={errors.email}
              validate={
                !errors.email && touchedFields.email
                  ? "Correct! email is valid"
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
              error={errors.password}
              validate={
                !errors.password && touchedFields.password
                  ? "Password looks good"
                  : undefined
              }
              hasIcon
            />
            <Textinput
              type="Confirm Password"
              label="Password"
              className="h-10"
              placeholder="Re-enter your password"
              register={register}
              name="password_confirmation"
              error={errors.password_confirmation}
              validate={
                !errors.password_confirmation &&
                touchedFields.password_confirmation
                  ? "You have re-enter the correct password"
                  : undefined
              }
              hasIcon
            />

            <Checkbox
              label="Privacy Policy"
              value={rememberMe}
              activeClass="ring-primary bg-primary"
              onChange={() => setRememberMe(!rememberMe)}
            />
          </div>

          <Button
            className=" flex items-center my-10 w-full  justify-center mx-auto rounded-full "
            type="submit"
            text="Register"
            isLoading={false}
          />
        </form>
      </div>

      <div className=" relative hidden md:flex w-1/2  bg-primary h-[90vh] m-5 rounded-xl px-10 flex-col justify-center items-center">
        {/* <div className=" absolute top-[3%] right-[3%] text-white flex items-center gap-2">
          <span>
            <MdOutlineLocalPhone />
          </span>
          <span>+94 0116 789 754</span>
        </div> */}
        <div className=" object-cover">
          <img src={signup_img} width={500} height={500} alt="side image" />
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

export default SignupComponent;
