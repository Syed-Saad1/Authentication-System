import { cn } from "@/lib/utils"

export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      data-slot="field"
      className={cn("", className)}
      {...props}
    />
  )
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-md font-medium text-gray-500", className)}
      {...props}
    />
  )
}
export function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("mt-2 text-xs font-medium text-red-500", className)}
      {...props}
    />
  )
}
