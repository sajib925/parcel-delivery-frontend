
export default function RolesSection() {
  return (
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground">For Every Role</h3>
          <p className="text-muted-foreground mt-2">Tailored experiences for different users</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Senders',
              features: [
                'Create and manage parcels',
                'Track shipments in real-time',
                'View delivery status',
                'Cancel parcels (when pending)',
                'Parcel history and analytics',
              ],
            },
            {
              title: 'Receivers',
              features: [
                'View incoming parcels',
                'Confirm delivery receipt',
                'Track incoming shipments',
                'Contact sender directly',
                'Delivery confirmation history',
              ],
            },
            {
              title: 'Administrators',
              features: [
                'Manage all parcels system-wide',
                'Update parcel status',
                'Block suspicious parcels',
                'Monitor users and activity',
                'Revenue and analytics dashboard',
              ],
            },
          ].map((role, idx) => (
            <div key={idx} className="bg-card p-8 rounded-lg border border-border">
              <h4 className="text-xl font-bold text-foreground mb-4">{role.title}</h4>
              <ul className="space-y-3">
                {role.features.map((feature, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="text-primary font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
  )
}
