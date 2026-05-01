import React from "react";

export default function Loader({ message = "Loading" }) {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-md bg-black/20">

            {/* CLOCK */}
            <div className="relative w-40 h-40 flex items-center justify-center">

                {/* GLOW */}
                <div className="absolute w-56 h-56 bg-indigo-500/10 blur-3xl rounded-full"></div>

                {/* TICKS */}
                {[...Array(12)].map((_, i) => (
                    <span
                        key={i}
                        className="tick"
                        style={{
                            transform: `rotate(${i * 30}deg) translateY(-60px)`
                        }}
                    />
                ))}

                {/* HAND */}
                <div className="hand"></div>

                {/* CENTER DOT */}
                <div className="center-dot"></div>
            </div>

            {/* TEXT */}
            <div className="mt-6 text-slate-300 text-sm tracking-wide flex items-center gap-1">
                {message}
                <span className="dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>

        </div>
    );
}