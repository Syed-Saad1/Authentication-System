import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  //   CardBtn,
} from "@/components/ui/card"
import { Field, FieldDescription, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFormik, type FormikHelpers } from "formik"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import * as Yup from "yup"
import toast from "react-hot-toast"
import { Icon } from "@iconify/react"

const ValidationScheme = Yup.object({
  email: Yup.string().required("Email is Required"),
  oldPassword: Yup.string().required("oldPassword is Required"),
  newPassword: Yup.string().required("newPassword is Required"),
})

export const ChangePassword = () => {
  const [isloading, setIsLoading] = useState(false)
  const Navigate = useNavigate()
  const intailValues = {
    email: "",
    oldPassword: "",
    newPassword: "",
  }

  const url = "http://192.168.100.6:4000/api/changePassword"

  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      setIsLoading(true)
      Navigate("/login")
      await axios.patch(url, values)
      resetForm()
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
            className={`flex ${errors.email || errors.oldPassword || errors.newPassword ? "h-114!" : "h-100!"} w-96! justify-start px-4 py-4`}
          >
            <CardHeader className="w-full">
              <CardTitle className="flex flex-col">
                <h1 className="mt-2 text-2xl font-semibold">Change Password</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-1 flex w-full flex-col items-center justify-center">
              <Field>
                <Label htmlFor="email">Email :</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  placeholder="Enter Your Current Email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <FieldDescription>{errors.email}</FieldDescription>
                )}
              </Field>
              <Field className="mt-1.5">
                <Label htmlFor="oldPassword">Old Password:</Label>
                <Input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  value={values.oldPassword}
                  placeholder="Enter Your oldPassword"
                  showTogglePassword={true}
                  onChange={handleChange}
                />
                {errors.oldPassword && (
                  <FieldDescription>{errors.oldPassword}</FieldDescription>
                )}
              </Field>
              <Field className="mt-1.5">
                <Label htmlFor="newPassword">New Password:</Label>
                <Input
                  type="password"
                  showTogglePassword={true}

                  name="newPassword"
                  id="newPassword"
                  value={values.newPassword}
                  placeholder="Set a new Password"
                  onChange={handleChange}
                />
                {errors.newPassword && (
                  <FieldDescription>{errors.newPassword}</FieldDescription>
                )}
              </Field>
            </CardContent>
            <CardFooter className="flex w-full flex-col items-center justify-center">
              <Button
                variant={"Login"}
                className="w-full cursor-pointer py-4 text-lg"
                disabled={isloading}
              >
                {isloading ? (
                  <Icon icon="line-md:loading-loop" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </CardFooter>
          </Card>{" "}
        </div>
      </div>
    </form>
  )
}

export default ChangePassword
