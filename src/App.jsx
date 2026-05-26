import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import RoomSections from "./components/RoomSections"
import ProductShowcase from "./components/ProductShowcase"
import LivingRoomEvent from "./components/LivingRoomEvent"
import FurnitureFeature from "./components/FurnitureFeature"
import ShopHighlights from "./components/ShopHighlights"
import LifestyleSections from "./components/LifestyleSections"


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <Navbar onMenuOpenChange={setIsMenuOpen} />
      <div
        className={`pointer-events-none fixed inset-0 z-[45] bg-black/35 transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <Hero />
      <RoomSections />
      <ProductShowcase />
      <LivingRoomEvent />
      <FurnitureFeature />
      <ShopHighlights />
      <LifestyleSections />
    </div>
  )
}

export default App
