import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FaCheckCircle } from "react-icons/fa";
import useDashBoardManagement from "@/hooks/useDashboard";
import { RootState } from "@/context/store/rootReducer";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUserOnboarding } = useDashBoardManagement();
  const { title, amount, type, paymentIntentId } = location.state || {};
  const userdata = useSelector((state: RootState) => state.auth?.user);
  const UserId = userdata?.id;
  // Generate the current date and time
  const paymentDateTime = new Date().toLocaleString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Generate PDF
  const downloadAsPDF = async () => {
    const content = document.getElementById("payment-details");
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Adjust for the A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("payment-receipt.pdf");
    }
  };

  // Generate Image
  const downloadAsImage = async () => {
    const content = document.getElementById("payment-details");
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "payment-receipt.png";
      link.click();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-green-50">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        {/* Success Icon */}
        <div className="flex justify-center items-center mb-6">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-green-600">
          Payment Successful!
        </h2>
        <p className="text-gray-700 text-center mt-2">
          Thank you for your payment. Your subscription is now active.
        </p>

        {/* Payment Details */}
        <div
          id="payment-details"
          className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
        >
          {/* Logo */}
          <div className="flex justify-center items-center mb-4">
            <img
              src="/assets/images/logo.png"
              alt="Company Logo"
              className="h-16 w-auto"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Receipt for Subscription Package
          </h3>
          <div className="text-sm text-gray-700">
            <p className="flex justify-between">
              <span className="font-medium">Plan:</span>
              <span>{title}</span>
            </p>
            <p className="flex justify-between mt-2">
              <span className="font-medium">Type:</span>
              <span>{type}</span>
            </p>
            <p className="flex justify-between mt-2">
              <span className="font-medium">Amount Paid:</span>
              <span>
                {amount.toLocaleString("en-GB", {
                  style: "currency",
                  currency: "GBP",
                })}
              </span>
            </p>
            <p className="flex justify-between mt-2">
              <span className="font-medium">Payment ID:</span>
              <span>{paymentIntentId}</span>
            </p>
            <p className="flex justify-between mt-2">
              <span className="font-medium">Date & Time:</span>
              <span>{paymentDateTime}</span>
            </p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex mt-6 space-x-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition duration-150"
            onClick={downloadAsPDF}
          >
            Download as PDF
          </button>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition duration-150"
            onClick={downloadAsImage}
          >
            Download as Image
          </button>
        </div>

        {/* Redirect Button */}
        <button
          className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium transition duration-150"
          onClick={() => {
            updateUserOnboarding("strategy");
            navigate(`/user/follow-team/${UserId}`);
          }}
        >
          Click to continue 
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
