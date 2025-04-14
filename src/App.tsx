
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

// Auth components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Protected components
import Home from './pages/Home';
import Items from './pages/Items';
import ItemDetail from './pages/ItemDetail';
import MakeOffer from './pages/MakeOffer';
import CategoryItems from './pages/CategoryItems';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import AddItem from './pages/AddItem';

// Route guards
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

// Error page
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const { isLoading } = useSelector((state: any) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<Items />} />
              <Route path="/items/:id" element={<ItemDetail />} />
              <Route path="/offer/:id" element={<MakeOffer />} />
              <Route path="/categories/:id" element={<CategoryItems />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/add-item" element={<AddItem />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
