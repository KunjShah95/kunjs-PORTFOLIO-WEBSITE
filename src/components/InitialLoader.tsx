import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function InitialLoader() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
                    }}
                    className="fixed inset-0 z-[100] bg-bg flex items-center justify-center overflow-hidden"
                >
                    {/* Industrial Grid Background for Loader */}
                    <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <pattern id="loader-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-primary/30" />
                                </pattern>
                            </defs>
                            <rect width="100" height="100" fill="url(#loader-grid)" />
                        </svg>
                    </div>

                    <div className="relative flex flex-col items-center gap-8">
                        {/* Animated Logo / Mark */}
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-16 h-16 bg-primary text-white flex items-center justify-center text-3xl font-black relative z-10"
                            >
                                K
                            </motion.div>
                            <motion.div
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0, 0.3]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-primary blur-xl"
                            />
                        </div>

                        {/* Progress Bar */}
                        <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="absolute inset-0 bg-primary"
                            />
                        </div>

                        {/* Status Text */}
                        <div className="flex flex-col items-center gap-1">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-[10px] txt-mono text-primary font-bold tracking-[0.4em] uppercase"
                            >
                                Initializing_System
                            </motion.div>
                            <div className="text-[10px] txt-mono text-muted/40 uppercase tracking-widest">
                                v2.1.0 // Void_OS
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
