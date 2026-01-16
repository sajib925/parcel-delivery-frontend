import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Fast, Reliable Parcel Delivery</h1>
          <p className="text-xl text-gray-600 mb-8">
            Track your parcels in real-time. Send and receive with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
            </Link>
            <Link to="/track">
              <Button size="lg" variant="outline" className="text-lg bg-transparent">
                Track Parcel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ParcelHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Tracking",
              desc: "Track your parcels every step of the journey",
            },
            {
              title: "Secure Delivery",
              desc: "Your parcels are handled with care and security",
            },
            {
              title: "Fast Service",
              desc: "Quick pickup and delivery times across the region",
            },
          ].map((feature) => (
            <div key={feature.title} className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
