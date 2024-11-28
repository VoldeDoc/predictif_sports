import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/context/store/rootReducer';
import { AuthLayout } from '@/components/Layout/layout';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { BsCalendar2Date } from 'react-icons/bs';
import Question from './questionnaire/questionStructure'; // Adjust the import path as necessary
import { questionnaire } from './questionnaire/questions';  // Adjust the import path as necessary

const PredictivoCopier = () => {
  const userdata = useSelector((state: RootState) => state.auth?.user);
  const username = userdata?.username;
  const timeZone = 'Africa/Lagos';
  const getGreeting = (timeZone: string) => {
    const now = moment().tz(timeZone);
    const hour = now.hour();

    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const today = new Date();
  const fiveDaysAhead = new Date();
  fiveDaysAhead.setDate(today.getDate() + 5);

  const formatDateRange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (!start || !end) return 'Select a date range';

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };

    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const [dateRange, setDateRange] = useState<[Date, Date]>([today, fiveDaysAhead]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleDateChange = (dates: Date[]) => {
    if (dates.length === 2) {
      setDateRange([dates[0], dates[1]]);
    }
  };

  const handleNextClick = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousClick = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <AuthLayout>
      <>
        <div className="px-8 sm:px-16">
          <div className="flex md:flex-row gap-5 md:gap-0 flex-col justify-between mb-5">
            <div className="space-y-2">
              <div className="font-bold text-base sm:text-xl">{`${getGreeting(timeZone)}, ${username}`}</div>
              <p className="whitespace-normal break-words text-xs sm:text-base text-gray-700">
                {dateRange[0] && dateRange[1]
                  ? `Here is your Predictivo report from ${formatDateRange(dateRange)}.`
                  : 'Select a date range.'}
              </p>
            </div>
            <div className="bg-white h-fit py-4 cursor-pointer scale-90 hover:scale-100 flex items-center justify-center px-3 md:w-fit shadow-lg">
              <Flatpickr
                className="outline-none cursor-pointer"
                options={{
                  mode: 'range',
                  dateFormat: 'M j', // Short month format
                  disableMobile: false,
                }}
                value={dateRange}
                onChange={handleDateChange}
              />
              <BsCalendar2Date />
            </div>
          </div>
        </div>

        <div className="px-8 sm:px-16 bg-white min-h-screen">
          <div className="flex flex-col md:flex-row p-6">
            {/* Form Section */}
            <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
              {questionnaire[currentStep] && (
                <>
                  <h2 className="text-lg font-bold mb-4">{questionnaire[currentStep].title}</h2>
                  <form className="space-y-4">
                    {questionnaire[currentStep].questions.map((question) => (
                      <Question
                        key={question.id}
                        label={question.label}
                        id={question.id}
                        type={question.type as 'text' | 'select'}
                        options={question.options}
                        placeholder={question.placeholder}
                      />
                    ))}
                  </form>
                </>
              )}
              <div className="flex justify-between mt-4">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handlePreviousClick}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Previous
                  </button>
                )}
                {currentStep < questionnaire.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Next
                  </button>
                )}
                {currentStep === questionnaire.length - 1 && (
                  <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Submit
                  </button>
                )}
              </div>
            </div>

            {/* Illustration Section */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-50">
              <div className="relative bg-white p-6 rounded-lg shadow-md h-full flex items-center justify-center">
                <img
                  src="assets/images/dashboard/dashboard/undraw_online_organizer_re_156n 1.svg"
                  alt="Illustration"
                  className="max-w-xs mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </AuthLayout>
  );
};

export default PredictivoCopier;