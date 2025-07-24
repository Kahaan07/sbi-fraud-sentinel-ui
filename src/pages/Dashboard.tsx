import { Users, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import KPICard from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  // Mock data for charts
  const fraudData = [
    { name: 'Low Risk', value: 65, count: 1300 },
    { name: 'Medium Risk', value: 25, count: 500 },
    { name: 'High Risk', value: 10, count: 200 }
  ];

  const monthlyData = [
    { month: 'Jan', scanned: 1200, flagged: 45 },
    { month: 'Feb', scanned: 1350, flagged: 52 },
    { month: 'Mar', scanned: 1180, flagged: 38 },
    { month: 'Apr', scanned: 1420, flagged: 61 },
    { month: 'May', scanned: 1580, flagged: 73 },
    { month: 'Jun', scanned: 1650, flagged: 68 }
  ];

  const COLORS = ['hsl(var(--sbi-light))', 'hsl(223 50% 70%)', 'hsl(0 84.2% 60.2%)'];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-roboto font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground font-open-sans">Monitor fraud detection activities across all channels</p>
        </div>
        <div className="text-sm text-muted-foreground font-open-sans">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Users Scanned"
          value="8,234"
          icon={<Users className="h-6 w-6 text-primary" />}
          trend={{ value: "+12% from last month", isPositive: true }}
        />
        <KPICard
          title="High Risk Accounts"
          value="127"
          icon={<AlertTriangle className="h-6 w-6 text-destructive" />}
          trend={{ value: "-8% from last month", isPositive: true }}
        />
        <KPICard
          title="Active Investigations"
          value="23"
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
        />
        <KPICard
          title="Last Scan Completed"
          value="2 hrs ago"
          icon={<Clock className="h-6 w-6 text-primary" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-roboto">Fraud Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fraudData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="font-roboto">Monthly Scan Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="scanned" fill="hsl(var(--primary))" name="Users Scanned" />
                <Bar dataKey="flagged" fill="hsl(var(--destructive))" name="Flagged Accounts" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="font-roboto">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "10:30 AM", action: "High-risk account flagged", account: "XXXX-1234", severity: "high" },
              { time: "09:45 AM", action: "Location tracker activated", account: "XXXX-5678", severity: "medium" },
              { time: "09:12 AM", action: "Manual verification completed", account: "XXXX-9012", severity: "low" },
              { time: "08:55 AM", action: "CSV batch processed", account: "500 accounts", severity: "low" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="font-open-sans font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">Account: {activity.account}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.severity === 'high' ? 'bg-destructive' :
                    activity.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;