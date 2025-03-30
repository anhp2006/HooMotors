"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial size
    resizeCanvas()

    // Resize listener
    window.addEventListener("resize", resizeCanvas)

    // Animation properties
    let time = 0
    const velocity = 0.0015

    // Animation function
    const animate = () => {
      const isDark = theme === "dark" || resolvedTheme === "dark"

      time += velocity

      // Create gradient
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width * Math.sin(time) * 0.5 + canvas.width * 0.5,
        canvas.height * Math.cos(time) * 0.5 + canvas.height * 0.5,
      )

      if (isDark) {
        // Dark mode: Red-black gradient
        gradient.addColorStop(0, "rgba(20, 20, 20, 1)")
        gradient.addColorStop(0.5, "rgba(30, 10, 10, 1)")
        gradient.addColorStop(0.7, "rgba(60, 15, 15, 1)")
        gradient.addColorStop(0.9, "rgba(80, 10, 10, 1)")
        gradient.addColorStop(1, "rgba(15, 15, 15, 1)")
      } else {
        // Light mode: Light gray-red gradient
        gradient.addColorStop(0, "rgba(250, 250, 250, 1)")
        gradient.addColorStop(0.5, "rgba(245, 240, 240, 1)")
        gradient.addColorStop(0.7, "rgba(245, 235, 235, 1)")
        gradient.addColorStop(0.9, "rgba(240, 220, 220, 1)")
        gradient.addColorStop(1, "rgba(250, 250, 250, 1)")
      }

      // Fill background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add some subtle noise/texture
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.5
        const opacity = Math.random() * 0.05

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme, resolvedTheme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ opacity: 0.95 }} />
}

