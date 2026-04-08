import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const LOADER_MS = 900

export function InitialLoader() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduceMotion) {
            setLoading(false)
            return
        }
        const timer = window.setTimeout(() => setLoading(false), LOADER_MS)
        return () => window.clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] }
                    }}
                    className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 font-display font-semibold text-white text-xl"
                        >
                            K
                        </motion.div>

                        <div className="w-40 h-[2px] bg-border rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: Math.min(LOADER_MS, 1200) / 1000, ease: 'easeInOut' }}
                                className="h-full bg-primary rounded-full"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs text-muted font-medium tracking-wide"
                        >
                            Loading portfolio…
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
