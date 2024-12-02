import  { useEffect, useState } from 'react';
import {ReactTyped} from 'react-typed';

const TypingEffect = () => {
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const totalDelay = 6000; // Total delay for all strings to be typed out
    const interval = setInterval(() => {
      setReset(true);
      setTimeout(() => setReset(false), 100); // Small delay to reset the typing effect
    }, totalDelay);

    return () => clearInterval(interval);
  }, []);

  if (reset) {
    return null; // Return null to clear the typing effect
  }

  return (
    <div>
      <ReactTyped
        strings={["The Hidden Tool Smart"]}
        typeSpeed={40}
        showCursor={false}
        loop={false}
      >
        <h1 className="text-white font-bold sm:text-5xl text-xl"></h1>
      </ReactTyped>
      <ReactTyped
        strings={["Bettors Use to Outsmart"]}
        typeSpeed={60}
        startDelay={2000}
        showCursor={false}
        loop={false}
      >
        <h1 className="text-white font-bold sm:text-5xl text-xl"></h1>
      </ReactTyped>
      <ReactTyped
        strings={["the Bookmakers"]}
        typeSpeed={80}
        startDelay={4000}
        showCursor={false}
        loop={false}
      >
        <h1 className="text-white font-bold sm:text-5xl mb-3 text-xl"></h1>
      </ReactTyped>
    </div>
  );
};

export default TypingEffect;