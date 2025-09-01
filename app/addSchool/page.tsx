'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, School, MapPin, Building, Phone, Mail, Image, Save } from 'lucide-react';
import { toast } from 'sonner';

const schoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  contact: z.string().min(10, 'Contact must be at least 10 digits').regex(/^\d+$/, 'Contact must contain only numbers'),
  email: z.string().email('Please enter a valid email address'),
});

type SchoolForm = z.infer<typeof schoolSchema>;

export default function AddSchool() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolForm>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit = async (data: SchoolForm) => {
    if (!imageFile) {
      toast.error('Please select an image for the school');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('image', imageFile);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('School added successfully!');
        reset();
        setImageFile(null);
        router.push('/showSchools');
      } else {
        toast.error(result.message || 'Failed to add school');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPG, JPEG, or PNG)');
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-8 p-4">
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="mb-8 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 rounded-xl group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Dashboard
        </Button>

        <Card className="shadow-2xl shadow-blue-500/20 border border-white/10 bg-white/5 backdrop-blur-xl hover:shadow-3xl hover:shadow-blue-500/30 transition-all duration-500">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                  <School className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Add New School
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center text-sm font-medium text-gray-200">
                    <School className="w-4 h-4 mr-2 text-blue-400" />
                    School Name
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                    placeholder="Enter school name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-200">
                    <Mail className="w-4 h-4 mr-2 text-blue-400" />
                    Email ID
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center text-sm font-medium text-gray-200">
                  <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                  Address
                </Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  className="min-h-[100px] border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl resize-none"
                  placeholder="Enter complete address"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center text-sm font-medium text-gray-200">
                    <Building className="w-4 h-4 mr-2 text-blue-400" />
                    City
                  </Label>
                  <Input
                    id="city"
                    {...register('city')}
                    className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="flex items-center text-sm font-medium text-gray-200">
                    <Building className="w-4 h-4 mr-2 text-blue-400" />
                    State
                  </Label>
                  <Input
                    id="state"
                    {...register('state')}
                    className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-red-400 text-sm">{errors.state.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center text-sm font-medium text-gray-200">
                  <Phone className="w-4 h-4 mr-2 text-blue-400" />
                  Contact Number
                </Label>
                <Input
                  id="contact"
                  {...register('contact')}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                  placeholder="Enter contact number"
                />
                {errors.contact && (
                  <p className="text-red-400 text-sm">{errors.contact.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center text-sm font-medium text-gray-200">
                  <Image className="w-4 h-4 mr-2 text-blue-400" />
                  School Image
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="h-12 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 rounded-xl"
                />
                {imageFile && (
                  <p className="text-green-400 text-sm">Selected: {imageFile.name}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="group w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 rounded-xl font-semibold text-lg relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 'Adding School...' : 'Add School'}
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