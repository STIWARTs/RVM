"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  delay?: number
}

export function AnimatedCard({ className, children, delay = 0, ...props }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 border-green-100/50 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
