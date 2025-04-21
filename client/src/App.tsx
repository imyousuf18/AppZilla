import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import AboutUs from "@/pages/AboutUs";
import Team from "@/pages/Team";
import Services from "@/pages/Services";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import ThemeProvider from "./components/ThemeProvider";

// Preload legal pages to avoid LSP errors
const CookiePolicyPage = lazy(() => import('./pages/legal/CookiePolicy'));
const GDPRPage = lazy(() => import('./pages/legal/GDPR'));
const SecurityPage = lazy(() => import('./pages/legal/Security'));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-900 flex items-center justify-center">Loading...</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/app-sandbox" component={lazy(() => import('./pages/AppSandbox'))} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/services" component={Services} />
        <Route path="/services/mobile-app-development" component={lazy(() => import('./pages/services/MobileAppDevelopment'))} />
        <Route path="/services/web-app-development" component={lazy(() => import('./pages/services/WebAppDevelopment'))} />
        <Route path="/legal/terms-of-service" component={lazy(() => import('./pages/legal/TermsOfService'))} />
        <Route path="/legal/privacy-policy" component={lazy(() => import('./pages/legal/PrivacyPolicy'))} />
        <Route path="/legal/cookie-policy" component={CookiePolicyPage} />
        <Route path="/legal/gdpr" component={GDPRPage} />
        <Route path="/legal/security" component={SecurityPage} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/team" component={Team} />
        <Route path="/blog" component={lazy(() => import('./pages/Blog'))} />
        <Route path="/blog/:id" component={lazy(() => import('./pages/BlogPost'))} />
        <Route path="/portfolio" component={lazy(() => import('./pages/Portfolio'))} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
