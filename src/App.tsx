import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Shell from "./components/Shell.tsx";
import Footer from "./components/Footer.tsx";
import ChatWidget, { type ChatWidgetHandle } from "./components/ChatWidget.tsx";
import HomePanel from "./pages/panels/HomePanel.tsx";
import ProjectsHome from "./pages/ProjectsHome.tsx";
import ProjectCategoryPage from "./pages/ProjectCategoryPage.tsx";
import ProjectGalleryPage from "./pages/ProjectGalleryPage.tsx";
import SkillsExperiencePanel from "./pages/panels/SkillsExperiencePanel.tsx";
import AboutPanel from "./pages/panels/AboutPanel.tsx";
import ContactPanel from "./pages/panels/ContactPanel.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();
const FALLBACK_CONTACT_WEBHOOK_URL = "https://n8n.srv1432950.hstgr.cloud/webhook/topgcontactform_sendmessage";
const FALLBACK_CHAT_WEBHOOK_URL = "https://n8n.srv1432950.hstgr.cloud/webhook/topgcontactform_sendchat";

const App = () => {
  useEffect(() => {
    console.log('[App] Initializing contact form handler...');
    const envContactWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL?.trim();
    const envChatWebhookUrl = import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL?.trim();
    const contactWebhookUrl = envContactWebhookUrl || FALLBACK_CONTACT_WEBHOOK_URL;
    const chatWebhookUrl = envChatWebhookUrl || FALLBACK_CHAT_WEBHOOK_URL;

    console.log('[App] Contact webhook source:', envContactWebhookUrl ? 'env' : 'fallback');
    console.log('[App] Chat webhook source:', envChatWebhookUrl ? 'env' : 'fallback');
    
    window.__contactFormHandler = async (formData) => {
      console.log('[Handler] Form submission received:', formData);
      
      try {
        const webhookUrl = contactWebhookUrl;
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

    // ─────────────────────────────────────────────────────────────
    // 🐞 DEBUG ENTRY POINT — Chat widget → n8n chatbot handler
    // File: src/App.tsx
    // This is where every chat message from <ChatWidget /> lands
    // before being POSTed to the n8n webhook defined in
    // .env.local → VITE_N8N_CHAT_WEBHOOK_URL
    // Watch the browser console for "[Chat]" prefixed logs.
    // ─────────────────────────────────────────────────────────────
    window.__chatMessageHandler = async ({ sessionId, message, history }) => {
      console.log('[Chat] 📨 Message received from widget:', message);
      console.log('[Chat] 🆔 Session ID:', sessionId);
      console.log('[Chat] 🧵 History length:', history?.length ?? 0);

      // 🔗 Webhook URL is loaded from .env.local at build time.
      // To swap URLs, edit .env.local and restart the dev server.
      const webhookUrl = chatWebhookUrl;
      console.log('[Chat] 🌐 Posting to webhook:', webhookUrl);

      if (!webhookUrl) {
        console.warn('[Chat] No VITE_N8N_CHAT_WEBHOOK_URL configured');
        return { reply: "I'm not connected to my brain just yet — please leave your details and Glenn will get back to you!" };
      }

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, message, history }),
        });

        console.log('[Chat] Response status:', response.status);

        if (!response.ok) {
          console.error('[Chat] Webhook returned non-OK status:', response.status);
          return { reply: 'Hmm, I had trouble reaching the server. Mind trying again?' };
        }

        // 🪵 Always log the RAW response body before parsing — copy this from
        // the browser console to confirm exactly what n8n is sending back.
        const raw = await response.clone().text();
        console.log('[Chat] 🪵 RAW response body:', raw);

        // Tolerate many response shapes from n8n / AI Agent / Respond to Webhook
        const contentType = response.headers.get('content-type') || '';
        let reply: string = '';

        const pickString = (v: unknown): string => {
          if (typeof v === 'string') return v;
          if (typeof v === 'number' || typeof v === 'boolean') return String(v);
          return '';
        };

        if (contentType.includes('application/json')) {
          let data: any;
          try {
            data = JSON.parse(raw);
          } catch (e) {
            console.warn('[Chat] JSON parse failed, falling back to raw text');
            data = raw;
          }
          console.log('[Chat] Parsed payload:', data);
          const payload = Array.isArray(data) ? data[0] : data;

          // Walk common shapes: top-level, nested under data/body/result/response,
          // and OpenAI-style choices[0].message.content
          reply =
            pickString(payload?.reply) ||
            pickString(payload?.output) ||
            pickString(payload?.message) ||
            pickString(payload?.text) ||
            pickString(payload?.response) ||
            pickString(payload?.answer) ||
            pickString(payload?.content) ||
            pickString(payload?.data?.reply) ||
            pickString(payload?.data?.output) ||
            pickString(payload?.data?.message) ||
            pickString(payload?.data?.text) ||
            pickString(payload?.body?.reply) ||
            pickString(payload?.body?.output) ||
            pickString(payload?.body?.message) ||
            pickString(payload?.body?.text) ||
            pickString(payload?.result?.output) ||
            pickString(payload?.result?.text) ||
            pickString(payload?.output?.text) ||
            pickString(payload?.message?.content) ||
            pickString(payload?.choices?.[0]?.message?.content) ||
            pickString(payload?.choices?.[0]?.text) ||
            (typeof payload === 'string' ? payload : '');
        } else {
          reply = raw;
          console.log('[Chat] Non-JSON response text:', reply);
        }

        if (!reply) {
          console.warn('[Chat] ⚠️ Could not extract a reply from webhook response. Raw body above.');
          reply = "⚠️ Couldn't parse n8n reply — check console for [Chat] 🪵 RAW response body";
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
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Shell />}>
                <Route path="/" element={<HomePanel />} />
                <Route path="/projects" element={<ProjectsHome />} />
                <Route path="/projects/:categorySlug" element={<ProjectCategoryPage />} />
                <Route path="/projects/:categorySlug/:projectSlug" element={<ProjectGalleryPage />} />
                <Route path="/skills-experience" element={<SkillsExperiencePanel />} />
                <Route path="/about" element={<AboutPanel />} />
                <Route path="/contact" element={<ContactPanel />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
