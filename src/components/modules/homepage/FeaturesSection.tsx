import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react"

const features = [
  {
    icon: <Truck className="w-10 h-10 text-green-600" />,
    title: "Fast Delivery",
    desc: "Quick and reliable delivery across all major locations.",
  },
  {
    icon: <Clock className="w-10 h-10 text-green-600" />,
    title: "On-Time Service",
    desc: "We value your time and ensure timely deliveries.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
    title: "Secure Handling",
    desc: "Your parcels are handled with maximum safety.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-green-600" />,
    title: "Wide Coverage",
    desc: "Nationwide delivery network with live tracking.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold mb-4">
          Our Key Features
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Everything you need for a fast, safe, and reliable parcel delivery experience.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-8 text-center shadow hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
