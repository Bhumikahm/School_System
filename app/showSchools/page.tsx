'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Phone, Mail, School, Building, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
      return;
    }
    fetchSchools();
  }, [router]);

  useEffect(() => {
    const filtered = schools.filter(school =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.state.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [searchTerm, schools]);

  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/schools', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok) {
        setSchools(result.schools);
        setFilteredSchools(result.schools);
      } else {
        toast.error('Failed to fetch schools');
      }
    } catch (error) {
      toast.error('Something went wrong while fetching schools');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-8 p-4">
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="mb-8 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-xl group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-2">
            All Schools
          </h2>
          <p className="text-gray-300 text-lg">
            {schools.length} school{schools.length !== 1 ? 's' : ''} registered in the system
          </p>
        </div>

        <div className="mb-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search schools by name, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
            />
          </div>
        </div>

        {filteredSchools.length === 0 && schools.length > 0 ? (
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardContent className="p-16 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                  <Search className="w-16 h-16 text-orange-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">No Schools Found</h3>
              <p className="text-gray-300 mb-8">No schools match your search criteria. Try different keywords.</p>
            </CardContent>
          </Card>
        ) : schools.length === 0 ? (
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardContent className="p-16 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full blur-xl opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                  <School className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">No Schools Found</h3>
              <p className="text-gray-300 mb-8">Start by adding your first school to the system.</p>
              <Button
                onClick={() => router.push('/addSchool')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 rounded-xl"
              >
                Add First School
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSchools.map((school) => (
              <Card
                key={school.id}
                className="group hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 border border-white/10 bg-white/5 backdrop-blur-xl transform-gpu perspective-1000 hover:rotate-y-12 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={`/schoolImages/${school.image}`}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-school.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                        {school.name}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{school.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-3 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{school.city}, {school.state}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{school.contact}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-red-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm break-all">{school.email_id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}