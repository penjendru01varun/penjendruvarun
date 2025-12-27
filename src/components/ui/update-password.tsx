import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Save, ChevronLeftIcon } from 'lucide-react';
import { Particles } from '@/components/ui/particles';

interface UpdatePasswordProps {
    onUpdate: (password: string) => void;
    onCancel: () => void;
    error?: string;
    loading?: boolean;
}

export function UpdatePassword({ onUpdate, onCancel, error, loading }: UpdatePasswordProps) {
    const [formData, setFormData] = useState({
        password: '',
        repeatPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert("Passwords don't match");
            return;
        }
        onUpdate(formData.password);
    };

    return (
        <div className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center p-4">
            <Particles
                color="#888888"
                quantity={100}
                className="absolute inset-0 z-0"
            />

            <div className="relative z-10 w-full max-w-md bg-neutral-900/60 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl shadow-2xl">
                <Button
                    variant="ghost"
                    className="absolute top-4 left-4 text-white/50 hover:text-white"
                    onClick={onCancel}
                >
                    <ChevronLeftIcon className="me-1 size-4" />
                    Cancel
                </Button>

                <div className="mx-auto space-y-8 mt-12 text-center">
                    <div className="space-y-2">
                        <div className="p-3 bg-purple-500/10 rounded-full w-fit mx-auto border border-purple-500/20 mb-4">
                            <Lock className="size-6 text-purple-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight italic uppercase">UPDATE PASSWORD</h1>
                        <p className="text-neutral-500 text-sm">
                            Create a strong new password for your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-neutral-500 ml-1 tracking-widest">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 size-4" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-neutral-700 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                                    value={formData.repeatPassword}
                                    onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

                        <Button type="submit" size="lg" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl py-6 tracking-widest italic shadow-lg shadow-purple-500/20">
                            {loading ? 'UPDATING...' : 'SAVE NEW PASSWORD'}
                            {!loading && <Save size={16} className="ml-2" />}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
