import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ProtectedRoutes(props: any) {
  const { Components } = props
  const navigate = useNavigate()

  useEffect(() => {
    let login = localStorage.getItem("token")
    if (!login) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <div>
        <Components />{" "}
      </div>
    </>
  )
}

export default ProtectedRoutes
