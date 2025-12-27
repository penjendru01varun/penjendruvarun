'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome, Github } from 'lucide-react';

interface LoginFormProps {
    onSubmit: (email: string, password: string, remember: boolean) => void;
    onGoogleClick?: () => void;
    onGithubClick?: () => void;
    onForgotPassword?: () => void;
    onCreateAccount?: () => void;
    error?: string;
}

interface VideoBackgroundProps {
    videoUrl: string;
}

interface FormInputProps {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

interface SocialButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
}

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    id: string;
}

// FormInput Component
const FormInput: React.FC<FormInputProps> = ({ icon, type, placeholder, value, onChange, required }) => {
    return (
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
        </div>
    );
};

// SocialButton Component
const SocialButton: React.FC<SocialButtonProps> = ({ icon, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
            {icon}
        </button>
    );
};

// ToggleSwitch Component
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id }) => {
    return (
        <div className="relative inline-block w-10 h-5 cursor-pointer" onClick={(e) => { e.stopPropagation(); onChange(); }}>
            <input
                type="checkbox"
                id={id}
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <div className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-purple-600' : 'bg-white/20'}`}>
                <div className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-5' : ''}`} />
            </div>
        </div>
    );
};

// VideoBackground Component
const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

// Main LoginForm Component
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onGoogleClick, onGithubClick, onForgotPassword, onCreateAccount, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(email, password, remember);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 rounded-2xl backdrop-blur-md bg-black/60 border border-white/10 w-full max-w-md shadow-2xl">
            <div className="mb-8 text-center leading-tight">
                <h2 className="text-3xl font-bold mb-2 relative group">
                    <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
                    <span className="relative inline-block text-3xl font-bold mb-2 text-white italic tracking-tighter">
                        WELCOME TO PORTFOLIO
                    </span>
                </h2>
                <p className="text-white/60 flex flex-col items-center space-y-2 mt-4">
                    <span className="text-sm font-medium tracking-widest uppercase opacity-70">Securing your journey</span>
                    <div className="flex space-x-3 text-sm">
                        <span className="animate-pulse">✨</span>
                        <span className="animate-bounce">🛡️</span>
                        <span className="animate-pulse">🚀</span>
                    </div>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    icon={<Mail size={18} />}
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="relative">
                    <FormInput
                        icon={<Lock size={18} />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white focus:outline-none transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {error && <p className="text-red-500 text-xs text-center font-medium animate-shake">{error}</p>}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ToggleSwitch
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            id="remember-me"
                        />
                        <label
                            htmlFor="remember-me"
                            className="text-xs text-white/60 cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => setRemember(!remember)}
                        >
                            Remember me
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-xs text-white/60 hover:text-white transition-colors font-medium underline-offset-4 hover:underline"
                    >
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 uppercase tracking-widest text-sm"
                >
                    {isSubmitting ? 'Authenticating...' : 'Enter Portfolio'}
                </button>
            </form>

            <div className="mt-8">
                <div className="relative flex items-center justify-center">
                    <div className="border-t border-white/5 absolute w-full"></div>
                    <div className="bg-transparent px-4 relative text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Login with Social
                    </div>
                </div>

                <div className="mt-6 flex justify-center gap-4">
                    <SocialButton icon={<Chrome size={20} />} onClick={onGoogleClick} />
                    <SocialButton icon={<Github size={20} />} onClick={onGithubClick} />
                </div>
            </div>

            <p className="mt-8 text-center text-xs text-white/40">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onCreateAccount}
                    className="font-bold text-white hover:text-purple-400 transition-colors underline underline-offset-4"
                >
                    JOIN NOW
                </button>
            </p>
        </div>
    );
};

// Export as default components
const LoginPage = {
    LoginForm,
    VideoBackground
};

export default LoginPage;
