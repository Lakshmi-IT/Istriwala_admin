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
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/url";

export default function Dashboard() {

  const [ordersData, setordersData] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [role, setRole] = useState("");
  const [name, setName] = useState("")
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedname = localStorage.getItem("name");
    setRole(storedRole);
    setName(storedname);
  }, []);


  const totalRevenue = ordersData.reduce((sum, item) => {
    return sum + Number(item.amount?.toString().replace(/[₹,]/g, "") || 0);
  }, 0);


  const stats = [
    {
      title: "Total Orders",
      value: ordersData?.length,
      trend: "up",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Revenue",
      value: totalRevenue,
      icon: IndianRupee,
      color: "text-success",
    },
    // Only include Active Users for non-employees
    ...(role !== "employee"
      ? [
        {
          title: "Active Users",
          value: allUsers?.length,
          icon: Users,
          color: "text-warning",
        },
      ]
      : []),
  ];




  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}api/user/getAllUsersWithOrders`, {
          // headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setAllUsers(res.data.users);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && role === "employee") return;

    const fetchOrders = async () => {
      try {
        const url =
          role === "employee"
            ? `${BASE_URL}api/orders/employee/orders`
            : `${BASE_URL}api/orders/getAllOrders`;

        const res = await axios.get(url, {
          headers: role === "employee" ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data.success) {
          const payments = res.data.orders.map((order) => ({
            id: order?.id || "ORD-000",
            customer: order?.customer || "N/A",
            amount: order?.amount || "₹0",
            method: order?.method || order?.paymentMethod || "RAZORPAY",
            status: order?.status || "pending",
            date: order?.date || "N/A",
            service: order?.service || "N/A",
            time: order?.date,
            transactionId: order?.paymentId || "N/A",
          }));

          setordersData(payments);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };

    fetchOrders();
  }, [role]);







  console.log(ordersData, "ordersData")


  return (
    <div className="space-y-6 lg:mb-0 mb-10">
      <div className="flex items-center justify-between">
        <div>

          {role === "employee" ? (
            <h1 className="text-3xl font-bold text-admin-text-primary">
              Hello {name?.charAt(0)?.toUpperCase() + name?.slice(1)} {" "}
              Welcome to Dashboard!
            </h1>

          ) : (
            <h1 className="text-3xl font-bold text-admin-text-primary">
              Welcome to Dashboard!
            </h1>

          )}

          <p className="text-admin-text-secondary">
            Welcome to your ISTRIWALA admin panel
          </p>
        </div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {ordersData?.slice(0, 4)?.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-admin-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${order.status === "completed"
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
                      className={`text-xs px-2 py-1 rounded-full ${order.status === "completed"
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
        {/* <Card className="bg-gradient-surface border-admin-border shadow-md">
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
        </Card> */}
      </div>
    </div>
  );
}