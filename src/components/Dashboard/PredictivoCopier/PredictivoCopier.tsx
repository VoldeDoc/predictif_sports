import   { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/context/store/rootReducer';
import { AuthLayout } from '@/components/Layout/layout';
import moment from 'moment';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/airbnb.css';
import { BsCalendar2Date } from 'react-icons/bs';


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

  const handleDateChange = (dates: Date[]) => {
    if (dates.length === 2) {
      setDateRange([dates[0], dates[1]]);
    }
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

      
      </>
    </AuthLayout>
  );
};

export default PredictivoCopier;