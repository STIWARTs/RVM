"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, MapPin, Camera, Leaf, Recycle, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    city: "Mumbai",
    image: "",
    tokens: 450,
    totalBottles: 45,
    carbonSaved: 2.25,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          My Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={profile.image} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-4xl">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 rounded-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
                <p className="text-gray-500 mb-4">{profile.email}</p>
                <div className="bg-emerald-50 rounded-lg px-4 py-2 w-full">
                  <p className="text-3xl font-bold text-emerald-600">{profile.tokens}</p>
                  <p className="text-sm text-gray-600">Total Tokens</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info & Stats */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold">{profile.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">City</p>
                        <p className="font-semibold">{profile.city}</p>
                      </div>
                    </div>
                    <Button onClick={() => setEditing(true)} className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Your Environmental Impact 🌍</CardTitle>
                <CardDescription>See how you're helping the planet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <ImpactStat
                    icon={<Recycle className="w-6 h-6 text-blue-600" />}
                    value={profile.totalBottles}
                    label="Bottles Recycled"
                    color="blue"
                  />
                  <ImpactStat
                    icon={<Leaf className="w-6 h-6 text-green-600" />}
                    value={`${profile.carbonSaved} kg`}
                    label="CO₂ Saved"
                    color="green"
                  />
                  <ImpactStat
                    icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                    value={profile.tokens}
                    label="Tokens Earned"
                    color="emerald"
                  />
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">Achievement Unlocked! 🎉</h4>
                  <p className="text-sm text-emerald-700">
                    You're in the top 10% of recyclers in your city. Keep up the great work!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImpactStat({ icon, value, label, color }: any) {
  return (
    <div className="text-center">
      <div className={`bg-${color}-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  )
}
