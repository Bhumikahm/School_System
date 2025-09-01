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
import { ArrowLeft, User, Mail, Phone, Lock, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  contact: z.string().min(10, 'Contact must be at least 10 digits').regex(/^[+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[0-9])/, 'Password must contain at least one number')
    .regex(/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('OTP sent to your email!');
        localStorage.setItem('verificationEmail', data.email);
        router.push('/verify-otp');
      } else {
        toast.error(result.message || 'Signup failed');
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
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Create Account
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
                <Label htmlFor="fullName" className="flex items-center text-sm font-medium text-gray-200">
                  <User className="w-4 h-4 mr-2 text-blue-400" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-200">
                  <Mail className="w-4 h-4 mr-2 text-blue-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center text-sm font-medium text-gray-200">
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  Contact
                </Label>
                <Input
                  id="contact"
                  {...register('contact')}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="Enter your contact number"
                />
                {errors.contact && (
                  <p className="text-red-400 text-sm">{errors.contact.message}</p>
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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>

              <div className="text-center pt-4">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                    Sign In
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