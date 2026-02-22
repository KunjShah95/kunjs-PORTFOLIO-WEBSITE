import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function InitialLoader() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1600)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
                    }}
                    className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Logo mark */}
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
                        >
                            <span className="text-white font-bold text-xl">K</span>
                        </motion.div>

                        {/* Progress bar */}
                        <div className="w-40 h-[2px] bg-border rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.4, ease: 'easeInOut' }}
                                className="h-full bg-primary rounded-full"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xs text-muted font-medium tracking-wide"
                        >
                            Loading portfolio...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
