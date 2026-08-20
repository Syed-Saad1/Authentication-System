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
import axios from "axios"
import { useFormik, type FormikHelpers } from "formik"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import * as Yup from "yup"
import { Icon } from "@iconify/react"

const ValidationScheme = Yup.object({
  email: Yup.string()
    .email("Invalid Emial Address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "password is at least 8 characters")
    .required("Password is Required"),
})

export const LoginScreen = () => {
  const [isloading, setIsLoading] = useState(false)
  const navigation = useNavigate()
  const intailValues = {
    email: "",
    password: "",
  }

  const url = "http://192.168.100.6:4000/api/login"

  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      setIsLoading(true)

      const response = await axios.post(url, values)
      resetForm()

      localStorage.setItem("token", response.data.token)
      navigation("/")
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
            className={`flex ${errors.email || errors.password ? "h-110!" : "h-100!"} w-96! justify-start px-4 py-4`}
          >
            <CardHeader className="w-full">
              <CardTitle className="flex flex-col items-center justify-center">
                <h1 className="mt-4 text-4xl font-semibold"> Log in</h1>
                <p className="text-md mt-2 font-medium">
                  New to this Site?{" "}
                  <Link
                    to={"/SignUp "}
                    className="cursor-pointer border-b border-b-black font-semibold"
                  >
                    Sign Up
                  </Link>
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 flex w-full flex-col items-center justify-center">
              <Field>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
                {errors.email && (
                  <FieldDescription>{errors.email}</FieldDescription>
                )}
              </Field>
              <Field className="mt-5">
                <Label>Password:</Label>
                <Input
                  showTogglePassword={true}

                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="EnterPassword"
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
                {isloading ? <Icon icon="line-md:loading-loop" /> : "Login"}
              </Button>
            </CardFooter>
          </Card>{" "}
        </div>
      </div>
    </form>
  )
}
