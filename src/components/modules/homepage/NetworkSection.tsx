import { Button } from "@/components/ui/button";
import van from "../../../assets/image/delivery-van.png"

export default function NetworkSection() {

    return (
        <section className="container mx-auto px-6 rounded-xl">
        <div className="md:flex md:items-center md:space-x-12">
          <img src={van} alt="Delivery Van" className="md:w-1/2 rounded-xl" />
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl font-bold mb-4">We Have the Largest Network</h2>
            <p className="text-gray-600 mb-6">
              Our delivery network covers every major city and region. We ensure safe, fast, and reliable parcel handling for individuals and businesses alike.
            </p>
          
            {/* Specialties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-16">
              {[
                { title: "Easy to Order", desc: "Place orders online in a few clicks" },
                { title: "Cash on Delivery", desc: "Pay only when you receive your parcel" },
                { title: "Live Tracking", desc: "Monitor your parcel in real-time" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <Button size="lg" className="cursor-pointer">Learn More</Button>
          </div>
        </div>
      </section>
    )
}