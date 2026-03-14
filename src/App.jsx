import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Landing from './pages/Landing'
import MusicPlayer from './components/MusicPlayer'
import useLenis from './hooks/useLenis'

const Register = lazy(() => import(/* webpackChunkName: "register" */ './pages/Register'))
const BasicPage = lazy(() => import(/* webpackChunkName: "basic-page" */ './pages/BasicPage'))

const PageFallback = () => (
  <div style={{ minHeight: '100vh', background: '#000' }} />
)

function AppShell({ children }) {
  useLenis()
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  )
}

export default function App() {
  return (
    <AppShell>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/about"
              element={
                <BasicPage title="About">
                  We bring hackers together for a cinematic 24h build.
                </BasicPage>
              }
            />
            <Route
              path="/schedule"
              element={
                <BasicPage title="Schedule">
                  See the timeline on the home page.
                </BasicPage>
              }
            />
            <Route
              path="/sponsors"
              element={
                <BasicPage title="Sponsors">
                  Become a partner — contact us.
                </BasicPage>
              }
            />
            <Route
              path="/contact"
              element={
                <BasicPage title="Contact">
                  Email us: crew@hackheist.dev
                </BasicPage>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <MusicPlayer />
    </AppShell>
  )
}
