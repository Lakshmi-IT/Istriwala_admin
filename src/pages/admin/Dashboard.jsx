import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Revenue",
      value: "₹45,678",
      change: "+8.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "text-warning",
    },
    {
      title: "Growth Rate",
      value: "18.7%",
      change: "+5.4%",
      trend: "up",
      icon: TrendingUp,
      color: "text-primary",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Rajesh Kumar",
      service: "Shirt Ironing (5 pieces)",
      amount: "₹150",
      status: "completed",
      time: "2 hours ago",
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      service: "Full Wardrobe Service",
      amount: "₹450",
      status: "in-progress",
      time: "4 hours ago",
    },
    {
      id: "ORD-003",
      customer: "Amit Singh",
      service: "Suit Pressing",
      amount: "₹200",
      status: "pending",
      time: "6 hours ago",
    },
    {
      id: "ORD-004",
      customer: "Sunita Devi",
      service: "Saree Ironing (3 pieces)",
      amount: "₹180",
      status: "completed",
      time: "1 day ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-text-primary">
            Dashboard
          </h1>
          <p className="text-admin-text-secondary">
            Welcome to your Isthri Wala admin panel
          </p>
        </div>
        <Button className="bg-gradient-primary border-0 shadow-glow">
          <ShoppingCart className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-gradient-surface border-admin-border shadow-md hover:shadow-lg transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-admin-text-secondary">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-admin-text-primary">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-destructive" />
                    )}
                    <span
                      className={`text-xs ${
                        stat.trend === "up" ? "text-success" : "text-destructive"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 bg-gradient-surface border-admin-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-admin-text-primary">Recent Orders</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-admin-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        order.status === "completed"
                          ? "bg-success/10 text-success"
                          : order.status === "in-progress"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-admin-text-secondary"
                      }`}
                    >
                      {order.status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Package className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-admin-text-primary">
                        {order.customer}
                      </p>
                      <p className="text-sm text-admin-text-secondary">
                        {order.service}
                      </p>
                      <p className="text-xs text-admin-text-secondary">
                        {order.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-admin-text-primary">
                      {order.amount}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "completed"
                          ? "bg-success/10 text-success"
                          : order.status === "in-progress"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-admin-text-secondary"
                      }`}
                    >
                      {order.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-surface border-admin-border shadow-md">
          <CardHeader>
            <CardTitle className="text-admin-text-primary">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-primary border-0">
              <Package className="h-4 w-4 mr-2" />
              Create New Order
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add New Customer
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Process Payment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}