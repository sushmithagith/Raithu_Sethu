import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const videoRef = useRef(null);
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current) return;

    const goTo = () => {
      if (redirected.current) return;
      redirected.current = true;
      if (isAuthenticated) {
        const dashboard =
          role === "farmer"
            ? "/farmer/dashboard"
            : role === "admin"
              ? "/admin"
              : "/buyer/marketplace";
        navigate(dashboard, { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    const fallback = setTimeout(goTo, 8000);

    const video = videoRef.current;
    if (video) {
      const handleEnd = () => goTo();
      video.addEventListener("ended", handleEnd);
      return () => {
        clearTimeout(fallback);
        video.removeEventListener("ended", handleEnd);
      };
    }

    return () => clearTimeout(fallback);
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-teal-950 flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)", backgroundSize: "50px 50px" }} />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-center gap-8 px-4">
        {/* Logo */}
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/25 animate-fade-in">
          <Leaf size={48} className="text-white" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-fade-in delay-100">
          Raithu Sethu
        </h1>
        <p className="text-green-300/70 text-sm md:text-base -mt-4 animate-fade-in delay-150">
          Farm-to-Market Platform
        </p>

        {/* Video */}
        <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-black/30 animate-fade-in delay-200">
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            className="w-full h-auto"
          />
        </div>

        {/* Loading indicator */}
        <div className="flex gap-1.5 animate-fade-in delay-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
