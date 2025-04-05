"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  className = "",
  formatter = (value) => value.toLocaleString(),
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(from + progress * (to - from))

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }

      const startAnimation = () => {
        animationFrame = requestAnimationFrame(step)
      }

      const timeoutId = setTimeout(startAnimation, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [inView, from, to, duration, delay])

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {formatter(count)}
    </motion.div>
  )
}

