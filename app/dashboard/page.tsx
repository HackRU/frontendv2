"use client"

import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { getSelf } from '@/app/lib/data.ts';
import { useState, useEffect } from 'react';

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
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        {!userData ? <div>Loading...</div> :
            <>
                <h1>Personal Info of {userData.first_name} {userData.last_name}:</h1>
                <p>Role: {Object.keys(userData.role).find(key => userData.role[key])}</p>
                <p>Email: {userData.email}</p>
                <p>Github: {userData.github}</p>
                <p>Major: {userData.major}</p>
                <p>Short Answer: {userData.short_answer}</p>
                <p>Shirt Size: {userData.shirt_size}</p>
                <p>Dietary Restrictions: {userData.dietary_restrictions}</p>
                <p>Special Needs: {userData.special_needs}</p>
                <p>Date of Birth: {userData.date_of_birth}</p>
                <p>School: {userData.school}</p>
                <p>Grad Year: {userData.grad_year}</p>
                <p>Gender: {userData.gender}</p>
                <p>Registration Status: {userData.registration_status}</p>
                <p>Level of study: {userData.level_of_study}</p>
                <p>Country of Residence: {userData.country_of_residence}</p>
                <p>Ethnicity: {userData.ethnicity}</p>
                <p>Hackathon Count: {userData.hackathon_count}</p>
                <p>Phone #: {userData.phone_number}</p>
                <p>How you heard about hackru: {userData.how_you_heard_about_hackru}</p>
                <p>Reasons: {userData.reasons}</p>
            </>
        }
      </div>
    </main>
  );
}
