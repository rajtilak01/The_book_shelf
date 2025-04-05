"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { JSX } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  staggerChildren?: number
  tag?: keyof JSX.IntrinsicElements
}

export function AnimatedText({
  text,
  className,
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  tag = "h2",
}: AnimatedTextProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay * i,
      },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  }

  const Tag = tag as keyof JSX.IntrinsicElements

  return (
    <motion.div
      className="overflow-hidden flex flex-wrap"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, index) => (
        <motion.span key={index} className={cn("mr-1", className)} variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

