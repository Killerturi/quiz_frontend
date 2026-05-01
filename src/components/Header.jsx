import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { searchAll } from "../services/search.service";
import { logout } from "../utils/auth";
import SearchBox from "./SearchBox";

export default function Header({ onCategorySelect }) {
  const navigate = useNavigate();
  const searchRef = useRef();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ subjects: [], categories: [] });
  const [show, setShow] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const token =
    localStorage.getItem("user_token") ||
    sessionStorage.getItem("user_token");

  const email =
    localStorage.getItem("user_email") ||
    sessionStorage.getItem("user_email");

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    if (!query) {
      setResults({ subjects: [], categories: [] });
      return;
    }

    const t = setTimeout(async () => {
      try {
        const data = await searchAll(query);
        setResults(data);
        setShow(true);
      } catch (err) {
        console.error(err);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const close = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);



  return (
    <header className="sticky top-0 z-50 bg-blue-950/80 backdrop-blur border-b border-white/10">

      <div className="max-w-7xl mx-auto px-3 py-2">

        {/* ================= DESKTOP ================= */}
        {!isMobile && (
          <div className="flex items-center justify-between gap-4">

            {/* LEFT */}
            <NavLink to="/" className="flex items-center gap-2 text-white font-semibold text-sm">
              <img src="/logo.png" className="h-7 w-7" />
              <span>QUIZ</span>
            </NavLink>

            {/* SEARCH */}
            <div className="w-[60%] max-w-xl">
              <SearchBox
                query={query}
                setQuery={setQuery}
                results={results}
                setResults={setResults}
                show={show}
                setShow={setShow}
                searchRef={searchRef}
                navigate={navigate}
                onCategorySelect={onCategorySelect}
              />
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {token && (
                <div className="text-xs text-white/70 max-w-[140px] truncate">
                  {email}
                </div>
              )}

              {token ? (
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-1.5 rounded-full bg-white text-black text-xs"
                >
                  Login
                </button>
              )}
            </div>

          </div>
        )}

        {/* ================= MOBILE ================= */}
        {isMobile && (
          <div>

            {/* TOP ROW */}
            <div className="flex items-center justify-between">

              <NavLink to="/" className="flex items-center gap-2 text-white font-semibold text-sm">
                <img src="/logo.png" className="h-7 w-7" />
                <span>QUIZ</span>
              </NavLink>

              {token ? (
                <button
                  onClick={logout}
                  className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-1.5 rounded-full bg-white text-black text-xs"
                >
                  Login
                </button>
              )}

            </div>

            {/* SEARCH */}
            <div className="mt-2">
              <SearchBox
                query={query}
                setQuery={setQuery}
                results={results}
                setResults={setResults}
                show={show}
                setShow={setShow}
                searchRef={searchRef}
                navigate={navigate}
                onCategorySelect={onCategorySelect}
              />
            </div>

          </div>
        )}

      </div>
    </header>
  );
}