import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import van from "../assets/image/delivery-van.png"
import bike from "../assets/image/bike.png"
import cal from "../assets/image/calculate.png"
export default function Home() {
  return (
    <div className="flex flex-col space-y-20">

      {/* Hero Section */}
      <section className="relative bg-green-50 overflow-hidden">
        <div className="container mx-auto px-6 py-32 flex flex-col md:flex-row items-center justify-between">
          {/* Text */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Largest and reliable <span className="text-green-600">courier service</span> in your city
            </h1>
            <p className="text-lg text-gray-600">
              Send and receive parcels with speed and confidence. Track your shipment in real-time and enjoy a seamless delivery experience.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/register">
                <Button size="lg" className="text-lg bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="text-lg border-green-600 text-green-600 hover:bg-green-100">
                  Track Parcel
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={bike}
              alt="Courier Delivery"
              className="w-80 md:w-auto"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">How Fast Box Works</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { title: "Booking", desc: "Book your parcel online or via our app", icon: "📅" },
            { title: "Packing", desc: "We carefully pack your items", icon: "📦" },
            { title: "Transportation", desc: "Fast and secure transit", icon: "🚚" },
            { title: "Delivery", desc: "Delivered on time, every time", icon: "✈️" },
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Network & Specialties Section */}
      <section className="container mx-auto px-6 py-20 bg-green-50 rounded-xl">
        <div className="md:flex md:items-center md:space-x-12">
          <img src={van} alt="Delivery Van" className="md:w-1/2 rounded-xl" />
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl font-bold mb-4">We Have the Largest Network</h2>
            <p className="text-gray-600 mb-6">
              Our delivery network covers every major city and region. We ensure safe, fast, and reliable parcel handling for individuals and businesses alike.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">Learn More</Button>

            {/* Specialties */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
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
          </div>
        </div>
        <h1></h1>
      </section>

      {/* Calculate Price Section */}
      <section className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center bg-green-100 rounded-xl">
        <div className="md:w-1/2">
          <img src={cal} alt="Calculate Price" className="rounded-xl " />
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
          <h2 className="text-3xl font-bold mb-6">Calculate Your Price</h2>
          <p className="text-gray-600 mb-6">
            Enter your parcel details and booking info to estimate delivery costs instantly.
          </p>
          <form className="bg-white p-6 rounded-xl shadow space-y-4">
            <input type="date" placeholder="Booking Date" className="w-full p-3 border rounded-lg" />
            <select className="w-full p-3 border rounded-lg">
              <option>Parcel Type</option>
              <option>Document</option>
              <option>Package</option>
            </select>
            <select className="w-full p-3 border rounded-lg">
              <option>Destination</option>
              <option>City A</option>
              <option>City B</option>
            </select>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Calculate</Button>
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Adam Smith", role: "Web Developer", review: "Fast and reliable service!", img: "/assets/client1.png" },
            { name: "Sofia Carolino", role: "Designer", review: "Very professional and timely.", img: "/assets/client2.png" },
            { name: "Marfie Motcast", role: "Entrepreneur", review: "Highly recommend Fast Box!", img: "/assets/client3.png" },
          ].map((client, idx) => (
            <div key={idx} className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <img src={client.img} alt={client.name} className="mx-auto rounded-full w-24 h-24 mb-4" />
              <h3 className="text-lg font-semibold">{client.name}</h3>
              <p className="text-gray-600 mb-2">{client.role}</p>
              <p className="text-gray-700 italic">"{client.review}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
