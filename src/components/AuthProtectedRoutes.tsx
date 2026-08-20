import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthProtectedRoutes(props: any) {
  const { AuthComponents } = props
  const navigate = useNavigate()

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token) {
      navigate("/dashboard")
    }
  }, [])

  return (
    <>
      <div>
        <div>
          <AuthComponents />
        </div>
      </div>
    </>
  )
}
