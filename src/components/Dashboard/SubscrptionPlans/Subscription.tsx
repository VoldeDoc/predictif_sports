import PlanCard from "@/components/DashboardComponents/planCard";
import { AuthLayout } from "@/components/Layout/layout";
import useDashBoardManagement from "@/hooks/useDashboard";
import { useEffect, useState } from "react";
import { useNavigate,} from "react-router-dom";
// import { toast } from "react-toastify";

export default function SubscriptionPlan() {
    // const { id } = useParams<{ id: string }>();
    interface Plan {
        plan: {
            name: string;
            amount: number;
            en_id: string;
        };
        feature: {
            feature_label: string;
        }[];
    }
    const [plans, setPlans] = useState<Plan[]>([]);
    const { getSubsriptionPlans } = useDashBoardManagement();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const data = await getSubsriptionPlans();
                setPlans(data[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // const handleSubscribeToPlan = async (planId: string) => {
    //     toast.promise(
    //         subsricbeToPlan(planId),
    //         {
    //             pending: "Subscribing to plan...",
    //             success: {
    //                 render({ data }) {
    //                     setIsModalOpen(true);
    //                     return <div>{data as string}</div>;
    //                 },
    //             },
    //             error: {
    //                 render({ data }) {
    //                     return <div>{data as string}</div>;
    //                 },
    //             },
    //         }
    //     );
    // };

    const [selectedTab, setSelectedTab] = useState("monthly");

    const basicPlanData = plans.find(plan => plan.plan.name === "Basic");
    const premiumPlanData = plans.find(plan => plan.plan.name === "upper");
    const advancedPlanData = plans.find(plan => plan.plan.name === "Advanced Plan");

    const basicPlan = basicPlanData ? {
        title: basicPlanData.plan.name,
        price: `£${(basicPlanData.plan.amount).toFixed(2)}`,
        en_key: basicPlanData.plan.en_id,
        features: basicPlanData.feature.map(f => ({
            name: f.feature_label,
            isAvailable: true,
        })),
    } : null;

    const premiumPlan = premiumPlanData ? {
        title: premiumPlanData.plan.name,
        price: `£${(premiumPlanData.plan.amount).toFixed(2)}`,
        en_key: premiumPlanData.plan.en_id,
        features: premiumPlanData.feature.map(f => ({
            name: f.feature_label,
            isAvailable: true,
        })),
    } : null;

    const advancedPlan = advancedPlanData ? {
        title: advancedPlanData.plan.name,
        price: `£${(advancedPlanData.plan.amount).toFixed(2)}`,
        en_key: advancedPlanData.plan.en_id,
        features: advancedPlanData.feature.map(f => ({
            name: f.feature_label,
            isAvailable: true,
        })),
    } : null;

    const availableFeatures = (plan: Plan) => plan.feature.map(f => ({
        name: f.feature_label,
        isAvailable: true,
    }));

    return <AuthLayout>
        {/* payment plan */}
        <div className="container mx-auto pt-9">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    Choose your Plan
                </h1>
                <div className="flex justify-center my-4">
                    <button
                        className={`px-14 py-2 border rounded-l-lg ${selectedTab === "monthly"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setSelectedTab("monthly")}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-4 py-2 border rounded-r-lg ${selectedTab === "yearly"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                            }`}
                        onClick={() => setSelectedTab("yearly")}
                    >
                        Yearly <span className="text-green-400">(save 2.5%)</span>
                    </button>
                </div>
                <h2 className="text-2xl my-2">
                    <span className="text-blue-300">Best Plans For</span> Predictive
                    Sport
                </h2>
            </div>

            {/* Monthly Tab Content */}
            {selectedTab === "monthly" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
                    {basicPlan && (
                        <PlanCard
                            features={availableFeatures(basicPlanData!)}
                            title={basicPlan.title}
                            price={`${parseInt(basicPlan.price.slice(1)).toLocaleString("en-GB", {
                                style: "currency",
                                currency: "GBP",
                              })}`}
                            buttonText="Choose Plan"
                            buttonClass="bg-blue-300"
                            onSubscribe={() => 
                                navigate(`/user/checkout/${basicPlan.en_key}`, {
                                    state: { title: basicPlan.title, amount: parseInt(basicPlan.price.slice(1)),type:"monthly" }
                                }
                                )}
                        />
                    )}
                    {premiumPlan && (
                        <PlanCard
                            features={availableFeatures(premiumPlanData!)}
                            title={premiumPlan.title}
                            price={`${Number(premiumPlan.price.slice(1)).toLocaleString("en-GB", {
                                style: "currency",
                                currency: "GBP",
                              }
                            )}`}
                            buttonText="Choose Plan"
                            buttonClass="bg-blue-300"
                            onSubscribe={() => 
                                navigate(`/user/checkout/${premiumPlan.en_key}`, {
                                    state: { title: premiumPlan.title, amount: parseInt(premiumPlan.price.slice(1)), type:"monthly" }
                                }
                                )
                            }
                        />
                    )}
                    {advancedPlan && (
                        <PlanCard
                            features={availableFeatures(advancedPlanData!)}
                            title={advancedPlan.title}
                            price={`${parseInt(advancedPlan.price.slice(1)).toLocaleString("en-GB", {
                                style: "currency",
                                currency: "GBP",
                              } )
                            }`}
                            buttonText="Choose Plan"
                            buttonClass="bg-blue-300"
                            onSubscribe={() => 
                                navigate(`/user/checkout/${advancedPlan.en_key}`, {
                                    state: { title: advancedPlan.title, amount: parseInt(advancedPlan.price.slice(1)) ,type:"monthly" }
                                }
                            )
                            }
                        />
                    )}
                </div>
            )}

            {/* Yearly Tab Content */}
            {selectedTab === "yearly" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
                    <PlanCard
                        title={basicPlan?.title || ""}
                        price={`${(parseInt(basicPlan?.price.slice(1) || "0") * 12).toLocaleString("en-GB", {
                            style: "currency",
                            currency: "GBP",
                          })
                        }`}
                        features={availableFeatures(basicPlanData!)}
                        buttonText="Choose Plan"
                        buttonClass="bg-blue-300"
                        onSubscribe={() =>
                            navigate(`/user/checkout/${basicPlan?.en_key}`, {
                                state: { title: basicPlan?.title, amount: parseInt(basicPlan!.price.slice(1)) * 12,type:"yearly" },
                            })
                        }
                    />
                    {premiumPlan && (
                        <PlanCard
                            title={premiumPlan.title}
                            price={`${(parseInt(premiumPlan.price.slice(1)) * 12).toLocaleString('en-GB', {
                                style: 'currency',
                                currency: 'GBP',
                            }
                            )}`}
                            features={availableFeatures(premiumPlanData!)}
                            buttonText="Choose Plan"
                            buttonClass="bg-blue-300"
                            onSubscribe={() => navigate(`/user/checkout/${premiumPlan.en_key}`,{
                                state: { title: premiumPlan.title, amount: parseInt(premiumPlan.price.slice(1)) * 12,type:"yearly" }
                            }

                            )}
                        />
                    )}
                    {advancedPlan && (
                        <PlanCard
                            title={advancedPlan.title}
                            price={`£${(parseInt(advancedPlan.price.slice(1)) * 12).toLocaleString('en-GB', {
                                style: 'currency',
                                currency: 'GBP',
                            })
                            }`}
                            features={availableFeatures(advancedPlanData!)}
                            buttonText="Choose Plan"
                            buttonClass="bg-blue-300"
                            onSubscribe={() => navigate(`/user/checkout/${advancedPlan.en_key}`,
                                {state: { title: advancedPlan.title, amount: parseInt(advancedPlan.price.slice(1)) * 12 ,type:"yearly" }}
                            )}
                        />
                    )}
                </div>
            )}
        </div>

       
        
    </AuthLayout >
}