import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, ShieldCheck, KeyRound, AlertCircle, Sparkles, X } from 'lucide-react';

interface PasscodeLockProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPasscode?: string;
}

export const PasscodeLock: React.FC<PasscodeLockProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctPasscode = '1234',
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const VALID_PINS = [correctPasscode, '1234'].filter(Boolean);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(null);
      setIsSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const verifyPin = (pinToVerify: string) => {
    if (VALID_PINS.includes(pinToVerify)) {
      setError(null);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setPin('');
        onSuccess();
        onClose();
      }, 350);
    } else {
      setIsShaking(true);
      setError('Incorrect passcode. Please try again.');
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 600);
    }
  };

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4 && !isSuccess) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(null);
      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0 && !isSuccess) {
      setPin(pin.slice(0, -1));
      setError(null);
    }
  };

  const handleClear = () => {
    setPin('');
    setError(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      e.preventDefault();
      handleKeyPress(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      handleDelete();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id="passcode-lock-modal"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 overflow-y-auto"
    >
      {/* Hidden real input for keyboard focus */}
      <input
        ref={inputRef}
        type="password"
        pattern="[0-9]*"
        inputMode="numeric"
        maxLength={4}
        value={pin}
        onChange={(e) => {
          const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
          setPin(val);
          if (val.length === 4) {
            verifyPin(val);
          }
        }}
        className="opacity-0 absolute w-0 h-0 pointer-events-none"
        aria-label="Owner Passcode"
      />

      {/* Main Lock Card */}
      <div
        id="passcode-card"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-md relative z-10 text-center transition-transform duration-200 ${
          isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-passcode-modal-btn"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon Header */}
        <div className="flex justify-center mb-4 mt-1">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isSuccess
                ? 'bg-emerald-500 text-slate-950 scale-110 shadow-lg shadow-emerald-500/40'
                : error
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isSuccess ? (
              <Unlock className="w-7 h-7 animate-bounce" />
            ) : error ? (
              <Lock className="w-7 h-7" />
            ) : (
              <KeyRound className="w-7 h-7" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          Owner Portal
        </h2>
        <p className="text-xs text-emerald-400 font-semibold tracking-wide mt-1">
          Adam Suhuyini Fauzan
        </p>

        <p className="text-xs text-slate-400 mt-2 mb-5">
          Enter 4-digit PIN to edit pictures, project details, and add designs.
        </p>

        {/* PIN Indicators (4 Dots) */}
        <div className="flex items-center justify-center gap-3.5 mb-5" id="pin-indicator-dots">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <div
                key={index}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 border ${
                  isSuccess
                    ? 'bg-emerald-400 border-emerald-400 scale-110 shadow-md shadow-emerald-400/50'
                    : error
                    ? 'bg-rose-500 border-rose-500'
                    : isFilled
                    ? 'bg-emerald-500 border-emerald-400 scale-110 shadow-md shadow-emerald-500/40'
                    : 'bg-slate-800 border-slate-700'
                }`}
              />
            );
          })}
        </div>

        {/* Error / Feedback Message */}
        <div className="min-h-5 mb-3">
          {error ? (
            <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          ) : isSuccess ? (
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Access Granted! Loading Edit Mode...</span>
            </div>
          ) : (
            <span className="text-[11px] text-slate-500">
              Only authorized for portfolio owner
            </span>
          )}
        </div>

        {/* Interactive Keypad */}
        <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-4" id="pin-keypad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              id={`keypad-digit-${digit}`}
              onClick={() => handleKeyPress(digit)}
              className="h-12 rounded-xl bg-slate-800/90 hover:bg-slate-750 active:bg-emerald-600 text-white active:text-white font-bold text-lg border border-slate-700/80 shadow-sm transition-all duration-150 active:scale-95 flex items-center justify-center cursor-pointer select-none"
            >
              {digit}
            </button>
          ))}

          {/* Clear Key */}
          <button
            type="button"
            id="keypad-clear"
            onClick={handleClear}
            className="h-12 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 transition-all duration-150 active:scale-95 flex items-center justify-center cursor-pointer select-none"
          >
            Clear
          </button>

          {/* Digit 0 */}
          <button
            type="button"
            id="keypad-digit-0"
            onClick={() => handleKeyPress('0')}
            className="h-12 rounded-xl bg-slate-800/90 hover:bg-slate-750 active:bg-emerald-600 text-white active:text-white font-bold text-lg border border-slate-700/80 shadow-sm transition-all duration-150 active:scale-95 flex items-center justify-center cursor-pointer select-none"
          >
            0
          </button>

          {/* Delete Key */}
          <button
            type="button"
            id="keypad-delete"
            onClick={handleDelete}
            className="h-12 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold border border-slate-800 transition-all duration-150 active:scale-95 flex items-center justify-center cursor-pointer select-none"
          >
            Del
          </button>
        </div>

        {/* Security / Privacy Badge */}
        <div className="bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Protected Owner Area</span>
        </div>
      </div>
    </div>
  );
};
