import { cn } from "@/lib/utils"
import { Icon } from "@iconify/react"
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  showTogglePassword?: boolean
}

function Input({
  className,
  type = "text",
  label,
  showTogglePassword = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const isPassword = type === "password"

  const inputType =
    isPassword && showTogglePassword
      ? showPassword
        ? "text"
        : "password"
      : type

  return (
    <div>
      {label && <label htmlFor={props.id}>{label}</label>}

      <div className="relative">
        <input
          {...props}
          type={inputType}
          data-slot="input"
          className={cn(
            "mt-2 h-12 w-80 min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            className
          )}
        />

        {isPassword && showTogglePassword && (
          <button
            type="button"
            className="absolute top-5 right-2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <Icon
                icon="mdi:eye-lock-open-outline"
                className="h-6 w-6 text-gray-400"
              />
            ) : (
              <Icon icon="mdi:eye" className="h-6 w-6 text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export { Input }
