import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface PaystackCheckoutPageProps {
  name: string;
  email: string;
  amount: number;
  callback_url: { success: string; failed: string };
}

export default async function PaystackCheckoutPage({
  name,
  email,
  amount,
  callback_url,
}: PaystackCheckoutPageProps): Promise<string | null> {
  const data = JSON.stringify({
    email: email,
    amount: amount * 100,
    callback_url: callback_url.success,
    metadata: {
      cancel_action: callback_url.failed,
      custom_fields: [
        {
          display_name: name,
        },
      ],
    },
  });

  const config = {
    method: "post",
    url: "https://api.paystack.co/transaction/initialize",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    const link = response.data.data.authorization_url;
    return link;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function PaystackVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const config = {
        method: "get",
        url: `https://api.paystack.co/transaction/verify/${searchParams.get("reference")}`,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
        },
      };

      try {
        const response = await axios(config);
        console.log('This is response' + response.data.data.reference);
        if (response.data.data.status === "success") {
          navigate("/paystack-success", {
            state: {
              title: response.data.data.metadata.custom_fields[0].display_name,
              amount: response.data.data.amount / 100,
              type: "Subscription",
              reference: response.data.data.reference,
            },
          });
        } else {
          toast.error("Payment failed. Please try again.");
          navigate("/checkout");
        }
      } catch (error) {
        console.log(error);
        toast.error("Payment verification failed. Please try again.");
        navigate("/checkout");
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);
}