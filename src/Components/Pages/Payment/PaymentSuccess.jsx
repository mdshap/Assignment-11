import { useLocation, Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const scholarship = state?.scholarship;
  const amount = state?.amount;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Payment Successful</h1>

        <p className="text-gray-600">
          Your scholarship application payment has been completed successfully.
        </p>

        {scholarship && (
          <div className="bg-gray-100 rounded-xl p-4 text-left space-y-2 text-sm">
            <p>
              <span className="font-medium">Scholarship:</span>{" "}
              {scholarship.scholarshipName}
            </p>

            <p>
              <span className="font-medium">University:</span>{" "}
              {scholarship.universityName}
            </p>

            <p>
              <span className="font-medium">Amount Paid:</span>{" "}
              <span className="text-green-600 font-semibold">${amount}</span>
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500">
          Your application has been successfully submitted. You can track the
          status of your application from your dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/dashboard/my-applications"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition text-center">
            View My Applications
          </Link>

          <Link
            to="/all-scholarships"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition text-center">
            Apply for Another Scholarship
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
