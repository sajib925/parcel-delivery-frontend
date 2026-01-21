import mision from "../assets/image/mision.jpg"
import vision from "../assets/image/vision.jpg"
import profile1 from "../assets/image/delivery-man.jpg"
import profile2 from "../assets/image/delivery-man-2.jpg"
import profile3 from "../assets/image/delivery-man-3.jpg"







export default function About() {
  return (
    <div className="px-6 pb-15 space-y-32">

      {/* Hero Section */}
      <section className="w-full pt-25 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
            Powering Smart & Reliable <br /> Parcel Delivery
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10">
            A centralized platform to manage, track, and deliver parcels
            efficiently with speed, security, and transparency.
          </p>

          {/* CTA Button */}
          <button className="px-12 py-3 bg-indigo-600 cursor-pointer text-white font-semibold rounded-full text-lg hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <img
          src={mision}
          alt="Mission"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To modernize parcel delivery by offering a centralized platform
            where senders, receivers, and administrators can manage deliveries
            efficiently, securely, and in real time.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become the most trusted digital parcel management platform,
            empowering businesses and individuals with intelligent logistics,
            nationwide coverage, and a frictionless delivery experience.
          </p>
        </div>
        <img
          src={vision}
          alt="Vision"
          className="rounded-xl shadow-lg"
        />
      </section>

    {/* Team Section */}
    <section className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Our dedicated team works tirelessly to ensure fast, secure,
        and reliable parcel delivery across the country.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Operations Team", image: profile1 },
          { title: "Engineering Team", image: profile2 },
          { title: "Support Team", image: profile3 },
        ].map((team, i) => (
          <div
            key={i}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <img
              src={team.image}
              alt={team.title}
              className="mx-auto mb-4 rounded-xl w-full h-56 object-cover"
            />
            <h3 className="text-xl font-semibold">{team.title}</h3>
            <p className="text-gray-600 text-sm mt-2">
              Dedicated professionals ensuring smooth and reliable deliveries.
            </p>
          </div>
        ))}
      </div>
    </section>


     {/* Stats Section */}
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Impact in Numbers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          These numbers reflect our commitment to delivering excellence,
          reliability, and nationwide coverage every single day.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: "Parcels Delivered", value: "50,000+" },
            { label: "Active Users", value: "12,000+" },
            { label: "Delivery Coverage", value: "64 Districts" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-xl text-center shadow-md"
            >
              <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
