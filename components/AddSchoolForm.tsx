"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  School,
  MapPin,
  Building,
  Phone,
  Mail,
  Image,
} from "lucide-react";
import { toast } from "sonner";

const schoolSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  contact: z
    .string()
    .min(10, "Contact must be at least 10 digits")
    .regex(/^\d+$/, "Contact must contain only numbers"),
  email: z.string().email("Please enter a valid email address"),
});

type SchoolForm = z.infer<typeof schoolSchema>;

interface AddSchoolFormProps {
  onBack: () => void;
}

export default function AddSchoolForm({ onBack }: AddSchoolFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolForm>({
    resolver: zodResolver(schoolSchema),
  });

  const onSubmit = async (data: SchoolForm) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = localStorage.getItem("token");
      const response = await fetch("/api/schools", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("School added successfully!");
        reset();
        setImageFile(null);
        onBack();
      } else {
        toast.error(result.message || "Failed to add school");
      }
    } catch (error) {
      console.error("Add school error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card className="shadow-2xl shadow-blue-500/10 border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl hover:shadow-blue-500/20 transition-all duration-500">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30"></div>
              <School className="relative w-12 h-12 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New School
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <School className="w-4 h-4 mr-2" />
                  School Name
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg"
                  placeholder="Enter school name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg"
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Building className="w-4 h-4 mr-2" />
                  City
                </Label>
                <Input
                  id="city"
                  {...register("city")}
                  className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="state"
                  className="flex items-center text-sm font-medium text-gray-700"
                >
                  <Building className="w-4 h-4 mr-2" />
                  State
                </Label>
                <Input
                  id="state"
                  {...register("state")}
                  className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Number
              </Label>
              <Input
                id="contact"
                {...register("contact")}
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg"
                placeholder="Enter contact number"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="image"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <Image className="w-4 h-4 mr-2" />
                School Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="h-12 border-2 border-gray-200 focus:border-blue-400 transition-all duration-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 rounded-lg font-semibold"
            >
              {loading ? "Adding School..." : "Add School"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
