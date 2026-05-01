import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategorySection({
    categories,
    selectedCategory,
    setSelectedCategory,
}) {
    const navigate = useNavigate();

    return (
        <section className="mt-10 px-4 sm:px-6">

            {/* TITLE */}
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
                🚀 <span>Explore Categories</span>
            </h2>

            <div className="space-y-6">

                {categories.map((cat, i) => (
                    <motion.div
                        key={cat._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="
              relative rounded-2xl 
              bg-gradient-to-br from-slate-900/90 to-slate-800/70 
              backdrop-blur-xl 
              border border-white/10 
              p-5
              shadow-[0_12px_30px_rgba(0,0,0,0.7)]
              overflow-hidden
            "
                    >

                        {/* GLOW */}
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>

                        {/* HEADER */}
                        <div className="flex items-start justify-between gap-3 mb-5">

                            <div className="min-w-0">
                                <h3 className="text-base font-semibold text-white leading-tight break-words">
                                    {cat.displayName}
                                </h3>

                                <p className="text-xs text-slate-400 mt-1">
                                    {cat.subjects.length} subjects
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className="
                  shrink-0
                  text-xs px-3 py-2 rounded-xl 
                  bg-white/10 hover:bg-white/20 
                  text-white 
                  transition
                  backdrop-blur
                "
                            >
                                View All →
                            </button>

                        </div>

                        {/* SUBJECT CHIPS */}
                        <motion.div
                            className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: {
                                    transition: { staggerChildren: 0.08 },
                                },
                            }}
                        >
                            {cat.subjects.map((sub) => (
                                <motion.div
                                    key={sub._id}
                                    onClick={() => navigate(`/subject/${sub._id}`)}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.85 },
                                        visible: { opacity: 1, scale: 1 },
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="
                    shrink-0 px-4 py-2.5 rounded-xl 
                    bg-gradient-to-br from-white/10 to-white/5
                    border border-white/10 
                    text-xs text-white 
                    cursor-pointer 
                    transition-all duration-200
                    hover:bg-white/15
                    active:scale-95
                  "
                                >
                                    {sub.displayName}
                                </motion.div>
                            ))}
                        </motion.div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}