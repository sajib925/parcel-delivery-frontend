import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

export default function CTASection() {
  const navigate = useNavigate()
  
    const { data } = useUserInfoQuery(undefined)
  
    const user = data?.data
    const userRole = user?.role
  
  
    // dynamic dashboard path
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
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24 text-center space-y-6">
          <h3 className="text-3xl lg:text-4xl font-bold text-balance">
            Ready to revolutionize parcel management?
          </h3>
          <p className="text-lg text-primary-foreground/80 text-balance">
            Join ParcelHub today and experience seamless logistics management
          </p>
          <Button size="lg" variant="secondary" className="gap-2 cursor-pointer" onClick={handleButtonClick}>
            Launch Dashboard <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
  )
}
