import Footer from "./container/Footer"
import Hero from "./container/Hero"
import Navbar from "./container/Navbar"

function App() {
  return(
    <>
    <Navbar />
    <div className="min-h-[82vh]">
      <Hero />
    </div>
    <Footer/>
    </>
  )
}

export default App
