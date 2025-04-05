"use client"

import type React from "react"

import { motion } from "framer-motion"
import { pageTransition } from "@/lib/framer-animations"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition} className={className}>
      {children}
    </motion.div>
  )
}

