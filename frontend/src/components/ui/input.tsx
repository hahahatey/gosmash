// import * as React from "react"

// import { cn } from "@/lib/utils"

// export interface InputProps extends React.ComponentProps<"input"> {
//   startIcon?: React.ReactNode
//   endIcon?: React.ReactNode
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, startIcon, endIcon, ...props }, ref) => {
//     if (startIcon || endIcon) {
//       return (
//         <div className="relative w-full">
//           {startIcon && (
//             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//               {startIcon}
//             </div>
//           )}
//           <input
//             type={type}
//             className={cn(
//               "flex h-10 w-full rounded-md border border-input bg-background py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//               startIcon && "pl-11 pr-3",
//               endIcon && "pr-10 pl-3",
//               startIcon && endIcon && "px-10",
//               className
//             )}
//             ref={ref}
//             {...props}
//           />
//           {endIcon && (
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//               {endIcon}
//             </div>
//           )}
//         </div>
//       )
//     }

//     return (
//       <input
//         type={type}
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Input.displayName = "Input"

// export { Input }

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.memo(React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-input bg-background px-3 text-base text-foreground transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // startIcon && "pr-2",
          // endIcon && "pl-2",
          // startIcon && endIcon && "px-10",
          className
        )}
      >
        {startIcon && (
          <div className="text-muted-foreground pointer-events-none pr-1">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          className="bg-transparent text-base outline-none md:text-sm pl-1"
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="text-muted-foreground pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>
    )
  }
))

Input.displayName = "Input"

export { Input }
