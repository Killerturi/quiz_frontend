import React from "react";

export default function SearchBox({
    query,
    setQuery,
    results,
    setResults,
    show,
    setShow,
    searchRef,
    navigate,
    onCategorySelect,
}) {
    return (
        <div ref={searchRef} className="w-full relative">
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShow(true)}
                placeholder="Search subjects or categories..."
                className="
          w-full px-4 pr-10 py-2 text-sm rounded-full 
          bg-white/5 border border-white/10 
          text-white placeholder:text-slate-400 
          outline-none focus:bg-white/10 focus:border-indigo-400
        "
            />

            {query && (
                <button
                    onClick={() => {
                        setQuery("");
                        setShow(false);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                    ✕
                </button>
            )}

            {show && query && (
                <div className="absolute mt-2 w-full bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-2 z-50">

                    {results.subjects.map((s) => (
                        <div
                            key={s._id}
                            onClick={() => {
                                navigate(`/subject/${s._id}`);
                                setShow(false);
                            }}
                            className="px-3 py-2 rounded hover:bg-white/10 text-sm flex justify-between cursor-pointer"
                        >
                            <span>{s.displayName}</span>
                            <span className="text-xs text-slate-400">
                                {s.categoryId?.displayName}
                            </span>
                        </div>
                    ))}

                    {results.categories.map((c) => (
                        <div
                            key={c._id}
                            onClick={() => {
                                setShow(false);
                                setQuery("");
                                onCategorySelect?.(c);
                            }}
                            className="px-3 py-2 rounded hover:bg-white/10 text-sm cursor-pointer"
                        >
                            {c.displayName}
                        </div>
                    ))}

                    {results.subjects.length === 0 &&
                        results.categories.length === 0 && (
                            <div className="text-center text-slate-400 text-sm py-3">
                                No results found
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}