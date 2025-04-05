"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"
import { bookHoverEffect } from "@/lib/framer-animations"

interface AnimatedCardProps extends CardProps {
  children: React.ReactNode
  whileHoverScale?: number
  whileTapScale?: number
  className?: string
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, whileHoverScale = 1.03, whileTapScale = 0.98, ...props }, ref) => {
    return (
      <motion.div
        initial="rest"
        whileHover="hover"
        whileTap={{ scale: whileTapScale }}
        variants={bookHoverEffect}
        className="h-full"
      >
        <Card className={cn("h-full transition-all duration-300", className)} ref={ref} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  },
)
AnimatedCard.displayName = "AnimatedCard"

