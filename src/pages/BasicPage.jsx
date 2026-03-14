import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function BasicPage({ title, children }){
  return (
    <div className="bg-black text-white min-h-screen">
      <SEO 
        title={title} 
        url={`/${title.toLowerCase()}`}
      />
      <Navbar />
      <main className="container pt-28">
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        <div className="mt-4 text-gray-300">{children}</div>
      </main>
      <Footer />
    </div>
  )
}


