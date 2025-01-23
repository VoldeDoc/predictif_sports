import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "@stripe/stripe-js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "@/services/axios-client";
import { LuRefreshCw } from "react-icons/lu";
import useDashBoardManagement from "@/hooks/useDashboard";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { subsricbeToPlan, updateUserOnboarding } = useDashBoardManagement();

  const { title, amount, type }: {
    title: string;
    amount: number;
    type: string;
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [token, setToken] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token") || "null"));
  }, []);

  useEffect(() => {
    if (!amount || !token) {
      return;
    }
    fetch(`${baseUrl}/payment/stripe-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error('Error: clientSecret not found in response', data);
          setError('Failed to initialize payment. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Error fetching clientSecret:', err);
        setError('Failed to initialize payment. Please try again.');
      });
  }, [amount, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        return;
      }

      setLoading(true);
      setError(null);

      if (!clientSecret) {
        setError("Client secret not available. Please try again.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card element not found. Please try again.");
        setLoading(false);
        return;
      }

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message || "An error occurred while confirming the card payment.");
        setLoading(false);
        return;
      }

      try {
        const stripeConfirmResponse = await fetch(`${baseUrl}/payment/stripe-payment-confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reference: paymentIntent.id,
            subscription_id: id,
          }),
        });

        // Check the response status
        console.log("Stripe Confirm Response Status:", stripeConfirmResponse.status);

        if (!stripeConfirmResponse.ok) {
          // Log error and throw if the response is not OK
          const errorResponse = await stripeConfirmResponse.json();
          console.error("Error Response Data:", errorResponse);
          throw new Error(errorResponse.message || "Failed to confirm payment with Stripe.");
        }

        // Parse and log the expected JSON response
        const confirmResponseData = await stripeConfirmResponse.json();
        console.log("Stripe Confirm Response Data:", confirmResponseData);

        if (!confirmResponseData.reference || !confirmResponseData.sub_id) {
          throw new Error("Invalid response format: Expected 'reference' and 'sub_id'.");
        }

        console.log(`Payment confirmed. Reference: ${confirmResponseData.reference}, Subscription ID: ${confirmResponseData.sub_id}`);

        if (!id) {
          throw new Error("Plan ID is not defined.");
        }
        const subscriptionData = await subsricbeToPlan(id);

        if (!subscriptionData) {
          throw new Error("Failed to subscribe to the plan.");
        }

        console.log("Subscription Data:", subscriptionData);

        // Update user onboarding status
        const onboardingResponse = await updateUserOnboarding('completed');
        console.log("Onboarding Update Response:", onboardingResponse);

        navigate("/user/payment-success", {
          state: {
            title,
            amount,
            type,
            paymentIntentId: paymentIntent.id,
            subscriptionDetails: subscriptionData,
            reference: confirmResponseData.reference,
            sub_id: confirmResponseData.sub_id,
          },
        });

        setSuccess(true);
      } catch (err: any) {
        console.error("Error during payment processing:", err);
        setError(err.message || "An unknown error occurred while processing your payment.");
      } finally {
        setLoading(false);
      }
    } else if (paymentMethod === "paystack") {
      setLoading(true);
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-gray-500 to-red-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Subscribe Now</h2>
        {title && <p className="text-lg font-medium text-gray-700">Plan: {title}</p>}
        <p className="text-lg font-medium text-gray-700">Type : {type} </p>
        {amount && <p className="text-lg font-medium text-gray-700 mb-6">Price: {amount.toLocaleString("en-GB", { style: "currency", currency: "GBP" })}</p>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success ? (
          <div className="text-green-500 font-bold">
            Payment Successful! Thank you for subscribing.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Payment Method
              </label>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  Pay with Stripe
                </label>
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paystack"
                    checked={paymentMethod === "paystack"}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  Pay with Paystack
                </label>
              </div>
            </div>

            {!clientSecret && !error && (
              <div className="text-red-500 mb-4">
                <LuRefreshCw className="inline-block mr-2 animate-spin" />
                Initializing payment...</div>)}

            {paymentMethod === "stripe" && clientSecret && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Details
                </label>
                <div className="border rounded-lg p-2">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !clientSecret}
              className={`w-full py-2 px-4 rounded-lg text-white font-semibold text-center transition duration-150 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
                }`}
            >
              {loading ? "Processing..." : `Pay with ${paymentMethod === "stripe" ? "Stripe" : "Paystack"}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;