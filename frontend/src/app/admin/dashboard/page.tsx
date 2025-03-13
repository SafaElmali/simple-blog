"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardStatsQuery } from "@/queries/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

// Generate last 7 days of sample data if viewsOverTime is empty
const generateSampleData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 20) + 1 // Random number between 1-20
    });
  }
  return data;
};

const DashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStatsQuery();
  const { theme } = useTheme();

  // Process and prepare chart data
  const processChartData = () => {
    // Use sample data if viewsOverTime is empty or has only one item
    if (!stats?.viewsOverTime || !stats.viewsOverTime.length || stats.viewsOverTime.length <= 1) {
      return generateSampleData();
    }

    // Map actual data with proper date formatting
    return stats.viewsOverTime.map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      views: item.views
    }));
  };

  const chartData = processChartData();

  // Define chart colors based on theme
  const chartColors = {
    text: theme === 'dark' ? '#A1A1AA' : '#71717A',
    line: theme === 'dark' ? '#0EA5E9' : '#0284C7',
    grid: theme === 'dark' ? '#27272A' : '#E4E4E7',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Debug log to check chart data structure
  console.log("Chart data:", chartData);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your blog statistics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>Number of published posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalPosts || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
            <CardDescription>Across all posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalViews || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Views Over Time</CardTitle>
            <CardDescription>
              {stats?.viewsOverTime && stats.viewsOverTime.length > 1
                ? "Post views in the last 30 days"
                : "Sample data - No views recorded yet"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis 
                  dataKey="date" 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                  allowDuplicatedCategory={false}
                />
                <YAxis 
                  stroke={chartColors.text}
                  tick={{ fill: chartColors.text }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#27272A' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke={chartColors.line}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1, fill: chartColors.line }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: chartColors.line }}
                  isAnimationActive={true}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Posts</CardTitle>
            <CardDescription>Most viewed posts</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] overflow-auto">
            {stats?.popularPosts && stats.popularPosts.length > 0 ? (
              <div className="space-y-4">
                {stats.popularPosts.map((post) => (
                  <div
                    key={post._id}
                    className="flex items-center justify-between"
                  >
                    <a 
                      href={`/${post.slug}`} 
                      className="hover:underline truncate mr-4"
                    >
                      {post.title}
                    </a>
                    <span className="text-muted-foreground whitespace-nowrap">
                      {post.views} views
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No popular posts yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
