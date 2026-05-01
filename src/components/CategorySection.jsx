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

            <div className="space-y-5">

                {categories.map((cat, i) => (
                    <motion.div
                        key={cat._id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        viewport={{ once: true }}
                        className="
              relative rounded-2xl 
              bg-gradient-to-br from-slate-900/80 to-slate-800/60 
              backdrop-blur-xl 
              border border-white/10 
              p-4 sm:p-5 
              shadow-[0_10px_30px_rgba(0,0,0,0.6)]
              overflow-hidden
            "
                    >

                        {/* SOFT GLOW */}
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/10 blur-2xl rounded-full"></div>

                        {/* HEADER */}
                        <div className="flex items-start justify-between mb-4">

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
                                    {cat.displayName}
                                </h3>

                                <p className="text-xs text-slate-400 mt-1">
                                    {cat.subjects.length} subjects
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className="
                  text-xs px-3 py-1.5 rounded-full 
                  bg-white/10 hover:bg-white/20 
                  text-white transition
                  backdrop-blur
                "
                            >
                                View All →
                            </button>

                        </div>

                        {/* SUBJECT CHIPS */}
                        <motion.div
                            className="flex gap-2 overflow-x-auto pb-1"
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
                    bg-white/5 hover:bg-white/10 
                    border border-white/10 
                    text-xs text-white 
                    cursor-pointer 
                    transition-all duration-200
                    backdrop-blur
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