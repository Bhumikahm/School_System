'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                <GraduationCap className="w-20 h-20 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6 tracking-tight">
            School Management
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your educational institution with our comprehensive management platform
          </p>
        </div>

        {/* Features showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl w-full">
          <Card className="group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transform-gpu perspective-1000 hover:rotate-y-12">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Users className="relative w-16 h-16 text-blue-400 mx-auto group-hover:scale-125 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Authentication</h3>
              <p className="text-gray-300">Advanced OTP verification system with email integration</p>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transform-gpu perspective-1000 hover:rotate-y-12">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <BookOpen className="relative w-16 h-16 text-purple-400 mx-auto group-hover:scale-125 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">School Registry</h3>
              <p className="text-gray-300">Complete school information management with image uploads</p>
            </CardContent>
          </Card>
          
          <Card className="group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/25 border-0 bg-white/5 backdrop-blur-md hover:bg-white/10 transform-gpu perspective-1000 hover:rotate-y-12">
            <CardContent className="p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <GraduationCap className="relative w-16 h-16 text-indigo-400 mx-auto group-hover:scale-125 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Dashboard</h3>
              <p className="text-gray-300">Intuitive interface with responsive design</p>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-8 max-w-lg w-full">
          <Link href="/signup" className="flex-1">
            <Button 
              className="group w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 rounded-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>
          </Link>
          
          <Link href="/signin" className="flex-1">
            <Button 
              variant="outline" 
              className="group w-full h-16 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 rounded-2xl backdrop-blur-sm relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Sign In
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-400">
          <p>&copy; 2025 School Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}