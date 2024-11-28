import React from 'react';

interface QuestionProps {
  label: string;
  id: number;
  type: 'text' | 'select';
  options?: string[]; // Only used if type is 'select'
  placeholder?: string; // Only used if type is 'text'
}

const Question: React.FC<QuestionProps> = ({ label, id, type, options, placeholder }) => {
  const [showAdditionalInput, setShowAdditionalInput] = React.useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue.includes('please specify') || selectedValue.includes('describe') || selectedValue.includes('elaborate')) {
      setShowAdditionalInput(true);
    } else {
      setShowAdditionalInput(false);
    }
  };

  return (
    <div>
      <label htmlFor={id.toString()} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === 'text' && (
        <input
          type="text"
          id={id.toString()}
          className="mt-1 block w-full border-[#DBDCDE] shadow-sm bg-[#F4F5F9] p-3 text-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          placeholder={placeholder}
        />
      )}
      {type === 'select' && options && (
        <>
          <select
            id={id.toString()}
            className="mt-1 block w-full border-[#DBDCDE] shadow-sm bg-[#F4F5F9] p-3 text-gray-400"
            onChange={handleSelectChange}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {showAdditionalInput && (
            <input
              type="text"
              id={`${id.toString()}-additional`}
              className="mt-2 block w-full border-[#DBDCDE] shadow-sm bg-[#F4F5F9] p-3 text-gray-400"
              placeholder="Please specify"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Question;