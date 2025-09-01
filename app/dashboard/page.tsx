'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, School, Home, LogOut, Users, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ users: 0, schools: 0, active: 0 });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }

    // Verify token and get user info
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          // Fetch stats
          fetch('/api/stats', {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then(res => res.json())
            .then(statsData => setStats(statsData))
            .catch(() => {});
        } else {
          localStorage.removeItem('token');
          router.push('/signin');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/signin');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative animate-spin rounded-full h-32 w-32 border-4 border-white/20 border-t-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-4s"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-300 text-lg mt-2">Welcome back, {user.fullName}</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/signin')}
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-xl"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="bg-white/5 backdrop-blur-sm border-red-400/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Add School Card */}
            <Card 
              className="group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer transform-gpu perspective-1000 hover:rotate-y-12"
              onClick={() => router.push('/addSchool')}
            >
              <CardContent className="p-12 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-500">
                    <Plus className="w-20 h-20 text-white group-hover:scale-125 group-hover:rotate-180 transition-all duration-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
                  Add School
                </h3>
                <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300">
                  Register a new school in the system with complete details and image
                </p>
              </CardContent>
            </Card>

            {/* All Schools Card */}
            <Card 
              className="group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer transform-gpu perspective-1000 hover:rotate-y-12"
              onClick={() => router.push('/showSchools')}
            >
              <CardContent className="p-12 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-full border border-white/20 group-hover:border-white/40 transition-all duration-500">
                    <School className="w-20 h-20 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                  All Schools
                </h3>
                <p className="text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300">
                  View and manage all registered schools in a beautiful grid layout
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Total Users</h4>
                <p className="text-2xl font-bold text-blue-400">{stats.users}</p>
              </CardContent>
            </Card>
            
            <Card className="border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <School className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Schools</h4>
                <p className="text-2xl font-bold text-purple-400">{stats.schools}</p>
              </CardContent>
            </Card>
            
            <Card className="border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <h4 className="text-white font-semibold">Active</h4>
                <p className="text-2xl font-bold text-indigo-400">{stats.active}%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}