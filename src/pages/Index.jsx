import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Package, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Shield, 
  ArrowRight,
  LayoutDashboard,
  Sparkles
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Dashboard Overview",
      description: "Get real-time insights into your ironing business performance with comprehensive analytics and key metrics."
    },
    {
      icon: Package,
      title: "Order Management",
      description: "Track and manage all customer orders from pickup to delivery with status updates and notifications."
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Handle all payment transactions securely with detailed payment history and revenue tracking."
    },
    {
      icon: Users,
      title: "Customer Database",
      description: "Manage your customer information, order history, and build lasting relationships."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-admin-bg to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Isthri Wala
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-admin-text-primary mb-6">
            Professional Ironing Services
            <span className="block text-primary">Admin Panel</span>
          </h2>
          
          <p className="text-xl text-admin-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Streamline your ironing business operations with our comprehensive admin panel. 
            Manage orders, track payments, handle customers, and grow your business efficiently.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/admin">
              <Button size="lg" className="bg-gradient-primary border-0 shadow-glow hover:shadow-lg transition-all duration-300">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Access Admin Panel
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              Secure & Reliable
            </Badge>
          </div>

          <div className="flex items-center justify-center gap-8 text-admin-text-secondary text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
              <span>System Online</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Latest Version</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-surface border-admin-border shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg text-admin-text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-admin-text-secondary">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="bg-gradient-surface border-admin-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-admin-text-primary mb-2">
              Business at a Glance
            </CardTitle>
            <CardDescription>
              Quick overview of your ironing service performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2,847</div>
                <div className="text-sm text-admin-text-secondary">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">₹45,678</div>
                <div className="text-sm text-admin-text-secondary">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">1,234</div>
                <div className="text-sm text-admin-text-secondary">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
                <div className="text-sm text-admin-text-secondary">Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-admin-text-primary mb-8">
            Ready to Get Started?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admin/orders">
              <Button variant="outline" size="lg">
                <Package className="h-4 w-4 mr-2" />
                Manage Orders
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="outline" size="lg">
                <Users className="h-4 w-4 mr-2" />
                View Customers
              </Button>
            </Link>
            <Link to="/admin/payments">
              <Button variant="outline" size="lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Track Revenue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
