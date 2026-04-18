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

    // Chat widget → n8n chatbot handler
    window.__chatMessageHandler = async ({ message, history }) => {
      console.log('[Chat] Message received:', message);

      const webhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL;
      console.log('[Chat] Chat webhook URL:', webhookUrl);

      if (!webhookUrl) {
        console.warn('[Chat] No VITE_N8N_CHAT_WEBHOOK_URL configured');
        return { reply: "I'm not connected to my brain just yet — please leave your details and Glenn will get back to you!" };
      }

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, history }),
        });

        console.log('[Chat] Response status:', response.status);

        if (!response.ok) {
          console.error('[Chat] Webhook returned non-OK status:', response.status);
          return { reply: 'Hmm, I had trouble reaching the server. Mind trying again?' };
        }

        // Tolerate multiple response shapes: {reply}, {output}, {message}, plain text, or array
        const contentType = response.headers.get('content-type') || '';
        let reply = '';

        if (contentType.includes('application/json')) {
          const data = await response.json();
          console.log('[Chat] Response payload:', data);
          const payload = Array.isArray(data) ? data[0] : data;
          reply =
            payload?.reply ??
            payload?.output ??
            payload?.message ??
            payload?.text ??
            (typeof payload === 'string' ? payload : '');
        } else {
          reply = await response.text();
          console.log('[Chat] Response text:', reply);
        }

        if (!reply) {
          console.warn('[Chat] Empty reply from webhook');
          reply = "Got it — I'll pass that along to Glenn.";
        }

        return { reply };
      } catch (error) {
        console.error('[Chat] Error:', error);
        return { reply: 'Sorry, something went wrong on my end. Please try again in a moment.' };
      }
    };

    console.log('[App] Chat handler initialized');
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
