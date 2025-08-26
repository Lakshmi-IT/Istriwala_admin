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
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  DollarSign,
} from "lucide-react";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const paymentStats = [
    {
      title: "Total Revenue",
      value: "₹1,24,567",
      change: "+12.5%",
      icon: DollarSign,
    },
    {
      title: "Pending Payments",
      value: "₹8,450",
      change: "-3.2%",
      icon: Clock,
    },
    {
      title: "Completed Today",
      value: "₹5,670",
      change: "+8.7%",
      icon: CheckCircle,
    },
  ];

  const payments = [
    {
      id: "PAY-001",
      orderId: "ORD-001",
      customer: "Rajesh Kumar",
      amount: "₹150",
      method: "UPI",
      status: "completed",
      date: "2024-01-15",
      time: "14:30",
      transactionId: "TXN789123456",
    },
    {
      id: "PAY-002",
      orderId: "ORD-002",
      customer: "Priya Sharma",
      amount: "₹450",
      method: "Credit Card",
      status: "pending",
      date: "2024-01-14",
      time: "16:45",
      transactionId: "TXN789123457",
    },
    {
      id: "PAY-003",
      orderId: "ORD-003",
      customer: "Amit Singh",
      amount: "₹200",
      method: "Cash",
      status: "completed",
      date: "2024-01-13",
      time: "11:20",
      transactionId: "CASH001",
    },
    {
      id: "PAY-004",
      orderId: "ORD-004",
      customer: "Sunita Devi",
      amount: "₹180",
      method: "UPI",
      status: "completed",
      date: "2024-01-12",
      time: "09:15",
      transactionId: "TXN789123458",
    },
    {
      id: "PAY-005",
      orderId: "ORD-005",
      customer: "Mohammad Ali",
      amount: "₹120",
      method: "Debit Card",
      status: "failed",
      date: "2024-01-11",
      time: "13:30",
      transactionId: "TXN789123459",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "failed":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "UPI":
        return "bg-success/10 text-success";
      case "Credit Card":
        return "bg-primary/10 text-primary";
      case "Debit Card":
        return "bg-warning/10 text-warning";
      case "Cash":
        return "bg-muted text-admin-text-secondary";
      default:
        return "bg-muted text-admin-text-secondary";
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-text-primary">Payments</h1>
          <p className="text-admin-text-secondary">
            Track and manage all payment transactions
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentStats.map((stat) => (
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
                    <ArrowUpRight className={`h-3 w-3 ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`} />
                    <span
                      className={`text-xs ${
                        stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-gradient-surface border-admin-border shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-admin-text-secondary" />
              <Input
                placeholder="Search payments, orders, or customers..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="bg-gradient-surface border-admin-border shadow-md">
        <CardHeader>
          <CardTitle className="text-admin-text-primary">
            Payment Transactions ({filteredPayments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                        {payment.orderId}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-admin-text-primary">
                      {payment.customer}
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      {payment.amount}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-sm ${getMethodColor(payment.method)}`}>
                        {payment.method}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(payment.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-admin-text-secondary">
                        <p>{payment.date}</p>
                        <p className="text-xs">{payment.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {payment.transactionId}
                      </code>
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