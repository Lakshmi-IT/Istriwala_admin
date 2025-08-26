import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  UserPlus,
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  Users as UsersIcon,
  Star,
} from "lucide-react";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const userStats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+5.2%",
      icon: UsersIcon,
    },
    {
      title: "Active Users",
      value: "987",
      change: "+8.1%",
      icon: UsersIcon,
    },
    {
      title: "New This Month",
      value: "156",
      change: "+12.3%",
      icon: UserPlus,
    },
  ];

  const users = [
    {
      id: "USR-001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210",
      address: "123 Main Street, Delhi",
      totalOrders: 15,
      totalSpent: "₹2,450",
      lastOrder: "2024-01-15",
      status: "active",
      rating: 4.8,
      joinDate: "2023-06-15",
    },
    {
      id: "USR-002",
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      address: "456 Park Avenue, Mumbai",
      totalOrders: 28,
      totalSpent: "₹4,780",
      lastOrder: "2024-01-14",
      status: "active",
      rating: 4.9,
      joinDate: "2023-03-22",
    },
    {
      id: "USR-003",
      name: "Amit Singh",
      email: "amit.singh@email.com",
      phone: "+91 76543 21098",
      address: "789 Garden Road, Bangalore",
      totalOrders: 7,
      totalSpent: "₹1,120",
      lastOrder: "2024-01-10",
      status: "inactive",
      rating: 4.5,
      joinDate: "2023-11-08",
    },
    {
      id: "USR-004",
      name: "Sunita Devi",
      email: "sunita.devi@email.com",
      phone: "+91 65432 10987",
      address: "321 Temple Street, Chennai",
      totalOrders: 22,
      totalSpent: "₹3,890",
      lastOrder: "2024-01-12",
      status: "active",
      rating: 5.0,
      joinDate: "2023-02-14",
    },
    {
      id: "USR-005",
      name: "Mohammad Ali",
      email: "mohammad.ali@email.com",
      phone: "+91 54321 09876",
      address: "654 Market Road, Hyderabad",
      totalOrders: 3,
      totalSpent: "₹540",
      lastOrder: "2024-01-05",
      status: "inactive",
      rating: 4.2,
      joinDate: "2023-12-01",
    },
  ];

  const getStatusVariant = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-text-primary">Users</h1>
          <p className="text-admin-text-secondary">
            Manage your customer database
          </p>
        </div>
        <Button className="bg-gradient-primary border-0 shadow-glow">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat) => (
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
                    <span className="text-xs text-success">
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
                placeholder="Search users by name, email, or phone..."
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
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-gradient-surface border-admin-border shadow-md">
        <CardHeader>
          <CardTitle className="text-admin-text-primary">
            Customer Database ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-admin-text-primary">
                            {user.name}
                          </p>
                          <p className="text-sm text-admin-text-secondary">
                            {user.id}
                          </p>
                          <p className="text-xs text-admin-text-secondary">
                            Joined: {user.joinDate}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-admin-text-secondary" />
                          <span className="text-admin-text-secondary">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-admin-text-secondary" />
                          <span className="text-admin-text-secondary">{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-admin-text-secondary" />
                          <span className="text-admin-text-secondary truncate max-w-32">
                            {user.address}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-muted rounded-md text-sm font-medium">
                        {user.totalOrders} orders
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-lg">
                      {user.totalSpent}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-current" />
                        <span className="font-medium">{user.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-admin-text-secondary">
                      {user.lastOrder}
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