import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Landing from "./pages/Landing";
import MusicPlayer from "./components/MusicPlayer";
import useLenis from "./hooks/useLenis";

const PageFallback = () => <div style={{ minHeight: "100vh", background: "#000" }} />;

function AppShell({ children }) {
  useLenis();
  return <HelmetProvider>{children}</HelmetProvider>;
}

export default function App() {
  return (
    <AppShell>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <MusicPlayer />
    </AppShell>
  );
}
