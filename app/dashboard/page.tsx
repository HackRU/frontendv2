"use client"

import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { getSelf } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { AvatarImage, AvatarInitials, Avatar } from "@/app/dashboard/components/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/app/dashboard/components/card"
import { Label } from "@/app/dashboard/components/label"
import { Input } from "@/app/dashboard/components/input"
import { Button } from "@/app/dashboard/components/button"

export default function Dashboard() {

    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        async function fetchUser() {
            try {
              const data = await getSelf();
              setUserData(data);
            //   setLoading(false);
            } catch (error) {
              console.log(error);
            //   setLoading(false);
            }
          }
      
        fetchUser();
    }, [])

  return (

    <main className="flex flex-col items-center justify-center p-4 space-y-8">
      <div className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-16">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24">
            <AvatarInitials>{userData?.first_name[0]}{userData?.last_name[0]}</AvatarInitials>
          </Avatar>
          <div className="grid gap-0.5 text-xs">
            <div className="font-medium text-xl">{userData?.first_name} {userData?.last_name}</div>
            <div className="font-medium text-lg text-gray-500">{userData && Object.keys(userData.role).find(key => userData.role[key])}</div>
            <div className="text-gray-500 dark:text-gray-400">{userData?.email}</div>
          </div>
        </div>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Registration</CardTitle>
            <CardDescription>Check your registration status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-center">
              <CardTitle>{userData ? userData?.registration_status : "unregistered"}</CardTitle>
              <Button className="ml-auto" onClick={()=>console.log("register button clicked")}>Register</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" value={userData?.first_name} onChange={(e) => setUserData({...userData, first_name: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" value={userData?.last_name} onChange={(e) => setUserData({...userData, last_name: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" value={userData?.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">Github</Label>
            <Input id="github" value={userData?.github} onChange={(e) => setUserData({...userData, github: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input id="major" value={userData?.major} onChange={(e) => setUserData({...userData, major: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="short-answer">Short Answer</Label>
            <textarea className="flex h-24 resize-none w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300" 
              id="short-answer" 
              value={userData?.short_answer} 
              onChange={(e) => setUserData({...userData, short_answer: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shirt-size">Shirt Size</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              id="shirt-size" 
              value={userData?.shirt_size} 
              onChange={(e) => setUserData({...userData, shirt_size: e.target.value})}
            >
              <option value="Unisex S">Unisex S</option>
              <option value="Unisex M">Unisex M</option>
              <option value="Unisex L">Unisex L</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
            <Input id="dietary-restrictions" value={userData?.dietary_restrictions} onChange={(e) => setUserData({...userData, dietary_restrictions: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="special-needs">Special Needs</Label>
            <Input id="special-needs" value={userData?.special_needs} onChange={(e) => setUserData({...userData, special_needs: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input type="date" max="2024-01-01" id="dob" value={userData?.date_of_birth} onChange={(e) => setUserData({...userData, date_of_birth: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input id="school" value={userData?.school} onChange={(e) => setUserData({...userData, school: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="grad-year">Grad Year</Label>
            <Input type="number" id="grad-year" value={userData?.grad_year} onChange={(e) => setUserData({...userData, grad_year: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              id="shirt-size" 
              value={userData?.gender} 
              onChange={(e) => setUserData({...userData, gender: e.target.value})}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="level-of-study">Level of Study</Label>
            <Input id="level-of-study" value={userData?.level_of_study} onChange={(e) => setUserData({...userData, level_of_study: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="country-of-residence">Country of Residence</Label>
            <Input id="country-of-residence" value={userData?.country_of_residence} onChange={(e) => setUserData({...userData, country_of_residence: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ethnicity">Ethnicity</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
              id="shirt-size" 
              value={userData?.ethnicity} 
              onChange={(e) => setUserData({...userData, ethnicity: e.target.value})}
            >
              <option value="American Indian/Alaska Native">American Indian/Alaska Native</option>
              <option value="Asian">Asian</option>
              <option value="Black or African American">Black or African American</option>
              <option value="Native Hawaiian or other Pacific Islander">Native Hawaiian or other Pacific Islander</option>
              <option value="White">White</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hackathon-count">Hackathon Count</Label>
            <Input type="number" id="hackathon-count" value={userData?.hackathon_count} onChange={(e) => setUserData({...userData, hackathon_count: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone #</Label>
            <Input type="number" id="phone-number" value={userData?.phone_number} onChange={(e) => setUserData({...userData, phone_number: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="how-heard">How you heard about hackru</Label>
            <Input id="how-heard" value={userData?.how_you_heard_about_hackru} onChange={(e) => setUserData({...userData, how_you_heard_about_hackru: e.target.value})}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reasons">Reasons</Label>
            <textarea className="flex h-24 resize-none w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300" 
              id="reasons" 
              value={userData?.reasons} 
              onChange={(e) => setUserData({...userData, reasons: e.target.value})}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" onClick={()=>console.log("save button clicked")}>Save</Button>
        </CardFooter>
      </Card>
      
    </main>
  );
}
