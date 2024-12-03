import { useState } from "react";
import Question from "./questionnaire/questionStructure";
import { questionnaire } from "./questionnaire/questions";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useDashBoardManagement from "@/hooks/useDashboard";
import { SubmitHandler, useForm } from "react-hook-form";
import { SurveyDataValues } from "@/types";
import { toast } from "react-toastify";
import Loading from "@/utils/Loading";

export default function Survey() {
  const [currentStep, setCurrentStep] = useState(0);
  const { surveyQuestions, loading } = useDashBoardManagement();

  const handlePreviousClick = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Validation Schema
  const schema = yup.object().shape({
    age: yup.string().required("Age is required"),
    geneder: yup.string().required("Gender is required"),
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    knowledge_bet: yup.string().required("Field is required"),
    opinion_bet: yup.string().required("Field is required"),
    legalized_bet: yup.string().required("Field is required"),
    long_involve_bet: yup.string().required("Field is required"),
    sport_bet: yup.array().of(yup.string().required()).required("Field is required"),
    bet_type_prefer: yup.array().of(yup.string().required()).required("Field is required"),
    influences_bet: yup.array().of(yup.string().required()).required(" required"),
    other_bet_tools: yup.string().required(" required"),
    bet_budget_set: yup.string().required("Field is required"),
    amount_wager_bet: yup.string().required("Field is required"),
    participated_bet: yup.string().required("Field is required"),
    often_bet: yup.string().required("Field is required"),
    platform_bet: yup.array().of(yup.string().required()).required("Field is required"),
    motivates_bet: yup.array().of(yup.string().required()).required("Field is required"),
    negative_consequences_bet: yup.string().required(" required"),
    placing_strategies_bet: yup.array().of(yup.string().required()).required(" required"),
    future_plan_bet: yup.string().required(" required"),
    changes_see_sport: yup.array().of(yup.string().required()).required(" required"),
    responsible_gambling_programs: yup.string().required(" required"),
    view_luck_skill_bet: yup.string().required(" required"),
    improvements_sport_bet: yup.string().required(" required"),
    comments_sport_bet: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SurveyDataValues>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleNextClick = async () => {
    const currentStepFields = questionnaire[currentStep].questions.map((question) => question.id.toString() as keyof SurveyDataValues);
    const isValid = await trigger(currentStepFields);

    if (isValid) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, questionnaire.length - 1));
    }
  };

  const onSubmitSurvey: SubmitHandler<SurveyDataValues> = async (data) => {
    toast.promise(surveyQuestions(data), {
      pending: "Submitting...",
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
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="sm:px-16 px-8 py-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row bg-white p-5 md:p-10 rounded-lg shadow-lg">
          {/* Questionnaire Section */}
          <div className="w-full md:w-1/2 p-5">
            <div className="pb-3">
              <h3 className="font-semibold pb-3 text-center md:text-left">Sports Betting Questionnaire</h3>
              <hr className="border border-blue-600 w-56 mx-auto md:mx-0" />
            </div>
            {questionnaire[currentStep] && (
              <div>
                {/* Title */}
                <h2 className="mb-4 font-bold text-2xl text-center md:text-left">{questionnaire[currentStep].title}</h2>
                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmitSurvey)}>
                  {questionnaire[currentStep].questions.map((question) => (
                    <Question
                      key={question.id}
                      label={question.label}
                      id={question.id}
                      type={question.type as "text" | "select" | "multi-select"}
                      options={question.options || []} // Pass undefined if options are not provided
                      placeholder={question.placeholder}
                      register={register}
                      errors={errors}
                    />
                  ))}

                  {/* Navigation Buttons */}
                  <div className="w-full mt-5 flex justify-between">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={handlePreviousClick}
                        className="bg-gray-500 text-white py-2 px-4 rounded"
                      >
                        Previous
                      </button>
                    )}
                    {currentStep < questionnaire.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextClick}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Next
                      </button>
                    ) : (
                      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Illustration Section */}
          <div className="hidden md:flex w-full md:w-1/2 bg-blue-50 h-64 md:h-auto m-5 rounded-xl px-10 flex-col justify-center items-center">
            <div className="object-cover">
              <img
                src="assets/images/dashboard/dashboard/undraw_online_organizer_re_156n 1.svg"
                alt="Illustration"
                width={250}
                height={250}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}