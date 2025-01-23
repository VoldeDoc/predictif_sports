// import { useState, useEffect } from 'react';
// import Joyride, { Step } from 'react-joyride';

// const useJoyride = (initialSteps: Step[]): {
//   steps: Step[];
//   run: boolean;
//   startTour: () => void;
//   stopTour: () => void;
//   JoyrideComponent: JSX.Element;
// } => {
//   const [steps] = useState<Step[]>(initialSteps);
//   const [run, setRun] = useState(false);

//   const startTour = () => setRun(true);
//   const stopTour = () => {
//     setRun(false);
//     localStorage.setItem('joyrideSeen', 'true');
//   };

//   useEffect(() => {
//     const joyrideSeen = localStorage.getItem('joyrideSeen');
//     if (!joyrideSeen) {
//       startTour();
//     }
//   }, []);

//   return {
//     steps,
//     run,
//     startTour,
//     stopTour,
//     JoyrideComponent: (
//       <Joyride
//         steps={steps}
//         run={run}
//         continuous
//         showSkipButton
//         showProgress
//         callback={(data) => {
//           if (data.status === 'finished' || data.status === 'skipped') {
//             stopTour();
//           }
//         }}
//       />
//     ),
//   };
// };

// export default useJoyride;
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Joyride, { Step } from "react-joyride";
import useDashBoardManagement from "@/hooks/useDashboard";

const useJoyride = (initialSteps: Step[]): {
  steps: Step[];
  run: boolean;
  startTour: () => void;
  stopTour: () => void;
  JoyrideComponent: JSX.Element;
} => {
  const [steps] = useState<Step[]>(initialSteps);
  const [run, setRun] = useState(false);
  const { saveUserWidget, getUserDetails } = useDashBoardManagement();
  const location = useLocation();

  const startTour = () => setRun(true);
  const stopTour = async () => {
    setRun(false);
    await saveUserWidget("seen");
  };

  useEffect(() => {
    const initializeTour = async () => {
      try {
        const response = await getUserDetails();
        const userDetails = response?.[0]; 
        if ((userDetails?.widget_state === null || userDetails?.widget_state !== "seen") && location.pathname !== "/forum") {
          startTour();
        }
      } catch (error) {
        console.error("Error initializing Joyride:", error);
      }
    };

    initializeTour();
  }, [location.pathname]);

  return {
    steps,
    run,
    startTour,
    stopTour,
    JoyrideComponent: (
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        showProgress
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            stopTour();
          }
        }}
      />
    ),
  };
};

export default useJoyride;