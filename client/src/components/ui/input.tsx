import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isValid?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, isValid, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const hasValue = props.value || props.defaultValue || (ref && (ref as any).current?.value)

    return (
      <div className="relative w-full group">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            isValid && "border-primary focus-visible:ring-primary",
            className
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          {...props}
        />
        {label && (
          <motion.label
            initial={false}
            animate={{
              y: (isFocused || hasValue) ? -20 : 0,
              scale: (isFocused || hasValue) ? 0.85 : 1,
              x: (isFocused || hasValue) ? -4 : 0,
              color: isFocused ? "var(--color-primary)" : "var(--color-muted-foreground)"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-3 top-2.5 pointer-events-none text-muted-foreground origin-left"
          >
            {label}
          </motion.label>
        )}
        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 10 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
            >
              <CheckCircle2 className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
