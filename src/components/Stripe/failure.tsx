
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (paymentMethod === "stripe") {
//       if (!stripe || !elements) {
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       if (!clientSecret) {
//         setError("Client secret not available. Please try again.");
//         setLoading(false);
//         return;
//       }

//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) {
//         setError("Card element not found. Please try again.");
//         setLoading(false);
//         return;
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       console.log(error, paymentIntent);

//       if (error) {
//         setError(error.message || "An unknown error occurred. Please try again.");
//         setLoading(false);
//         return;
//       }

//       navigate("/user/payment-success", {
//         state: {
//           title,
//           amount,
//           type,
//           paymentIntentId: paymentIntent.id,
//         },
//       });
//       setSuccess(true);
//       setLoading(false);
//     } else if (paymentMethod === "flutterwave") {
//       // Flutterwave integration logic here
//       setLoading(true);
//       setTimeout(() => {
//         setSuccess(true);
//         setLoading(false);
//       }, 2000); // Simulate Flutterwave success
//     }
//   };

//  const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (paymentMethod === "stripe") {
//       if (!stripe || !elements) {
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       if (!clientSecret) {
//         setError("Client secret not available. Please try again.");
//         setLoading(false);
//         return;
//       }

//       const cardElement = elements.getElement(CardElement);
//       if (!cardElement) {
//         setError("Card element not found. Please try again.");
//         setLoading(false);
//         return;
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       console.log(error, paymentIntent);

//       if (error) {
//         setError(error.message || "An unknown error occurred. Please try again.");
//         setLoading(false);
//         return;
//       }

//       navigate("/user/payment-success", {
//         state: {
//           title,
//           amount,
//           type,
//           paymentIntentId: paymentIntent.id,
//         },
//       });
//       setSuccess(true);
//       setLoading(false);
//     } else if (paymentMethod === "flutterwave") {
//       // Flutterwave integration logic here
//       setLoading(true);
//       setTimeout(() => {
//         setSuccess(true);
//         setLoading(false);
//       }, 2000); // Simulate Flutterwave success
//     }
//   };