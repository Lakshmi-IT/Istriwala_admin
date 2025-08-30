import { useEffect, useState } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../utils/url";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [allUsers,setAllUsers]=useState([])







  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });



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

  console.log(allUsers,"allUsers")



  return (
    <div className="space-y-6 lg:mb-0 mb-10">
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
              
                  <TableHead>Last Order</TableHead>
                  {/* <TableHead>Actions</TableHead> */}
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
                  
                   
                    <TableCell className="text-admin-text-secondary">
                      {user.lastOrder}
                    </TableCell>
                    {/* <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell> */}
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