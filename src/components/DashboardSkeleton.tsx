import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const DashboardSkeleton = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Top metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <Skeleton height={20} width={120} className="mb-2" /> {/* Title */}
            <Skeleton height={32} width={80} /> {/* Value */}
          </div>
        ))}
      </div>

      {/* Charts / larger cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow h-64"
          >
            <Skeleton height="100%" /> {/* Chart skeleton */}
          </div>
        ))}
      </div>

      {/* Table or list cards */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <Skeleton height={30} width={150} className="mb-4" /> {/* Table title */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 mb-2">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={100} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardSkeleton
