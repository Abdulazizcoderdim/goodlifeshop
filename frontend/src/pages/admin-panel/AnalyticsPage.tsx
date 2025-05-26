import AIPoweredInsights from "@/components/admin-panel/analytics/AIPoweredInsights";
import ChannelPerformance from "@/components/admin-panel/analytics/ChannelPerformance";
import CustomerSegmentation from "@/components/admin-panel/analytics/CustomerSegmentation";
import OverviewCards from "@/components/admin-panel/analytics/OverviewCards";
import ProductPerformance from "@/components/admin-panel/analytics/ProductPerformance";
import RevenueChart from "@/components/admin-panel/analytics/RevenueChart";
import UserRetention from "@/components/admin-panel/analytics/UserRetention";
import Header from "@/components/admin-panel/common/Header";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title={"Analytics Dashboard"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <OverviewCards />
        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChannelPerformance />
          <ProductPerformance />
          <UserRetention />
          <CustomerSegmentation />
        </div>

        <AIPoweredInsights />
      </main>
    </div>
  );
};
export default AnalyticsPage;
