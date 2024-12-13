import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Textinput from "../Ui/Textinput";
import Button from "../Ui/Button";
import { logo } from "../../../public";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";

type ChangePasswordFormValues = {
  new_password: string;
  new_password_confirmation: string;
};

// Define the validation schema using yup
const schema = yup.object().shape({
  new_password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref('new_password'), undefined], 'Passwords must match')
    .required("Password confirmation is required"),
});

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {  otp } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const { new_password, new_password_confirmation } = data;
      await changePassword({  otp, new_password, new_password_confirmation });
      toast.success("Password changed successfully!");
      navigate("/auth/signin");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[100%] bg-white flex justify-start md:items-start items-center">
      <div className="md:w-1/2 w-full h-[100vh] justify-center md:justify-start flex flex-col items-start md:px-[10%] px-[7%] gap-5 pt-[2%]">
        <div className="pt-5">
          <img src={logo} alt="logo" width={300} height={200} />
        </div>
        <div className="space-y-3 pt-[20%]">
          <h1 className="font-bold text-4xl">Change Your Password</h1>
          <h1 className="font-medium text-gray-500 text-base">
            Please enter your new password.
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[100%] space-y-4">
          <Textinput
            type="password"
            label="New Password"
            className="h-16 w-full"
            placeholder="Enter your new password"
            register={register}
            name="new_password"
            error={errors.new_password}
            validate={
              !errors.new_password && touchedFields.new_password
                ? "Correct! password is valid"
                : undefined
            }
          />
          <Textinput
            type="password"
            label="Confirm New Password"
            className="h-16 w-full"
            placeholder="Confirm your new password"
            register={register}
            name="new_password_confirmation"
            error={errors.new_password_confirmation}
            validate={
              !errors.new_password_confirmation && touchedFields.new_password_confirmation
                ? "Passwords match"
                : undefined
            }
          />
          <div className="w-full md:mt-auto mt-5 md:mb-[10%]">
            <Button
              className="flex items-center py-3 w-full justify-center mx-auto rounded-md"
              text="Change Password"
              isLoading={isLoading}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;