import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";




import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import { BASE_URL } from "../../utils/url";
import { toast } from "react-toastify";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [allOrder, setAllOrders] = useState([]);

  // modal states
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [viewOpen, setViewOpen] = useState(false);

  const [role, setRole] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  const [previewUrl, setPreviewUrl] = useState(null);


  const [isOpen, setIsOpen] = useState(false);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);



  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);



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

  const filteredOrders = allOrder.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}api/orders/getAllOrders`);
        if (res.data.success) {
          setAllOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };
    fetchOrders();
  }, []);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // get token from storage
        const res = await axios.get(`${BASE_URL}api/orders/employee/orders`, {
          headers: {
            Authorization: `Bearer ${token}`, // attach token
          },
        });
        if (res.data.success) {
          setAllOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Failed to load orders:", err);
      }
    };
    fetchOrders();
  }, []);


  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token"); // get token from storage
      const res = await axios.get(`${BASE_URL}api/employee`, {
        headers: {
          Authorization: `Bearer ${token}`, // attach token
        },
      });

      console.log(res.data, "res")

      if (res.status === 200) {

        const employees = res?.data?.map((emp) => ({
          empId: emp?.employeeId,
          empName: emp?.fullName,
          id: emp?._id

        }));
        setEmployees(employees);
      }
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

  const handleAssignOrder = async () => {
    if (!selectedEmployee || !selectedOrder) return;

    console.log(selectedOrder, "selectedOrder selectedOrder")
    try {
      const token = localStorage.getItem("token"); // get token from storage
      const res = await axios.put(
        `${BASE_URL}api/orders/assign`,
        {
          orderId: selectedOrder._id, // make sure you're using `_id` from MongoDB
          employeeId: selectedEmployee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Order assigned successfully!");
        // alert("Order assigned successfully!");
        setOpen(false);
        setSelectedEmployee("");
        // refresh orders
        setAllOrders((prev) =>
          prev.map((o) =>
            o._id === selectedOrder._id
              ? { ...o, assignedEmployee: res.data.employee }
              : o
          )
        );
      }
    } catch (err) {
      console.error("Failed to assign order:", err);
    }
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  // };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handlePickupUpload = async (orderId) => {
    if (!selectedFile || !orderId) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("pickupImage", selectedFile); // Must match Multer field name
    formData.append("orderId", orderId);

    try {
      setUploading(true);
      const res = await axios.put(
        `${BASE_URL}api/orders/employee/pickup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Photo Uploaded  successfully!");
        // alert("Photo uploaded successfully!");
        setViewOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDiliveryupUpload = async (orderId) => {
    if (!selectedFile || !orderId) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("deliveryImage", selectedFile); // Must match Multer field name
    formData.append("orderId", orderId);

    try {
      setUploading(true);
      const res = await axios.put(
        `${BASE_URL}api/orders/employee/delivery`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("✅ Photo Uploaded successfully!");
        // alert("Photo uploaded successfully!");
        setViewOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };




  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });


  // Get delivery boy location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("No geolocation support");
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(err)
      );
    });
  };

  const openRouteModal = async () => {
    try {
      const loc = await getCurrentLocation();
      setCurrentLocation(loc);

      if (isLoaded && selectedOrder?.lat && selectedOrder?.lng) {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
          {
            origin: loc,
            destination: { lat: selectedOrder.lat, lng: selectedOrder.lng },
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK") setDirections(result);
            else console.error("Directions request failed", status);
          }
        );
      }
      setIsOpen(true);
    } catch (err) {
      console.error("Location error:", err);
    }
  };






  return (
    <div className="space-y-6 lg:mb-0 mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-admin-text-primary">Orders</h1>
          <p className="text-admin-text-secondary">
            Manage all your ironing service orders
          </p>
        </div>
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
            Orders ({filteredOrders?.length})
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
                  <TableRow key={order?.id} className="hover:bg-muted/50">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setViewOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>


                        {role === "employee" ? null : (

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setOpen(true);
                              fetchEmployees();
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


      {/* View Order Modal */}
      {/* View Order Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen} className="p-4">
        <DialogContent className="lg:max-w-[50vw] max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-3 h-[70vh] overflow-y-scroll">
              {/* Order Info */}
              <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Order ID</p>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Date</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Phone</p>
                  <p className="font-medium">{selectedOrder.phone}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Service</p>
                  <p className="font-medium">{selectedOrder.service}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Items</p>
                  <p className="font-medium">{selectedOrder.items}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Amount</p>
                  <p className="font-medium text-green-600">{selectedOrder.amount}</p>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                  <p className="text-gray-500 text-xs">Status</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${selectedOrder.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : selectedOrder.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="bg-gray-50 p-2 sm:p-3 rounded-lg col-span-1 sm:col-span-2 md:col-span-4">
                  <p className="text-gray-500 text-xs">Assigned At</p>
                  <p className="font-medium text-green-600">
                    {selectedOrder.assignedAt
                      ? new Date(selectedOrder.assignedAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      : "Not Assigned"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <p className="text-gray-500 text-xs">Address</p>
                <p className="font-medium">{selectedOrder.address}</p>

                <button
                  onClick={openRouteModal}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  View Route
                </button>

                {/* Route Modal */}
                {isOpen && (
                  // <Modal open={isOpen} onOpenChange={setIsOpen}>
                  //   <div className="h-[500px] w-full">
                  //     {isLoaded && currentLocation && (
                  //       <GoogleMap
                  //         center={currentLocation}
                  //         zoom={14}
                  //         mapContainerStyle={{ width: "100%", height: "100%" }}
                  //       >
                  //         {directions && <DirectionsRenderer directions={directions} />}
                  //       </GoogleMap>
                  //     )}
                  //   </div>
                  // </Modal>
                  // <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  //   <DialogContent className="sm:max-w-[700px]">
                  //     <DialogHeader>
                  //       <DialogTitle>Route Preview</DialogTitle>
                  //     </DialogHeader>

                  //     <div className="h-[500px] w-full">
                  //       {isLoaded && currentLocation && (
                  //         <GoogleMap
                  //           center={currentLocation}
                  //           zoom={14}
                  //           mapContainerStyle={{ width: "100%", height: "100%" }}
                  //         >
                  //           {directions && <DirectionsRenderer directions={directions} />}
                  //         </GoogleMap>
                  //       )}
                  //     </div>

                  //     <DialogFooter>
                  //       <button
                  //         onClick={() => setIsOpen(false)}
                  //         className="px-4 py-2 rounded bg-primary text-white"
                  //       >
                  //         Close
                  //       </button>
                  //     </DialogFooter>
                  //   </DialogContent>
                  // </Dialog>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent 
    className="sm:max-w-[700px] h-[90vh] w-[95%] rounded-lg overflow-hidden z-[9999]"
  >
    <DialogHeader>
      <DialogTitle>Route Preview</DialogTitle>
    </DialogHeader>

    <div className="h-[70vh] w-full">
      {isLoaded && currentLocation && (
        <GoogleMap
          center={currentLocation}
          zoom={14}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </div>

    <DialogFooter>
      <button
        onClick={() => setIsOpen(false)}
        className="px-4 py-2 rounded bg-primary text-white"
      >
        Close
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>

                )}
              </div>

              {/* Employee Info / Upload */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-base mb-3">
                  {role === "employee" ? "Upload Pickup Photo" : "Assigned Employee"}
                </h3>

                {role === "employee" ? (
                  <div className="flex flex-col lg:flex-col gap-3">
                    {selectedOrder?.status === "DELIVERED" ? (
                      <div className="grid lg:grid-cols-2 grid-col-1">
                        {/* Show Pickup Image */}
                        {selectedOrder.pickupImage && (
                          <div className="flex flex-col gap-1">
                            <p className="text-gray-500 text-xs mb-1">Pickup Photo:</p>
                            <img
                              src={selectedOrder.pickupImage}
                              alt="Pickup"
                              className="w-48 h-32 object-cover rounded-md border"
                            />
                            <p>
                              PickedUp at:{" "}
                              {selectedOrder?.pickupAt
                                ? new Date(selectedOrder.pickupAt).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                : ""}
                            </p>

                          </div>
                        )}

                        {/* Show Delivery Image */}
                        {selectedOrder.deliveryImage && (
                          <div className="flex flex-col gap-1">
                            <p className="text-gray-500 text-xs mb-1">Delivery Photo:</p>
                            <img
                              src={selectedOrder.deliveryImage}
                              alt="Delivery"
                              className="w-48 h-32 object-cover rounded-md border"
                            />

                            <p>
                              Delivered at: {" "}
                              {selectedOrder?.deliveredAt
                                ? new Date(selectedOrder.deliveredAt).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                : "Not Delivered at"}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : selectedOrder?.status === "PICKED_UP" && selectedOrder?.pickupImage ? (
                      <>
                        {/* Show Pickup Image */}
                        <div className="flex flex-col gap-1">
                          <button type="button" className="bg-green-500 text-white rounded-lg w-[100px]">Done</button>
                          <p className="text-gray-500 text-xs mb-1">Pickup Photo:</p>
                          <img
                            src={selectedOrder.pickupImage}
                            alt="Pickup"
                            className="w-48 h-32 object-cover rounded-md border"
                          />
                        </div>

                        {/* Upload Delivery Photo */}
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-sm">Upload Delivery Photo</p>
                          <input
                            type="file"
                            accept="image/*"
                            className="p-2 border rounded-md"
                            onChange={handleFileChange}
                          />
                          {previewUrl && (
                            <div>
                              <p className="text-gray-500 text-xs mb-1">Preview:</p>
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-48 h-32 object-cover rounded-md border"
                              />
                            </div>
                          )}
                          <button
                            onClick={() => handleDiliveryupUpload(selectedOrder?._id)}
                            disabled={!selectedFile || uploading}
                            className={`px-4 py-2 rounded-md text-white ${uploading ? "bg-gray-400" : "bg-primary"}`}
                          >
                            {uploading ? "Uploading..." : "Upload"}
                          </button>
                        </div>
                      </>
                    ) : (
                      // Show Pickup Upload if order not picked up yet
                      <div className="flex flex-col gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          className="p-2 border rounded-md"
                          onChange={handleFileChange}
                        />
                        {previewUrl && (
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Preview:</p>
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-48 h-32 object-cover rounded-md border"
                            />
                          </div>
                        )}
                        <button
                          onClick={() => handlePickupUpload(selectedOrder?._id)}
                          disabled={!selectedFile || uploading}
                          className={`px-4 py-2 rounded-md text-white ${uploading ? "bg-gray-400" : "bg-primary"}`}
                        >
                          {uploading ? "Uploading..." : "Upload"}
                        </button>
                      </div>
                    )}
                  </div>


                ) : selectedOrder.employee ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Employee ID</p>
                        <p className="font-medium">{selectedOrder.employee.employeeId}</p>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Name</p>
                        <p className="font-medium">{selectedOrder.employee.fullName}</p>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Email</p>
                        <p className="font-medium">{selectedOrder.employee.email}</p>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Mobile</p>
                        <p className="font-medium">{selectedOrder.employee.mobile}</p>
                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Alt Mobile</p>
                        <p className="font-medium">{selectedOrder.employee.altMobile}</p>

                      </div>
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                        <p className="font-medium">
                          PickedUp at:{" "}
                          {selectedOrder?.pickedAt
                            ? new Date(selectedOrder?.pickedAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            : ""}
                        </p>

                       

                      </div>
                       <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <p className="font-medium">
                                Delivered at: {" "}
                                {selectedOrder?.deliveredAt
                                  ? new Date(selectedOrder.deliveredAt).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                  : "Not Delivered at"}
                              </p>
                       </div>
                    </div>
                    <div className="flex flex-col lg:flex-col gap-3">
                      {selectedOrder?.status === "DELIVERED" ? (
                        <div className="grid lg:grid-cols-2 grid-col-1">
                          {/* Show Pickup Image */}
                          {selectedOrder.pickupImage && (
                            <div className="flex flex-col gap-1">
                              <p className="text-gray-500 text-xs mb-1">Pickup Photo:</p>

                              <img
                                src={selectedOrder.pickupImage}
                                alt="Pickup"
                                className="w-48 h-32 object-cover rounded-md border"
                              />


                            </div>
                          )}

                          {/* Show Delivery Image */}
                          {selectedOrder.deliveryImage && (
                            <div className="flex flex-col gap-1">
                              <p className="text-gray-500 text-xs mb-1">Delivery Photo:</p>
                              <img
                                src={selectedOrder.deliveryImage}
                                alt="Delivery"
                                className="w-48 h-32 object-cover rounded-md border"
                              />

                             
                            </div>
                          )}
                        </div>
                      ) : selectedOrder?.status === "PICKED_UP" && selectedOrder?.pickupImage ? (
                        <>
                          {/* Show Pickup Image */}
                          <div className="flex flex-col gap-1">
                            <button type="button" className="bg-green-500 text-white rounded-lg w-[100px]">Done</button>
                            <p className="text-gray-500 text-xs mb-1">Pickup Photo:</p>
                            <img
                              src={selectedOrder.pickupImage}
                              alt="Pickup"
                              className="w-48 h-32 object-cover rounded-md border"
                            />
                          </div>

                          {/* Upload Delivery Photo */}
                          <div className="flex flex-col gap-2">
                            <p className="font-medium text-sm">Upload Delivery Photo</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="p-2 border rounded-md"
                              onChange={handleFileChange}
                            />
                            {previewUrl && (
                              <div>
                                <p className="text-gray-500 text-xs mb-1">Preview:</p>
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-48 h-32 object-cover rounded-md border"
                                />
                              </div>
                            )}
                            <button
                              onClick={() => handleDiliveryupUpload(selectedOrder?._id)}
                              disabled={!selectedFile || uploading}
                              className={`px-4 py-2 rounded-md text-white ${uploading ? "bg-gray-400" : "bg-primary"}`}
                            >
                              {uploading ? "Uploading..." : "Upload"}
                            </button>
                          </div>
                        </>
                      ) : (
                        // Show Pickup Upload if order not picked up yet
                        <div className="flex flex-col gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            className="p-2 border rounded-md"
                            onChange={handleFileChange}
                          />
                          {previewUrl && (
                            <div>
                              <p className="text-gray-500 text-xs mb-1">Preview:</p>
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-48 h-32 object-cover rounded-md border"
                              />
                            </div>
                          )}
                          <button
                            onClick={() => handlePickupUpload(selectedOrder?._id)}
                            disabled={!selectedFile || uploading}
                            className={`px-4 py-2 rounded-md text-white ${uploading ? "bg-gray-400" : "bg-primary"}`}
                          >
                            {uploading ? "Uploading..." : "Upload"}
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">No employee assigned</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>




      {/* Assign Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Order</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <p>
                <strong>Order:</strong> {selectedOrder.id} - {selectedOrder.service}
              </p>

              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.empId} - {emp.empName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleAssignOrder} disabled={!selectedEmployee}>
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
