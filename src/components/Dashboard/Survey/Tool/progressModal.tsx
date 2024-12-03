import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const router = useNavigate();

  useEffect(() => {
    const stages = [
      { label: 'Fetching results...', duration: 2000 },
      { label: 'Preparing dashboard...', duration: 2000 },
      { label: 'Almost set...', duration: 2000 },
      { label: 'Complete!', duration: 2000 },
    ];

    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 25;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        if (stage < stages.length - 1) {
          setStage(stage + 1);
          setProgress(0);
        } else {
          setTimeout(() => {
            router('/dashboard'); 
          }, 2000);
        }
      }
    }, stages[stage].duration / 4);

    return () => clearInterval(interval);
  }, [stage, router]);

  const stages = [
    { label: 'Fetching results...', duration: 2000 },
    { label: 'Preparing dashboard...', duration: 2000 },
    { label: 'Almost set...', duration: 2000 },
    { label: 'Complete!', duration: 2000 },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Analyzing Data</h2>
        <div className="mb-6">
          <p className="text-center mb-2">{stages[stage].label}</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;