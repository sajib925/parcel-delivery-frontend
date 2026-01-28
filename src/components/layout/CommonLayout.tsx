import { ReactNode } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

interface IProps {
  children: ReactNode
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </div>

      {/* Content */}
      <div className="grow">
        {children}
      </div>

      <Footer />
    </div>
  )
}
