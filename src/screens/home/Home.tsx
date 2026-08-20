import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Home() {
  const login = localStorage.getItem("token")
  return (
    <>
      <div className="h-screen w-full bg-accent">
        <div className="flex items-center justify-between bg-gray-200 p-3">
          <Link to={"/"}>
            <h1 className="font-serif text-2xl font-extrabold">
              Authentication{" "}
              <span className="text-3xl text-blue-800">System</span>
            </h1>
          </Link>
          <div className="flex cursor-pointer gap-2">
            {login ? (
              <Link to={"/dashboard"}>
                <Button variant={"secondary"}>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to={"/login"}>
                  <Button variant={"outline"}>Login</Button>
                </Link>
                <Link to={"/SignUp "}>
                  <Button variant={"outline"}>SignUp</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
