import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const LOADER_MS = 250

const SkeletonBackground = () => (
    <div className="absolute inset-0 p-8 sm:p-16 opacity-[0.03] overflow-hidden pointer-events-none flex flex-col gap-8 select-none">
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
            <div className="w-24 h-8 bg-current rounded" />
            <div className="flex gap-4">
                <div className="w-16 h-4 bg-current rounded hidden sm:block" />
                <div className="w-16 h-4 bg-current rounded hidden sm:block" />
                <div className="w-16 h-4 bg-current rounded hidden sm:block" />
            </div>
        </div>
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col gap-6 mt-12">
            <div className="w-3/4 max-w-3xl h-16 sm:h-24 bg-current rounded-lg" />
            <div className="w-1/2 max-w-xl h-6 bg-current rounded" />
            <div className="w-1/3 max-w-md h-6 bg-current rounded" />
            <div className="mt-8 flex gap-4">
                <div className="w-32 h-12 bg-current rounded-lg" />
                <div className="w-32 h-12 bg-current rounded-lg" />
            </div>
        </div>
    </div>
)

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
                    className="fixed inset-0 z-[100] bg-bg flex items-center justify-center overflow-hidden"
                >
                    <SkeletonBackground />
                    <div className="flex flex-col items-center gap-6 relative z-10">
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
                            Loading architecture…
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
