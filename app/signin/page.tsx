'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Lock, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const signInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInForm) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        toast.success('Sign in successful!');
        router.push('/dashboard');
      } else {
        toast.error(result.message || 'Sign in failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto pt-8 p-4">
        <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-200 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Home
        </Link>

        <Card className="shadow-2xl shadow-blue-500/20 border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-3xl hover:shadow-blue-500/30 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                  <LogIn className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center text-sm font-medium text-gray-200">
                  <User className="w-4 h-4 mr-2 text-blue-400" />
                  Username
                </Label>
                <Input
                  id="username"
                  {...register('username')}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="Enter your username"
                />
                {errors.username && (
                  <p className="text-red-400 text-sm">{errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center text-sm font-medium text-gray-200">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="group w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-xl font-semibold text-lg relative overflow-hidden"
              >
                <span className="relative z-10">
                  {loading ? 'Signing In...' : 'Sign In'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>

              <div className="text-center pt-4">
                <p className="text-gray-300">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}