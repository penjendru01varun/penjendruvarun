import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, GithubIcon, UserPlusIcon, Mail, Phone, Lock, User } from 'lucide-react';
import { Particles } from '@/components/ui/particles';

interface MinimalAuthPageProps {
    onSignup: (data: any) => void;
    onGoogleClick?: () => void;
    onGithubClick?: () => void;
    onBackToLogin: () => void;
    error?: string;
    loading?: boolean;
}

export function MinimalAuthPage({ onSignup, onGoogleClick, onGithubClick, onBackToLogin, error, loading }: MinimalAuthPageProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup(formData);
    };

    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center p-4">
            <Particles
                color="#888888"
                quantity={150}
                ease={50}
                className="absolute inset-0 z-0"
            />

            <div className="relative z-10 w-full max-w-xl bg-neutral-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
                <Button
                    variant="ghost"
                    className="absolute top-4 left-4 text-white/50 hover:text-white hover:bg-white/5 rounded-full"
                    onClick={onBackToLogin}
                >
                    <ChevronLeftIcon className="me-1 size-4" />
                    Back to Login
                </Button>

                <div className="mx-auto space-y-8 mt-8">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                            <UserPlusIcon className="size-8 text-purple-400" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
                                JOIN THE JOURNEY
                            </h1>
                            <p className="text-neutral-500 text-sm font-medium tracking-wide">
                                Create your account to access the exclusive portfolio experience.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">First Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">Last Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="hello@example.com"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">Repeat Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    name="repeatPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-4 space-y-4">
                            {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                            <Button type="submit" size="lg" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl py-6 tracking-widest italic shadow-lg shadow-purple-500/20">
                                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                            </Button>

                            <div className="relative flex items-center justify-center py-2">
                                <div className="border-t border-white/5 absolute w-full"></div>
                                <div className="bg-neutral-900 px-4 relative text-neutral-600 text-[9px] uppercase font-black tracking-widest italic">
                                    Social Connect
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button type="button" variant="outline" className="border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white py-6" onClick={onGoogleClick}>
                                    <GoogleIcon className="me-2 size-4" />
                                    Google
                                </Button>
                                <Button type="button" variant="outline" className="border-white/5 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white py-6" onClick={onGithubClick}>
                                    <GithubIcon className="me-2 size-4" strokeWidth={2.5} />
                                    GitHub
                                </Button>
                            </div>
                        </div>
                    </form>

                    <p className="text-neutral-600 text-center text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                        By joining, you agree to our{' '}
                        <a href="#" className="text-neutral-400 hover:text-white underline underline-offset-4">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-neutral-400 hover:text-white underline underline-offset-4">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <g>
            <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
        </g>
    </svg>
);
