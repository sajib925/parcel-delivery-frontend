import { Package, Globe, Users, BarChart3, Zap, Lock } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Package,
      title: 'Easy Parcel Creation',
      description: 'Create and send parcels in minutes with our intuitive form. Automatic fee calculation based on weight and type.',
    },
    {
      icon: Globe,
      title: 'Real-Time Tracking',
      description: 'Track your parcels in real-time with live status updates. Know exactly where your package is at any moment.',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Separate dashboards for senders, receivers, and admins. Each role has customized views and actions.',
    },
    {
      icon: BarChart3,
      title: 'Admin Dashboard',
      description: 'Manage all parcels, monitor users, update status, and block suspicious parcels with advanced controls.',
    },
    {
      icon: Zap,
      title: 'Fast Operations',
      description: 'Lightning-fast status updates and delivery confirmations. Optimized for high-volume parcel operations.',
    },
    {
      icon: Lock,
      title: 'Secure & Reliable',
      description: 'JWT authentication, role-based security, and encrypted data. Your parcel data is always protected.',
    },
  ]

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground">Powerful Features</h3>
          <p className="text-muted-foreground mt-2">Everything you need to manage parcels efficiently</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
