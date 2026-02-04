import mision from "../assets/image/mision.jpg"
import vision from "../assets/image/vision.jpg"
import profile1 from "../assets/image/delivery-man.jpg"
import profile2 from "../assets/image/delivery-man-2.jpg"
import profile3 from "../assets/image/delivery-man-3.jpg"
import bg from "../assets/image/about-bg.jpg"
import { Link, useNavigate } from "react-router"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Button } from "@/components/ui/button"

export default function About() {
  const navigate = useNavigate()
  
    const { data } = useUserInfoQuery(undefined)
  
    const user = data?.data
    const userRole = user?.role
    const userId = user?._id
  
  
    // 🔹 dynamic dashboard path
    const getDashboardPath = () => {
      switch (userRole) {
        case "admin":
          return "/dashboard/admin/adminDashboard"
        case "sender":
          return "/dashboard/sender/senderDashboard"
        case "receiver":
          return "/dashboard/receiver/receiverDashboard"
        default:
          return "/login"
      }
    }
  
    const handleButtonClick = () => {
      navigate(getDashboardPath())
    }
  return (
    <div className="space-y-32 pb-20">

      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-xs"
          style={{ backgroundImage: `url(${bg})` }}
        ></div>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black md:bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
            Powering Smart & Reliable <br /> Parcel Delivery
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            A centralized platform to manage, track, and deliver parcels
            efficiently with speed, security, and transparency.
          </p>

          
          {userId ? (
              <Button className="cursor-pointer px-12 py-3 bg-indigo-600 text-white font-semibold rounded-[10px] text-lg hover:bg-indigo-700 transition duration-300" size={"lg"} onClick={handleButtonClick}>
                Get Started
              </Button>
            ) : (
              <Link to={"/login"} className="cursor-pointer px-12 py-3 bg-indigo-600 text-white font-semibold rounded-[10px] text-lg hover:bg-indigo-700 transition duration-300">
                Get Started
              </Link>
          )}
        </div>
      </section>


      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6">
        <img
          src={mision}
          alt="Mission"
          className="rounded-2xl shadow-lg"
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
      <section className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-6">
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
          className="rounded-2xl shadow-lg"
        />
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto text-center px-6">
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
              className="
                group
                p-6
                border
                rounded-2xl
                transition-all
                duration-300
                ease-out
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={team.image}
                  alt={team.title}
                  className="
                    w-full
                    h-56
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              <h3 className="text-xl font-semibold mt-4">{team.title}</h3>

              <p className="text-gray-600 text-sm mt-2">
                Dedicated professionals ensuring smooth and reliable deliveries.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto text-center px-6">
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
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition"
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
