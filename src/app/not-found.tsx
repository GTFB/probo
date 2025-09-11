import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Page Not Found
        </p>
        <Button asChild className="mt-6">
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
