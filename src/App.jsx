import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import RoomSections from "./components/RoomSections"
import ProductShowcase from "./components/ProductShowcase"


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
   <div>
    <Navbar onMenuOpenChange={setIsMenuOpen} />
    <Hero isMenuOpen={isMenuOpen} />
    <RoomSections />
    <ProductShowcase />
   </div>
  )
}

export default App
