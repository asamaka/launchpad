"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Loader2, ArrowLeft } from "lucide-react";
import { generateOTP, storeOTP, verifyOTP, setUser } from "@/lib/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && step === "phone") {
      setTimeout(() => phoneRef.current?.focus(), 100);
    }
  }, [isOpen, step]);

  const handleSendOTP = async () => {
    const cleaned = phone.replace(/\s/g, "");
    if (!/^(01[0-2,5]\d{8})$/.test(cleaned)) {
      setError("Please enter a valid Egyptian mobile number");
      return;
    }

    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1500));

    const code = generateOTP();
    storeOTP("+20" + cleaned, code);
    setSentOtp(code);
    setLoading(false);
    setStep("otp");
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((d) => d !== "")) {
      verifyCode(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      otpRefs.current[5]?.focus();
      verifyCode(pasted);
    }
  };

  const verifyCode = async (code: string) => {
    setLoading(true);
    setError("");

    await new Promise((r) => setTimeout(r, 1000));

    const cleaned = phone.replace(/\s/g, "");
    const isValid = verifyOTP("+20" + cleaned, code);

    if (isValid) {
      setUser({ phone: "+20" + cleaned });
      setLoading(false);
      onSuccess();
      resetState();
    } else {
      setError("Invalid verification code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
      setLoading(false);
    }
  };

  const resetState = () => {
    setStep("phone");
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSentOtp("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-midnight-900 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-midnight-950" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {step === "phone" ? "Sign In to Weelz" : "Verify Your Number"}
              </h2>
              <p className="text-white/50 text-sm mt-2">
                {step === "phone"
                  ? "Enter your Egyptian mobile number to continue"
                  : `We sent a code to +20 ${phone}`}
              </p>
            </div>

            {step === "phone" ? (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-white/60 text-sm pointer-events-none">
                    <span>🇪🇬</span>
                    <span>+20</span>
                  </div>
                  <input
                    ref={phoneRef}
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/[^\d\s]/g, ""));
                      setError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                    placeholder="01X XXXX XXXX"
                    className="input-field pl-24"
                    maxLength={13}
                  />
                </div>

                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                <button
                  onClick={handleSendOTP}
                  disabled={loading || !phone}
                  className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Send Verification Code"
                  )}
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    setStep("phone");
                    setOtp(["", "", "", "", "", ""]);
                    setError("");
                  }}
                  className="flex items-center gap-1 text-sm text-white/50 hover:text-gold-400 transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change number
                </button>

                <div className="flex justify-center gap-3 mb-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      onPaste={i === 0 ? handleOtpPaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold input-field"
                      maxLength={1}
                    />
                  ))}
                </div>

                {sentOtp && (
                  <p className="text-center text-xs text-gold-400/60 mt-3 mb-2">
                    Demo OTP: <span className="font-mono font-bold text-gold-400">{sentOtp}</span>
                  </p>
                )}

                {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}

                {loading && (
                  <div className="flex justify-center mt-4">
                    <Loader2 className="w-6 h-6 animate-spin text-gold-400" />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
