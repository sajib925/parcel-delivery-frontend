
export default function HowToProcess() {

    return (
        <section className="container mx-auto px-6">
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
    )
}