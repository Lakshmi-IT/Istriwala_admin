import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "Rajesh Kumar",
      phone: "+91 98765 43210",
      service: "Shirt Ironing",
      items: 5,
      amount: "₹150",
      status: "completed",
      date: "2024-01-15",
      address: "123 Main Street, Delhi",
    },
    {
      id: "ORD-002",
      customer: "Priya Sharma",
      phone: "+91 87654 32109",
      service: "Full Wardrobe Service",
      items: 15,
      amount: "₹450",
      status: "in-progress",
      date: "2024-01-14",
      address: "456 Park Avenue, Mumbai",
    },
    {
      id: "ORD-003",
      customer: "Amit Singh",
      phone: "+91 76543 21098",
      service: "Suit Pressing",
      items: 2,
      amount: "₹200",
      status: "pending",
      date: "2024-01-13",
      address: "789 Garden Road, Bangalore",
    },
    {
      id: "ORD-004",
      customer: "Sunita Devi",
      phone: "+91 65432 10987",
      service: "Saree Ironing",
      items: 3,
      amount: "₹180",
      status: "completed",
      date: "2024-01-12",
      address: "321 Temple Street, Chennai",
    },
    {
      id: "ORD-005",
      customer: "Mohammad Ali",
      phone: "+91 54321 09876",
      service: "Kurta Pressing",
      items: 4,
      amount: "₹120",
      status: "cancelled",
      date: "2024-01-11",
      address: "654 Market Road, Hyderabad",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <Package className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-text-primary">Orders</h1>
          <p className="text-admin-text-secondary">
            Manage all your ironing service orders
          </p>
        </div>
        <Button className="bg-gradient-primary border-0 shadow-glow">
          <Package className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-surface border-admin-border shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-admin-text-secondary" />
              <Input
                placeholder="Search orders, customers, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-gradient-surface border-admin-border shadow-md">
        <CardHeader>
          <CardTitle className="text-admin-text-primary">
            Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-admin-text-primary">
                          {order.customer}
                        </p>
                        <p className="text-sm text-admin-text-secondary">
                          {order.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.service}</p>
                        <p className="text-sm text-admin-text-secondary">
                          {order.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-muted rounded-md text-sm">
                        {order.items} items
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(order.status)}
                        {order.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-admin-text-secondary">
                      {order.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}