import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Projects from "./pages/Projects.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log('[App] Initializing contact form handler...');
    
    window.__contactFormHandler = async (formData) => {
      console.log('[Handler] Form submission received:', formData);
      
      try {
        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
        console.log('[Handler] Webhook URL:', webhookUrl);
        
        if (!webhookUrl) {
          console.error('[Handler] ERROR: Webhook URL not configured');
          return { success: false, message: 'Webhook not configured' };
        }
        
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        console.log('[Handler] Response status:', response.status);
        
        if (response.ok) {
          console.log('[Handler] SUCCESS: Webhook request sent');
          return { success: true };
        } else {
          console.error('[Handler] ERROR: Webhook returned status', response.status);
          return { success: false, message: 'Webhook failed' };
        }
      } catch (error) {
        console.error('[Handler] Error:', error);
        return { success: false, message: error.message };
      }
    };
    
    console.log('[App] Handler initialized successfully');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
