"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  whileHoverScale?: number
  whileTapScale?: number
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, children, whileHoverScale = 1.05, whileTapScale = 0.95, ...props }, ref) => {
    return (
      <motion.div whileHover={{ scale: whileHoverScale }} whileTap={{ scale: whileTapScale }} className="inline-block">
        <Button className={cn(className)} ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)
AnimatedButton.displayName = "AnimatedButton"

