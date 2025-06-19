import { UserCheck, UserPlus, UsersIcon } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/admin-panel/common/Header";
import StatCard from "@/components/admin-panel/common/StatCard";
import UsersTable from "@/components/admin-panel/users/UsersTable";
import UserGrowthChart from "@/components/admin-panel/users/UserGrowthChart";
import UserActivityHeatmap from "@/components/admin-panel/users/UserActivityHeatmap";
import { useEffect, useState } from "react";
import type { IUser } from "@/types";
import api from "@/http/axios";

const UsersPage = () => {
  const [users, setusers] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState({
    number: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState<
    { month: string; users: number }[]
  >([]);

  useEffect(() => {
    fetchUsers(pagination.number);
  }, []);

  const fetchUsers = async (page = 1) => {
    try {
      const res = await api.get(`/users?page=${page}&size=${pagination.size}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setusers(res.data.content);
      setPagination(res.data.pagination);
      processUserGrowthData(res.data.content);
    } catch (error) {
      console.log("Failed to fetch users", error);
    }
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const today = new Date().toISOString().split("T")[0]; // Masalan: "2025-05-28"

  const newUsersToday = users.filter((user) => {
    const userCreatedDate = new Date(user.createdAt)
      .toISOString()
      .split("T")[0];
    return userCreatedDate === today;
  }).length;

  const processUserGrowthData = (usersData: IUser[]) => {
    const monthlyCounts: Record<string, number> = {};

    usersData.forEach((user) => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb" kabi
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });

    const growthArray = Object.keys(monthlyCounts).map((month) => ({
      month,
      users: monthlyCounts[month],
    }));

    const orderedMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    growthArray.sort(
      (a, b) => orderedMonths.indexOf(a.month) - orderedMonths.indexOf(b.month)
    );

    setUserGrowthData(growthArray);
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const userActivityData = weekDays.map((day) => ({
    name: day,
    "0-4": 0,
    "4-8": 0,
    "8-12": 0,
    "12-16": 0,
    "16-20": 0,
    "20-24": 0,
  }));

  users?.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    const dayName = weekDays[createdAt.getUTCDay()];

    const hour = createdAt.getUTCHours();
    let timeRange = "";

    if (hour >= 0 && hour < 4) timeRange = "0-4";
    else if (hour >= 4 && hour < 8) timeRange = "4-8";
    else if (hour >= 8 && hour < 12) timeRange = "8-12";
    else if (hour >= 12 && hour < 16) timeRange = "12-16";
    else if (hour >= 16 && hour < 20) timeRange = "16-20";
    else if (hour >= 20 && hour < 24) timeRange = "20-24";

    const dayIndex = userActivityData.findIndex((d) => d.name === dayName);
    if (dayIndex !== -1 && timeRange) {
      (userActivityData[dayIndex] as unknown as Record<string, number>)[
        timeRange
      ] += 1;
    }
  });

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Всего пользователей"
            icon={UsersIcon}
            value={pagination.totalElements.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="Новые пользователи сегодня"
            icon={UserPlus}
            value={newUsersToday.toLocaleString()}
            color="#10B981"
          />
          <StatCard
            name="Активные пользователи"
            icon={UserCheck}
            value={newUsersToday.toLocaleString()}
            color="#F59E0B"
          />
        </motion.div>

        <UsersTable
          users={users}
          pagination={pagination}
          handlePageChange={handlePageChange}
          setPagination={setPagination}
        />

        {/* USER CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <UserGrowthChart userGrowthData={userGrowthData} />
          <UserActivityHeatmap userActivityData={userActivityData} />
        </div>
      </main>
    </div>
  );
};
export default UsersPage;
