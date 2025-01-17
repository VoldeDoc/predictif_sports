import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import useDashBoardManagement from "@/hooks/useDashboard";

interface DashboardData {
  matchAlert: any;
  plans: any;
  
}

const DashboardContext = createContext<{ 
  data: DashboardData | null; 
  loading: boolean 
} | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { getMatchAlert, getSubsriptionPlans } = useDashBoardManagement();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data) { 
          const matchAlert = await getMatchAlert();
          const plans = await getSubsriptionPlans();
          setData({ matchAlert, plans });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getMatchAlert, getSubsriptionPlans, data]);

  return (
    <DashboardContext.Provider value={{ data, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardData must be used within a DashboardProvider");
  }
  return context;
};
