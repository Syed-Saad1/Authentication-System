import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export const DashboardScreen = () => {
  return (
    <>
      <div>
        <div className="h-screen w-full bg-accent">
          <div className="flex items-center justify-between bg-gray-200 p-3">
            <Link to={"/dashboard"}>
              <span className="text-3xl font-bold text-blue-800">
                Dashboard
              </span>
            </Link>
            <div className="flex cursor-pointer gap-2">
              <Link to={"/profile"}>
                <Button variant={"secondary"}>View Profile</Button>
              </Link>
              <Link to={"/CPassword"}>
                <Button variant={"outline"}>Change Password</Button>
              </Link>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  )
}
