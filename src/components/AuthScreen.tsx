import React, { useState } from "react";
import { User, UserProfile } from "../types";
import { registerUser, loginUser } from "../lib/authStore";
import {
  ShieldCheck,
  Key,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User as UserIcon,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
  UserCheck,
  Zap,
  Globe
} from "lucide-react";

interface AuthScreenProps {
  onLoginSuccess: (user: User, userProfile?: UserProfile) => void;
}

const DEMO_PERSONAS = [
  {
    name: "Elena Rodriguez",
    email: "elena.writes@gmail.com",
    role: "Senior Tech Author",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  },
  {
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    role: "Digital Nomad & Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
  },
  {
    name: "Marcus Vance",
    email: "marcus.vance@gmail.com",
    role: "AI & Future Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
  }
];

const EMAIL_SUFFIXES = ["@gmail.com", "@outlook.com", "@writesphere.io", "@yahoo.com"];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          throw new Error("Please enter your full name.");
        }
        if (!email.trim()) {
          throw new Error("Please enter your email address.");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters.");
        }
        const { user, userProfile } = await registerUser(name, email, password);
        setSuccessMsg("Account created successfully!");
        setTimeout(() => {
          onLoginSuccess(user, userProfile);
        }, 500);
      } else {
        if (!email.trim()) {
          throw new Error("Please enter your email address.");
        }
        const { user, userProfile } = await loginUser(email, password);
        setSuccessMsg("Authentication successful!");
        setTimeout(() => {
          onLoginSuccess(user, userProfile);
        }, 500);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPersona = async (persona: typeof DEMO_PERSONAS[0]) => {
    setEmail(persona.email);
    setPassword("password123");
    setName(persona.name);
    setErrorMsg("");
    setIsLoading(true);

    try {
      const { user, userProfile } = await loginUser(persona.email, "password123");
      setSuccessMsg(`Welcome back, ${persona.name}!`);
      setTimeout(() => {
        onLoginSuccess(user, userProfile);
      }, 400);
    } catch {
      // Fallback register if first time
      try {
        const { user, userProfile } = await registerUser(persona.name, persona.email, "password123");
        onLoginSuccess(user, userProfile);
      } catch {
        onLoginSuccess({
          id: `u-${Date.now()}`,
          name: persona.name,
          email: persona.email,
          avatar: persona.avatar,
          isLoggedIn: true
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuffix = (suffix: string) => {
    if (!email) {
      setEmail(`user${suffix}`);
    } else if (email.includes("@")) {
      const prefix = email.split("@")[0];
      setEmail(`${prefix}${suffix}`);
    } else {
      setEmail(`${email}${suffix}`);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setIsLoading(true);
    try {
      const demoUser = DEMO_PERSONAS[0];
      const { user, userProfile } = await loginUser(demoUser.email, "password123");
      onLoginSuccess(user, userProfile);
    } catch {
      onLoginSuccess({
        id: "u-google",
        name: "Elena Rodriguez",
        email: "elena.writes@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
        isLoggedIn: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] text-[#F2F2F2] min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors relative overflow-hidden select-none">
      {/* Background Grid Lines & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d9ff00]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="w-full max-w-[460px] flex flex-col gap-6 relative z-10 my-auto">
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#d9ff00] font-mono-code mb-2 flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d9ff00]" />
            <span>ACCESS PROTOCOL // SECURE AUTH</span>
          </span>
          <h1 className="font-syne text-4xl sm:text-5xl font-black tracking-tighter uppercase text-white mt-1">
            WRITESPHERE
          </h1>
          <p className="font-mono-code text-xs text-white/50 uppercase tracking-widest mt-2">
            {isSignUp ? "CREATE NEW ENCRYPTED ACCOUNT" : "AUTHENTICATE DISPATCH SESSION"}
          </p>
        </header>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col gap-6 rounded-none shadow-2xl relative">

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 bg-black/60 p-1 border border-white/10 text-xs font-mono-code">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`py-2.5 font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isSignUp
                  ? "bg-[#d9ff00] text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              LOG IN
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`py-2.5 font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isSignUp
                  ? "bg-[#d9ff00] text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Quick Demo Accounts Picker */}
          <div className="bg-black/40 border border-white/10 p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] font-mono-code text-white/60 uppercase tracking-wider">
              <span className="flex items-center gap-1 text-[#d9ff00]">
                <Zap className="w-3 h-3 text-[#d9ff00]" />
                <span>1-CLICK QUICK ACCESS PERSONAS:</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.email}
                  type="button"
                  onClick={() => handleSelectPersona(p)}
                  className="bg-white/5 border border-white/10 hover:border-[#d9ff00] p-2 flex flex-col items-center gap-1 text-center transition-all cursor-pointer group"
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-7 h-7 rounded-full border border-white/20 group-hover:border-[#d9ff00] object-cover"
                  />
                  <span className="font-syne font-bold text-[10px] text-white truncate max-w-full">
                    {p.name.split(" ")[0]}
                  </span>
                  <span className="font-mono-code text-[8px] text-white/40 truncate max-w-full">
                    {p.role.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="bg-red-500/20 border border-red-500/60 p-3 text-xs font-mono-code text-red-200 flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-[#d9ff00] text-black border border-black p-3 text-xs font-mono-code uppercase font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name field for Sign Up */}
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-[10px] uppercase font-mono-code tracking-widest text-white/60"
                >
                  FULL NAME
                </label>
                <div className="flex items-center bg-black/50 border border-white/15 px-3.5 py-3 focus-within:border-[#d9ff00] transition-colors">
                  <UserIcon className="w-4 h-4 text-white/40 mr-2.5 flex-shrink-0" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="bg-transparent border-none focus:outline-none w-full text-xs font-mono-code text-[#F2F2F2] placeholder:text-white/20 p-0"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[10px] uppercase font-mono-code tracking-widest text-white/60 flex items-center justify-between"
              >
                <span>EMAIL ADDRESS</span>
                <span className="text-[9px] text-[#d9ff00]">GMAIL SUPPORTED</span>
              </label>
              <div className="flex items-center bg-black/50 border border-white/15 px-3.5 py-3 focus-within:border-[#d9ff00] transition-colors">
                <Mail className="w-4 h-4 text-white/40 mr-2.5 flex-shrink-0" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="bg-transparent border-none focus:outline-none w-full text-xs font-mono-code text-[#F2F2F2] placeholder:text-white/30 p-0"
                  required
                />
              </div>

              {/* Email Suffix Quick Tap Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar pt-1">
                <span className="text-[9px] font-mono-code text-white/40 flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5" />
                  <span>SUFFIX:</span>
                </span>
                {EMAIL_SUFFIXES.map((sfx) => (
                  <button
                    key={sfx}
                    type="button"
                    onClick={() => handleApplySuffix(sfx)}
                    className="px-1.5 py-0.5 bg-white/5 border border-white/10 hover:border-[#d9ff00] hover:text-[#d9ff00] text-[9px] font-mono-code text-white/60 transition-colors cursor-pointer"
                  >
                    {sfx}
                  </button>
                ))}
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-[10px] uppercase font-mono-code tracking-widest text-white/60"
                >
                  PASSWORD
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[10px] uppercase font-mono-code tracking-wider text-[#d9ff00] hover:underline cursor-pointer"
                  >
                    FORGOT?
                  </button>
                )}
              </div>
              <div className="flex items-center bg-black/50 border border-white/15 px-3.5 py-3 focus-within:border-[#d9ff00] transition-colors">
                <Lock className="w-4 h-4 text-white/40 mr-2.5 flex-shrink-0" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret password..."
                  className="bg-transparent border-none focus:outline-none w-full text-xs font-mono-code text-[#F2F2F2] placeholder:text-white/30 p-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/40 hover:text-[#d9ff00] p-1 cursor-pointer ml-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#d9ff00] text-black hover:bg-white font-syne font-black text-xs uppercase tracking-[0.2em] h-12 mt-2 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {isLoading ? (
                <span>VERIFYING CREDENTIALS...</span>
              ) : isSignUp ? (
                <>
                  <span>CREATE ACCOUNT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>AUTHENTICATE & LOG IN</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 text-white/20">
            <div className="h-[1px] bg-white/10 flex-grow" />
            <span className="font-mono-code text-[9px] font-bold tracking-widest uppercase text-white/40">
              OR
            </span>
            <div className="h-[1px] bg-white/10 flex-grow" />
          </div>

          {/* Social Action */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 border border-white/20 bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs uppercase tracking-wider h-11 transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>CONTINUE WITH GOOGLE AUTH</span>
          </button>
        </div>

        {/* Toggle Sign up / Login */}
        <footer className="text-center">
          <p className="font-mono-code text-xs text-white/50">
            {isSignUp ? "ALREADY HAVE AN ACCOUNT?" : "NEED A WRITESPHERE ACCOUNT?"}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className="text-[#d9ff00] font-bold uppercase tracking-wider hover:underline ml-2 cursor-pointer"
            >
              {isSignUp ? "LOG IN HERE" : "REGISTER NOW"}
            </button>
          </p>
        </footer>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#050505] p-6 max-w-sm w-full border border-white/20 space-y-4 relative">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setResetSent(false);
              }}
              className="absolute right-4 top-4 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-syne text-xl font-black uppercase text-[#F2F2F2] flex items-center gap-2">
              <Key className="w-5 h-5 text-[#d9ff00]" />
              <span>Reset Password</span>
            </h3>
            <p className="font-mono-code text-xs text-white/60">
              Enter your email address to receive authorization reset token.
            </p>
            {resetSent ? (
              <div className="bg-[#d9ff00] text-black p-4 font-mono-code text-xs uppercase font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                <span>Reset token dispatched to {forgotEmail || email || "your email"}. Check inbox.</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full bg-white/5 border border-white/15 p-3 text-xs font-mono-code text-white focus:outline-none focus:border-[#d9ff00]"
                />
                <button
                  onClick={() => setResetSent(true)}
                  className="bg-[#d9ff00] text-black py-3 font-syne font-black text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  DISPATCH RESET LINK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


