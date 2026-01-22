import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-emerald-400" />

      <div className="relative container mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Deliver Smarter?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of businesses and individuals who trust Fast Box
          for secure, fast, and reliable courier service.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </Link>
          <Link to="/track">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Track Parcel
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
