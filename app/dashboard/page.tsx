"use client"


import { UpdateSelf, getSelf, getUsers, RegisterSelf } from '@/app/lib/data';
import { useState, useEffect, Suspense } from 'react';
import { AvatarImage, AvatarInitials, Avatar } from "@/app/dashboard/components/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/app/dashboard/components/card"
import { Label } from "@/app/dashboard/components/label"
import { Input } from "@/app/dashboard/components/input"
import { Button } from "@/app/dashboard/components/button"
import OrganizerView from "@/app/dashboard/views/organizerView"
import DirectorView from "@/app/dashboard/views/directorView"
import { UploadWaiver, GetWaiverInfo, GetResume, UploadResume } from '../lib/actions';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import Cursor from '../ui/cursor';
import Navbar from '../(pre-dashboard)/(landing)/sections/Hero/Navbar';
import ProfileHeader from './components/profileHeader';
import DashboardSkeleton, { HackerDashboardSkeleton } from '../ui/skeletons';

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);

  const [waiverState, setWaiverState] = useState<any>(null);

  const UserUpdateSchema = z.object({

    first_name: z.string().min(1, "Field cannot be empty"),
    last_name: z.string().min(1, "Field cannot be empty"),
    resume: z.any(),
    github: z.string().min(1, "Field cannot be empty"),
    major: z.string().min(1, "Field cannot be empty"),
    short_answer: z.string().min(1, "Field cannot be empty"),
    shirt_size: z.string().min(1, "Field cannot be empty"),
    hackathon_count: z.number(),
    dietary_restrictions: z.string().min(1, "Field cannot be empty"),
    special_needs: z.string().min(1, "Field cannot be empty"),
    date_of_birth: z.string().min(1, "Field cannot be empty"),
    school: z.string().min(1, "Field cannot be empty"),
    grad_year: z.string().min(1, "Field cannot be empty"),
    gender: z.string().min(1, "Field cannot be empty"),
    level_of_study: z.string().min(1, "Field cannot be empty"),
    country_of_residence: z.string().min(1, "Field cannot be empty"),
    ethnicity: z.string().min(1, "Field cannot be empty"),
    phone_number: z.number({
      invalid_type_error: "Enter Phone Number in the format 1234567890",
    }).min(1000000000).max(9999999999),
    how_you_heard_about_hackru: z.string(),
    reasons: z.string(),
  });

  type UserUpdate = z.infer<typeof UserUpdateSchema>;


  const { register, handleSubmit, reset, trigger, formState: { errors }, } = useForm<UserUpdate>({ resolver: zodResolver(UserUpdateSchema), defaultValues: userData, });
  const [waiverFile, setWaiverFile] = useState<File | null>(null);
  const [resumeExists, setResumeExists] = useState<boolean>(false);

  const onSubmit = async (data: UserUpdate) => {
    const { resume, ...otherData } = data;

    const fileList = resume as FileList;
    const pdf = fileList[0];

    const resumeData = new FormData();

    if (!pdf || pdf === undefined) {
      alert("There was an error uploading your resume. Please try again.");
    }

    resumeData.set('file', pdf as File);

    await UploadResume(resumeData);
    await UpdateSelf(otherData);
  }

  const onWaiverSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (waiverFile) { //works
      try {
        const data = new FormData();
        data.set('file', waiverFile);
        await UploadWaiver(data);

        trigger('phone_number', { shouldFocus: true });
        if (Object.keys(errors).length === 0) {
          RegisterSelf();
        }

        window.location.reload();

      } catch (error) {
        console.error("Error uploading waiver:", error);
        alert("Error uploading waiver. Please contact HackRU.");
      }
    } else {
      console.error("No waiver file selected");//works
      alert("Please select a waiver file");
    }
  }
  const handleChangingFile = (event: React.ChangeEvent<HTMLInputElement>,
    acceptedFormats: string,
    input: "WAIVER" | "RESUME") => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === acceptedFormats && input === "WAIVER") {
        setWaiverFile(selectedFile);
        console.log('waiver file: ', selectedFile);
      } else if (selectedFile.type === acceptedFormats && input === "RESUME") {
        // i'm just as confused... going to make file upload more consistent here....
        // most likely, we don't need this condition.... just think about it later
      } else {
        alert("Invalid file format. Please select a PDF file.");
      }
    };
  }
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getSelf();
        setUserData(data.response);
        const resumeInfo = await GetResume();
        console.log(resumeInfo);
        if (resumeInfo.exists) {
          setResumeExists(true);
        }

        const haswaiver = await GetWaiverInfo();
        setWaiverState(haswaiver.exists);
        //   setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
    reset()

  }, []);

  if (!userData) {
    return (
      <HackerDashboardSkeleton />
    )
  }

  if (!(userData instanceof Object)) {
    return (
      <main>
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        <div className="flex flex-col items-center justify-center p-4 space-y-8">
          <h1 className="text-2xl font-bold">Error: Invalid User Data</h1>
          <p>Please clear your cookies and refresh the page.</p>
        </div>
      </main>
    );
  }

  if (userData?.role['organizer']) {
    return (<OrganizerView userData={userData} />)
  }
  else if (userData?.role['director']) {
    return (<DirectorView userData={userData} />)
  }
  else if (userData?.role.hacker) {
    return (
      <main>
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        <div className="flex flex-col items-center justify-center p-4 space-y-8">
          <ProfileHeader
            userData={userData}
            waiverState={waiverState}
            handleChangingFile={handleChangingFile}
            onWaiverSubmit={onWaiverSubmit}
          />

          <Card className="w-full max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>

              <CardHeader>

                <div className="flex flex-row items-center justify-center">
                  <div className='flex flex-col'>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Update your profile information.</CardDescription>
                  </div>
                  <Button type="submit" className="ml-auto" onClick={() => console.log("submit button")}>Save</Button>
                </div>

              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input id="first_name" value={userData?.first_name} {...register("first_name")} onChange={(e) => setUserData({ ...userData, first_name: e.target.value })} />
                  {errors.first_name && (<p className="text-xs italic text-red-500 mt-2">{errors.first_name?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input id="last_name" value={userData?.last_name} {...register("last_name")} onChange={(e) => setUserData({ ...userData, last_name: e.target.value })} />
                  {errors.last_name && (<p className="text-xs italic text-red-500 mt-2">{errors.last_name?.message}</p>)}
                </div>

                {/* Add resume upload file here */}
                <div className="space-y-2">
                  <Label htmlFor="resume">{resumeExists ? "Resume (Already Uploaded)" : "Resume"}</Label>
                  <Input
                    type="file"
                    id="resume"
                    accept="application/pdf"
                    {...register("resume")}
                    onChange={(e) => {
                      setUserData({ ...userData, resume: e.target.value });
                      // handleChangingFile(e, "application/pdf", "RESUME");
                    }}
                  />
                  <a className="text-sm text-blue-200 underline">Resumes may be considered for potential internships and employment!</a>
                </div>

                {/* <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userData?.email} {...register("email")} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                {errors.email && (<p className="text-xs italic text-red-500 mt-2">{errors.email?.message}</p>)}
              </div> */}

                <div className="space-y-2">
                  <Label htmlFor="github">Github</Label>
                  <Input id="github" value={userData?.github} {...register("github")} onChange={(e) => setUserData({ ...userData, github: e.target.value })} />
                  {errors.github && (<p className="text-xs italic text-red-500 mt-2">{errors.github?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input id="major" value={userData?.major} {...register("major")} onChange={(e) => setUserData({ ...userData, major: e.target.value })} />
                  {errors.major && (<p className="text-xs italic text-red-500 mt-2">{errors.major?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="short-answer">What are you hoping to experience at HackRU?</Label>
                  <textarea
                    className="flex h-24 resize-none w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="short-answer"
                    value={userData?.short_answer}
                    {...register("short_answer")}
                    onChange={(e) => setUserData({ ...userData, short_answer: e.target.value })}

                  />
                  {errors.short_answer && (<p className="text-xs italic text-red-500 mt-2">{errors.short_answer?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shirt-size">Shirt Size</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.shirt_size}
                    {...register("shirt_size")}
                    onChange={(e) => setUserData({ ...userData, shirt_size: e.target.value })}
                  >
                    <option value="Unisex S">Unisex S</option>
                    <option value="Unisex M">Unisex M</option>
                    <option value="Unisex L">Unisex L</option>
                  </select>
                  {errors.shirt_size && (<p className="text-xs italic text-red-500 mt-2">{errors.shirt_size?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietary-restrictions">Dietary Restrictions</Label>
                  <Input id="dietary-restrictions" value={userData?.dietary_restrictions} {...register("dietary_restrictions")} onChange={(e) => setUserData({ ...userData, dietary_restrictions: e.target.value })} />
                  {errors.dietary_restrictions && (<p className="text-xs italic text-red-500 mt-2">{errors.dietary_restrictions?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-needs">Anything we should account for?</Label>
                  <Input id="special-needs" value={userData?.special_needs} {...register("special_needs")} onChange={(e) => setUserData({ ...userData, special_needs: e.target.value })} />
                  {errors.special_needs && (<p className="text-xs italic text-red-500 mt-2">{errors.special_needs?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input type="date" max="2024-01-01" id="dob" value={userData?.date_of_birth} {...register("date_of_birth")} onChange={(e) => setUserData({ ...userData, date_of_birth: e.target.value })} />
                  {errors.date_of_birth && (<p className="text-xs italic text-red-500 mt-2">{errors.date_of_birth?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input id="school" value={userData?.school} {...register("school")} onChange={(e) => setUserData({ ...userData, school: e.target.value })} />
                  {errors.school && (<p className="text-xs italic text-red-500 mt-2">{errors.school?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grad-year">Grad Year</Label>
                  <Input type="number" id="grad-year" value={userData?.grad_year} {...register("grad_year")} onChange={(e) => setUserData({ ...userData, grad_year: e.target.value })} />
                  {errors.grad_year && (<p className="text-xs italic text-red-500 mt-2">{errors.grad_year?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.gender}
                    {...register("gender")}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (<p className="text-xs italic text-red-500 mt-2">{errors.gender?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level-of-study">Level of Study</Label>
                  <Input id="level-of-study" value={userData?.level_of_study} {...register("level_of_study")} onChange={(e) => setUserData({ ...userData, level_of_study: e.target.value })} />
                  {errors.level_of_study && (<p className="text-xs italic text-red-500 mt-2">{errors.level_of_study?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country-of-residence">Country of Residence</Label>
                  <Input id="country-of-residence" value={userData?.country_of_residence} {...register("country_of_residence")} onChange={(e) => setUserData({ ...userData, country_of_residence: e.target.value })} />
                  {errors.country_of_residence && (<p className="text-xs italic text-red-500 mt-2">{errors.country_of_residence?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ethnicity">Ethnicity</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.ethnicity}
                    {...register("ethnicity")}
                    onChange={(e) => setUserData({ ...userData, ethnicity: e.target.value })}
                  >
                    <option value="American Indian/Alaska Native">American Indian/Alaska Native</option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Native Hawaiian or other Pacific Islander">Native Hawaiian or other Pacific Islander</option>
                    <option value="White">White</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.ethnicity && (<p className="text-xs italic text-red-500 mt-2">{errors.ethnicity?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hackathon-count">Hackathon Count</Label>
                  <Input type="number" id="hackathon-count" value={userData?.hackathon_count} {...register("hackathon_count", { valueAsNumber: true })} onChange={(e) => setUserData({ ...userData, hackathon_count: e.target.value })} />
                  {errors.hackathon_count && (<p className="text-xs italic text-red-500 mt-2">{errors.hackathon_count?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone #</Label>
                  <Input type="number" id="phone-number" value={userData?.phone_number} {...register("phone_number", { valueAsNumber: true })} onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })} />
                  {errors.phone_number && (<p className="text-xs italic text-red-500 mt-2">{errors.phone_number?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="how-heard">How you heard about hackru</Label>
                  <Input id="how-heard" value={userData?.how_you_heard_about_hackru} {...register("how_you_heard_about_hackru")} onChange={(e) => setUserData({ ...userData, how_you_heard_about_hackru: e.target.value })} />
                  {errors.how_you_heard_about_hackru && (<p className="text-xs italic text-red-500 mt-2">{errors.how_you_heard_about_hackru?.message}</p>)}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reasons">What are your reasons for joining HackRU</Label>
                  <textarea
                    className="flex h-24 resize-none w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="reasons"
                    value={userData?.reasons}
                    {...register("reasons")}
                    onChange={(e) => setUserData({ ...userData, reasons: e.target.value })}
                  />
                  {errors.reasons && (<p className="text-xs italic text-red-500 mt-2">{errors.reasons?.message}</p>)}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">Save</Button>
              </CardFooter>
            </form>
          </Card>

        </div>
      </main>
    );
  }

}
