import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import * as Yup from "yup"
import { useFormik } from "formik"
import { FieldDescription, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"

function Profile() {
  const token = localStorage.getItem("token")
  const url = "http://192.168.100.6:4000/api/profile/view"
  const editurl = "http://192.168.100.6:4000/api/profile/edit"

  const [isloading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsFetching(true)
        const response = await axios.get(url, {
          headers: {
            token: token,
          },
        })
        setData(response.data)
      } catch (error: any) {
        toast.error(error.response?.data || "Failed to fetch profile")
      }
      {
        setIsFetching(false)
      }
    }

    fetchUser()
  }, [token])

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true)
      const response = await axios.patch(editurl, values, {
        headers: {
          token: token,
        },
      })
      toast.success(response.data || "Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.response?.data || "Server error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const ValidationScheme = Yup.object({
    firstName: Yup.string().required("firstName is Required"),
    lastName: Yup.string().required("lastName is Required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is Required"),
  })

  const initialValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
  }

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ValidationScheme,
    onSubmit,
  })

  const Navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    Navigate("/login")
  }

  const initialFirst = (data?.firstName ?? "").trim().charAt(0).toUpperCase()
  const initialLast = (data?.lastName ?? "").trim().charAt(0).toUpperCase()

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="h-dvh w-screen">
          <div className="grid size-full place-content-center bg-accent">
            <Link to={"/"}>
              <h1 className="mb-2 text-center font-serif text-2xl font-extrabold">
                Authentication{" "}
                <span className="text-3xl text-blue-800">System</span>
              </h1>
            </Link>
            <Card
              className={`flex ${errors.firstName || errors.lastName ? "h-112!" : "h-106!"} mt-3 px-4 md:w-118!`}
            >
              <CardHeader>
                <div className="items-centers flex justify-center">
                  {isFetching ? (
                    <Skeleton circle width={120} height={120} />
                  ) : (
                    <div className="items-centers flex h-30 w-30 flex-col justify-center rounded-full bg-gray-300">
                      <h1 className="text-center font-serif text-4xl font-bold">
                        {initialFirst}
                        {initialLast}
                      </h1>
                    </div>
                  )}
                </div>
                <CardDescription className="mt-1 text-center">
                  {isFetching ? (
                    <Skeleton width={180} height={16} />
                  ) : (
                    data?.about
                  )}{" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col">
                    <Label>First Name:</Label>
                    {isFetching ? (
                      <Skeleton width={200} height={40} className="mt-1" />
                    ) : (
                      <Input
                        className="w-50"
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        value={values?.firstName}
                      />
                    )}
                    {errors.firstName && (
                      <FieldDescription>
                        {" "}
                        {typeof errors.firstName === "string"
                          ? errors.firstName
                          : String(errors.firstName)}
                      </FieldDescription>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label>Last Name:</Label>
                    {isFetching ? (
                      <Skeleton width={200} height={40} className="mt-1" />
                    ) : (
                      <Input
                        className="w-50"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        value={values?.lastName}
                      />
                    )}
                    {errors.lastName && (
                      <FieldDescription>
                        {typeof errors.lastName === "string"
                          ? errors.lastName
                          : String(errors.lastName)}
                      </FieldDescription>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex w-full flex-col">
                    <Label>Email:</Label>
                    {isFetching ? (
                      <Skeleton height={40} className="mt-1" />
                    ) : (
                      <Input
                        name="email"
                        type="email"
                        className="w-full"
                        onChange={handleChange}
                        value={values?.email}
                      />
                    )}
                    {errors.email && (
                      <FieldDescription>
                        {" "}
                        {typeof errors.email === "string"
                          ? errors.email
                          : String(errors.email)}
                      </FieldDescription>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  onClick={handleLogout}
                  variant={"destructive"}
                  type="button"
                  disabled={isFetching}
                >
                  Logout
                </Button>
                <Button
                  type="submit"
                  variant={"Login"}
                  disabled={isloading || isFetching}
                >
                  {isloading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </>
  )
}

export default Profile
