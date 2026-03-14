import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'
import SEO from '../components/SEO'

export default function Register(){
  return (
    <div className="bg-black text-white min-h-screen">
      <SEO 
        title="Register" 
        description="Register your crew for Hack Heist 2.0 at MIET. Crack the code and pull off the perfect build."
        url="/register"
      />
      <Navbar />
      <main className="container pt-28">
        <h1 className="text-4xl font-extrabold tracking-tight">Register</h1>
        <p className="text-gray-300 mt-2">Netflix‑style form with validation and a mock backend.</p>
        <div className="mt-6 max-w-2xl">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}


