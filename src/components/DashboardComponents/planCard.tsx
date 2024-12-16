import React from 'react';
import FeaturesList from './FeaturesList'; // Adjust the import path as needed

interface PlanCardProps {
  title: string;
  price: string;
  features: { name: string; isAvailable?: boolean }[];
  buttonText: string;
  buttonClass: string;
  cardClass?: string;
  onSubscribe: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, features, buttonText, buttonClass, cardClass, onSubscribe }) => {
  return (
    <div className={`border-2 rounded-lg p-6 ${cardClass}`}>
      <button className="px-4 py-2 border-2 rounded-lg font-bold text-xl mb-3">
        {title}
      </button>
      <h1 className="text-4xl font-bold mb-2">{price}</h1>
      <p className="mb-3">User/Month</p>
      <FeaturesList features={features} />
      <button className={`mt-4 px-4 py-2 border-2 rounded-lg text-md ${buttonClass}`} onClick={onSubscribe}>
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;