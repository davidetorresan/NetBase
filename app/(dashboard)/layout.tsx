import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SubscriptionProvider } from "@/components/subscription-provider";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SubscriptionProvider>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
          <Sidebar isPro={true} apiLimitCount={0} />
        </div>
        <main className="md:pl-72 pb-10">
          <Navbar />
          {children}
        </main>
      </div>
    </SubscriptionProvider>
  );
};

export default DashboardLayout;
