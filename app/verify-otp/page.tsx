'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const router = useRouter();

  useEffect(() => {
    const verificationEmail = localStorage.getItem('verificationEmail');
    if (!verificationEmail) {
      router.push('/signup');
      return;
    }
    setEmail(verificationEmail);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error('OTP expired. Please sign up again.');
          router.push('/signup');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account verified successfully!');
        localStorage.removeItem('verificationEmail');
        router.push('/signin');
      } else {
        toast.error(result.message || 'OTP verification failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto pt-8 p-4">
        <Link href="/signup" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-200 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Sign Up
        </Link>

        <Card className="shadow-2xl shadow-green-500/20 border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-3xl hover:shadow-green-500/30 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-transparent mb-2">
              Verify Your Email
            </CardTitle>
            <p className="text-gray-300">We&apos;ve sent a verification code to</p>
            <p className="text-blue-400 font-medium">{email}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="flex items-center justify-between text-sm font-medium text-gray-200">
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-green-400" />
                    Enter 6-digit verification code
                  </span>
                  <span className="flex items-center text-orange-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(timeLeft)}
                  </span>
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-14 text-center text-2xl font-mono tracking-widest border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-green-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="group w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-xl font-semibold text-lg relative overflow-hidden"
              >
                <span className="relative z-10">
                  {loading ? 'Verifying...' : 'Verify Account'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}