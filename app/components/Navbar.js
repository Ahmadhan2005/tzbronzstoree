"use client";
import Link from "next/link";
import {
  HomeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }
    const syncUser = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // handleAuthClick sudah tidak digunakan karena tidak ada login/logout

  return (
    <nav className="bg-white/80 backdrop-blur border-b border-purple-100 shadow-sm px-2 sm:px-6 py-2 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded-full w-9 h-9 flex items-center justify-center shadow overflow-hidden">
            <img
              src="/logo/LOGO.png"
              alt="Logo"
              className="object-cover w-9 h-9"
            />
          </div>
          <span className="text-lg font-bold text-purple-700 tracking-wide font-sans uppercase">
            Tzbronzstore
          </span>
        </Link>
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 px-2 py-1 rounded-md font-semibold text-purple-700 hover:bg-purple-50 transition"
          >
            <HomeIcon className="h-5 w-5" /> <span className="hidden sm:inline">Home</span>
          </Link>
          {/* Riwayat & Logout dihilangkan */}
          {/* Tampilkan Dashboard jika admin */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-1 px-2 py-1 rounded-md font-semibold text-purple-700 hover:bg-purple-50 transition"
            >
              <Cog6ToothIcon className="h-5 w-5" /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
          {/* Komunitas */}
          <a
            href="https://chat.whatsapp.com/KSR75n9iyrE4YVv1J7LCmz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-md font-semibold text-purple-700 hover:bg-purple-50 transition"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M16.72 11.06a6 6 0 10-2.18 2.18l2.47.66a1 1 0 001.26-1.26l-.66-2.47z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Komunitas</span>
          </a>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <svg
            className="w-7 h-7 text-purple-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-purple-100 shadow-sm px-4 py-2 animate-fade-in">
          <Link
            href="/"
            className="flex items-center gap-2 py-2 text-purple-700 font-semibold hover:bg-purple-50 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            <HomeIcon className="h-5 w-5" /> Home
          </Link>
          {/* Riwayat & Logout dihilangkan */}
          {/* Pengaturan bisa dihapus jika tidak diperlukan */}
          {/* Tampilkan Dashboard jika admin */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="flex items-center gap-2 py-2 text-purple-700 font-semibold hover:bg-purple-50 rounded transition"
              onClick={() => setMenuOpen(false)}
            >
              <Cog6ToothIcon className="h-5 w-5" /> Dashboard
            </Link>
          )}
          {/* Komunitas */}
          <a
            href="https://chat.whatsapp.com/KSR75n9iyrE4YVv1J7LCmz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 text-green-700 font-semibold hover:bg-green-50 rounded transition"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M16.72 11.06a6 6 0 10-2.18 2.18l2.47.66a1 1 0 001.26-1.26l-.66-2.47z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Komunitas
          </a>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </nav>
  );
}
