import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // ✅ include Navigate
import Index from "./pages/Index";
import Services from "./pages/Services";
import Overview from "./pages/Overview";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/overview" element={<Navigate to="/dashboard" replace />} /> {/* ✅ Redirect */}
              <Route path="/dashboard" element={<Overview />} /> {/* ✅ Actual dashboard route */}
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} /> {/* ✅ Catch-all at end */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
