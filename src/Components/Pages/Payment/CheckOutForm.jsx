import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import axiosProvider from "../../../API/axiosProvider";
import { AuthContext } from "../../../Authentication/AuthContext";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { userFromDb } = use(AuthContext);
  const scholarship = state?.scholarship;

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No scholarship data found. Please go back and apply again.
        </p>
      </div>
    );
  }

  const applicationFees = Number(scholarship.applicationFees || 0);
  const serviceCharge = Number(scholarship.serviceCharge || 0);
  const subtotal = applicationFees + serviceCharge;

  useEffect(() => {
    if (subtotal <= 0) return;
    axiosProvider
      .post("/create-payment-intent", { amount: subtotal })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [subtotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      await axiosProvider.post("/applications", {
        scholarshipId: scholarship._id,

        userId: userFromDb._id,
        userName: userFromDb.name,
        userEmail: userFromDb.email,

        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        degree: scholarship.degree,

        applicationFees,
        serviceCharge,

        paymentStatus: "paid",
      });

      setLoading(false);
      navigate("/payment-success", {
        state: {
          scholarship,
          amount: subtotal,
        },
      });
    }
  };

  if (!scholarship) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT – SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <img
            src={scholarship.universityImage}
            alt={scholarship.scholarshipName}
            className="w-full h-56 object-cover rounded-lg"
          />

          <div>
            <h2 className="text-2xl font-bold">
              {scholarship.scholarshipName}
            </h2>

            <p className="text-gray-600 mt-1">
              {scholarship.universityName}{" "}
              <span className="text-pink-500">
                (Rank: {scholarship.universityWorldRank})
              </span>
            </p>

            <p className="text-sm text-gray-500">
              {scholarship.universityCity}, {scholarship.universityCountry}
            </p>
          </div>

          <div className="border-t pt-4 text-sm space-y-2">
            <p>
              <span className="font-medium">Deadline:</span>{" "}
              <span className="text-red-600">
                {scholarship.applicationDeadline}
              </span>
            </p>
            <p>
              <span className="font-medium">Coverage:</span>{" "}
              <span className="text-green-600">Full Fund</span>
            </p>
          </div>
        </div>

        {/* RIGHT – PAYMENT */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-xl font-semibold">Payment Details</h2>

          {/* FEES BREAKDOWN */}
          <div className="rounded-lg p-4 bg-linear-to-r from-green-100 to-emerald-100 text-green-800 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Application Fee</span>
              <span>${applicationFees}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Service Charge</span>
              <span>${serviceCharge}</span>
            </div>

            <div className="border-t border-green-300 pt-2 flex justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium mb-2">Card Information</p>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#374151",
                      "::placeholder": {
                        color: "#9CA3AF",
                      },
                    },
                  },
                }}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition">
              {loading ? "Processing Payment..." : "Pay & Apply"}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
