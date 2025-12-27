'use client';
import { useState, useEffect } from 'react';
import LoginPage from '@/components/ui/gaming-login';
import { MinimalAuthPage } from '@/components/ui/minimal-auth-page';
import { ForgotPassword } from '@/components/ui/forgot-password';
import { UpdatePassword } from '@/components/ui/update-password';
import { supabase } from '@/lib/supabase';

export function AuthScreen({ onAuthenticated }: { onAuthenticated: () => void }) {
    const [view, setView] = useState<'signin' | 'signup' | 'forgot' | 'update'>('signin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Handle password recovery link redirection (Supabase)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setView('update');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleGoogleSignin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGithubSignin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: { redirectTo: window.location.origin }
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSignin = async (email: string, password: string) => {
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            onAuthenticated();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (data: any) => {
        if (data.password !== data.repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        phone: data.phone,
                    }
                }
            });
            if (error) throw error;
            // Redirecting immediately to sign-in
            setView('signin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetRequest = async (email: string) => {
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/#update-password',
            });
            if (error) throw error;
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (password: string) => {
        setLoading(true);
        setError('');
        try {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            alert('Password updated successfully! Redirecting to sign in.');
            setView('signin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
            {view === 'signin' && (
                <>
                    <LoginPage.VideoBackground videoUrl="/assets/login_bg.mp4" />
                    <div className="relative z-20 w-full flex items-center justify-center p-4">
                        <LoginPage.LoginForm
                            onSubmit={(email, pass, _remember) => handleSignin(email, pass)}
                            onGoogleClick={handleGoogleSignin}
                            onGithubClick={handleGithubSignin}
                            onForgotPassword={() => setView('forgot')}
                            onCreateAccount={() => { setError(''); setView('signup'); }}
                            error={error}
                        />
                    </div>
                </>
            )}

            {view === 'signup' && (
                <MinimalAuthPage
                    onSignup={handleSignup}
                    onGoogleClick={handleGoogleSignin}
                    onGithubClick={handleGithubSignin}
                    onBackToLogin={() => { setError(''); setView('signin'); }}
                    error={error}
                    loading={loading}
                />
            )}

            {view === 'forgot' && (
                <ForgotPassword
                    onResetRequest={handleResetRequest}
                    onBack={() => { setError(''); setSuccess(false); setView('signin'); }}
                    error={error}
                    loading={loading}
                    success={success}
                />
            )}

            {view === 'update' && (
                <UpdatePassword
                    onUpdate={handlePasswordUpdate}
                    onCancel={() => { setError(''); setView('signin'); }}
                    error={error}
                    loading={loading}
                />
            )}
        </div>
    );
}
