import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFormik, type FormikHelpers } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { Icon } from "@iconify/react"

const ValidationScheme = Yup.object({
  firstName: Yup.string()
    .min(3, "First Name is at least 3 characters")
    .max(8, "First Name is max 8 characters")
    .required("First Name is Required"),
  lastName: Yup.string()
    .min(3, "Last Name is at least 3 characters")
    .max(8, "last Name is max 8 characters")
    .required("Last Name is Required"),
  email: Yup.string()
    .email("Invalid Emial Address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "password is at least 8 characters")
    .required("Password is Required"),
})

export const SignUpScreen = () => {
  const navigation = useNavigate()

  const [isloading, setIsLoading] = useState(false)

  const intailValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }

  const url = "http://192.168.100.6:4000/api/signUp"

  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      setIsLoading(true)
      const response = await axios.post(url, values)
      localStorage.setItem("token", response.data.token)
      resetForm()
      navigation("/login")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "Server error occurred")
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: intailValues,
    validationSchema: ValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  })

  return (
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
            className={`flex ${errors.email || errors.password || errors.firstName || errors.lastName ? "h-144!" : "h-128!"} w-96! justify-start px-4 py-4`}
          >
            <CardHeader className="w-full">
              <CardTitle className="flex flex-col items-center justify-center">
                <h1 className="mt-2 text-4xl font-semibold">SignUp</h1>
                <p className="text-sm font-medium">
                  If You are Alerady SignIn go to this Site?{" "}
                  <Link
                    to={"/login "}
                    className="cursor-pointer border-b border-b-black font-semibold"
                  >
                    Login{" "}
                  </Link>
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-1 flex w-full flex-col items-center justify-center">
              <Field>
                <Label htmlFor="firstName">first Name:</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={values.firstName}
                  placeholder="Enter Your firstName"
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <FieldDescription>{errors.firstName}</FieldDescription>
                )}
              </Field>
              <Field>
                <Label htmlFor="lastName">last Name:</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={values.lastName}
                  placeholder="Enter Your lastName"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <FieldDescription>{errors.lastName}</FieldDescription>
                )}
              </Field>
              <Field className="mt-1.5">
                <Label htmlFor="email">Email:</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
                {errors.email && (
                  <FieldDescription>{errors.email}</FieldDescription>
                )}
              </Field>
              <Field className="mt-1.5">
                <Label htmlFor="Pas">Password:</Label>
                <Input
                  showTogglePassword={true}
                  type="password"
                  name="password"
                  id="Pas"
                  value={values.password}
                  placeholder="Create Your Password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <FieldDescription>{errors.password}</FieldDescription>
                )}
              </Field>
            </CardContent>
            <CardFooter className="flex w-full flex-col items-center justify-center">
              <Button
                variant={"Login"}
                className="w-full cursor-pointer py-4 text-lg"
                type="submit"

                disabled={isloading}
              >
                {isloading ? <Icon icon="line-md:loading-loop" /> : "Signup"}
              </Button>
            </CardFooter>
          </Card>{" "}
        </div>
      </div>
    </form>
  )
}

export default SignUpScreen
