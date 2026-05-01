import { useEffect } from "react";

export default function CategoryModal({ category, onClose, navigate }) {
    if (!category) return null;

    // useEffect(() => {
    //     const scrollY = window.scrollY;

    //     const scrollbarWidth =
    //         window.innerWidth - document.documentElement.clientWidth;

    //     document.body.style.setProperty(
    //         "--scrollbar-comp",
    //         `${scrollbarWidth}px`
    //     );

    //     document.body.classList.add("modal-open");

    //     return () => {
    //         document.body.classList.remove("modal-open");
    //         document.body.style.removeProperty("--scrollbar-comp");

    //         requestAnimationFrame(() => {
    //             window.scrollTo(0, scrollY);
    //         });
    //     };
    // }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* PANEL */}
            <div
                className="
          relative w-full 
          sm:w-[480px] 

          h-[85vh] sm:h-auto 
          max-h-[90vh]

          bg-slate-900 
          rounded-t-3xl sm:rounded-2xl 

          flex flex-col
          border border-white/10 
          shadow-2xl
        "
            >

                {/* DRAG HANDLE */}
                <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-4"></div>

                {/* HEADER */}
                <div className="flex justify-between items-center px-5 mb-3">
                    <div>
                        <h2 className="text-lg font-semibold">
                            {category.displayName}
                        </h2>
                        <p className="text-xs text-slate-400">
                            {category.subjects.length} subjects
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
              h-9 w-9 flex items-center justify-center
              rounded-lg bg-white/5 hover:bg-white/10
              text-slate-400 hover:text-white
              transition
            "
                    >
                        ✕
                    </button>
                </div>

                {/* CONTENT (SCROLLABLE) */}
                <div className="px-5 pb-5 overflow-y-auto overscroll-contain flex-1">

                    <div className="grid grid-cols-2 gap-3">
                        {category.subjects.map((sub) => (
                            <div
                                key={sub._id}
                                onClick={() => {
                                    onClose();

                                    setTimeout(() => {
                                        navigate(`/subject/${sub._id}`);
                                    }, 0);
                                }}
                                className="
                  p-3 rounded-xl 
                  bg-white/5 hover:bg-white/10 
                  border border-white/10 
                  text-sm text-center 
                  cursor-pointer 
                  transition hover:scale-105
                "
                            >
                                {sub.displayName}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}