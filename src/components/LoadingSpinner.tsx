export function LoadingSpinner() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-paper">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin border-2 border-accent border-t-transparent rounded-full" />
                <div className="text-[10px] font-mono text-accent animate-pulse tracking-widest uppercase">INITIALIZING...</div>
            </div>
        </div>
    )
}
