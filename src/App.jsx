import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";

import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Payments from "./pages/admin/Payments";
import Users from "./pages/admin/Users";
import Profile from "./pages/admin/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="/payments" element={<AdminLayout><Payments /></AdminLayout>} />
          <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
          <Route path="/profile" element={<AdminLayout><Profile /></AdminLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
