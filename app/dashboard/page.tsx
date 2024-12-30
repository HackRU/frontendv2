'use client';

import { UpdateSelf, getSelf, getUsers, RegisterSelf } from '@/app/lib/data';
import { useState, useEffect, Suspense } from 'react';

import {
  AvatarImage,
  AvatarInitials,
  Avatar,
} from '@/app/dashboard/components/avatar';
import Image from 'next/image';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/app/dashboard/components/card';
import { Label } from '@/app/dashboard/components/label';
import { Input } from '@/app/dashboard/components/input';
import { Button } from '@/app/dashboard/components/button';
import OrganizerView from '@/app/dashboard/views/organizerView';
import DirectorView from '@/app/dashboard/views/directorView';
import {
  UploadWaiver,
  GetWaiverInfo,
  GetResume,
  UploadResume,
  UploadTeamSubmission,
  GetPoints,
} from '../lib/actions';
import QRCode from 'react-qr-code';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { set, z } from 'zod';
import Cursor from '../ui/cursor';
import Navbar from '../(pre-dashboard)/(landing)/sections/Hero/Navbar';
import ProfileHeader from './components/profileHeader';
import DiscordAuth from './components/discord';
import DashboardSkeleton, { HackerDashboardSkeleton } from '../ui/skeletons';
import PopupDialog from './components/dialog';
import { mlhSchools } from '@/app/lib/constants';
import { countries as countryConstants } from '@/app/lib/constants';
import { majors as majorConstants } from '@/app/lib/constants';

import { useSearchParams } from 'next/navigation';

import { OptInSelf } from '@/app/lib/data';

let whenTeamCreationBegins = new Date('March 23, 2024 12:00:00');
const numOfMinsUntilTeamCreation =
  (whenTeamCreationBegins.getTime() - Date.now()) / 60000;

interface PointsRequestResponse {
  balance: number;
  total_points: number;
  buy_ins: {
    buy_in: number;
    prize_id: string;
  }[];
}

const UserUpdateSchema = z.object({
  first_name: z.string().min(1, 'Field cannot be empty'),
  last_name: z.string().min(1, 'Field cannot be empty'),
  resume: z.any(),
  github: z.string(),
  major: z.string(),
  short_answer: z.string(),
  shirt_size: z.string(),
  hackathon_count: z.string(),
  dietary_restrictions: z.string(),
  special_needs: z.string(),
  age: z.string(),
  school: z.string(),
  grad_year: z.string(),
  gender: z.string(),
  level_of_study: z.string(),
  country_of_residence: z.string(),
  ethnicity: z.string(),
  phone_number: z
    .number({
      invalid_type_error: 'Enter Phone Number in the format 1234567890',
    })
    .min(1000000000)
    .max(9999999999),
  how_you_heard_about_hackru: z.string(),
  reasons: z.string(),
});

export type UserUpdate = z.infer<typeof UserUpdateSchema>;

const TeamSubmitSchema = z.object({
  team_member_A: z.string().email(),
  team_member_B: z.string().optional(),
  team_member_C: z.string().optional(),
});

const logoImage = {
  Bitsprout: '/landing/bitsprout.png',
  Python: '/landing/python.png',
  Pseudoclaw: '/landing/pseudoclaw.png',
  'Roar.js': '/landing/roar.js.png',
};

export type TeamSubmit = z.infer<typeof TeamSubmitSchema>;

export default function Dashboard() {
  const [selectedMajor, setSelectedMajor] =
    useState<string>('No major selected');
  const [otherMajor, setOtherMajor] = useState<string>('');
  const [majors, setMajors] = useState<string[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [teamFormData, setTeamFormData] = useState<any>(null);

  const [pointsData, setPointsData] = useState<{
    balance: number;
    total_points: number;
  } | null>(null);

  const [waiverState, setWaiverState] = useState<any>(null);
  const [savingUserProfile, setSavingUserProfile] = useState<boolean>(false);
  const [submittingTeamForm, setSubmittingTeamForm] = useState<boolean>(false);
  const [submittingPreEventTeamForm, setSubmittingPreEventTeamForm] = useState<string>('Submit Team');
  const [userProfileSubmitText, setUserProfileSubmitText] =
    useState<string>('Save');

  const [
    displayTeamFormFinalSubmissionWarning,
    setDisplayTeamFormFinalSubmissionWarning,
  ] = useState<boolean>(false);
  const [displayTeamConfimWarning, setTeamConfimWarning] = useState<boolean>(false);
  const [teamSubmissionError, setTeamSubmissionError] = useState<string>('');
  const [currentTeam, setCurrentTeam] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: userData,
  });
  const {
    register: registerTeam,
    handleSubmit: handleSubmitTeam,
    reset: resetTeam,
    formState: { errors: errorsTeam },
  } = useForm<TeamSubmit>({
    resolver: zodResolver(TeamSubmitSchema),
    defaultValues: userData,
  });

  const [waiverFile, setWaiverFile] = useState<File | null>(null);
  const [resumeExists, setResumeExists] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const onTeamSubmit = async (data: TeamSubmit) => {
    setSubmittingTeamForm(true);

    if (!('email' in userData)) {
      alert(
        'Invalid userData for session! Please refresh the page and try. If the problem persists, please contact HackRU.',
      );
      return;
    }

    const current_email: string = userData.email;
    if (current_email === '') {
      alert(
        'Invalid email in user data! Please refresh the page and try. If the problem persists, please contact HackRU.',
      );
      return;
    }

    const resp = await UploadTeamSubmission(current_email, data);
    console.log(resp);
    const team_id = resp.team_id;

    if (resp.error.length > 0 || team_id === undefined || team_id === 0) {
      const error = resp.error;
      setTeamSubmissionError(error);
    } else {
      setCurrentTeam(team_id);
    }

    setSubmittingTeamForm(false);
  };

  const onSubmit = async (data: UserUpdate) => {
    setSavingUserProfile(true);
    const { resume, ...otherData } = data;

    const fileList = resume as FileList;
    if (fileList.length === 1) {
      const pdf = fileList[0];

      const resumeData = new FormData();
      resumeData.set('file', pdf as File);
      const resp = await UploadResume(resumeData);
      console.log('RESUME UPLOAD FROM DASHBOARD');
      console.log(resp);

      if (resp.error.length > 0) {
        alert(
          'There was an error uploading your resume. Please try again. If the problem persists, please email rnd@hackru.org',
        );
      }
    }

    const resp = await UpdateSelf(otherData);
    setUserData({
      ...userData,
      major: data.major,
      shirt_size: data.shirt_size,
      hackathon_count: data.hackathon_count,
      dietary_restrictions: data.dietary_restrictions,
      age: data.age,
      school: data.school,
      gender: data.gender,
      grad_year: data.grad_year,
      level_of_study: data.level_of_study,
      country_of_residence: data.country_of_residence,
      ethnicity: data.ethnicity,
    });

    setSavingUserProfile(false);
    if (resp.length > 0) {
      setUserProfileSubmitText('Failed!');
    }

    setUserProfileSubmitText('Saved!');
  };

  const onWaiverSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (waiverFile) {
      //works
      try {
        const data = new FormData();
        data.set('file', waiverFile);
        const requiredFields = [
          'first_name',
          'last_name',
          'resume',
          'github',
          'major',
          'short_answer',
          'shirt_size',
          'hackathon_count',
          'dietary_restrictions',
          'special_needs',
          'age',
          'school',
          'grad_year',
          'gender',
          'level_of_study',
          'country_of_residence',
          'ethnicity',
          'how_you_heard_about_hackru',
          'reasons',
          'phone_number',
        ];
        const fieldtext = [
          'First Name',
          'Last Name',
          'Resume',
          'Github',
          'major',
          'What are you hoping to experience at HackRU?',
          'Shirt Size',
          'Hackathon Count',
          'Dietary Restrictions',
          'Anything we should account for?',
          'age',
          'school',
          'Graduation Year',
          'Gender',
          'Level of Study',
          'Country of Residence',
          'Ethnicity',
          'How you heard about hackru',
          'reasons for attending',
          'phone number',
        ];
        for (let i = 0; i < requiredFields.length; i++) {
          if (!userData[requiredFields[i]]) {
            if (requiredFields[i] == 'resume' && resumeExists) {
            } else {
              console.log('THIS FIELD IS FAIL' + requiredFields[i]);
              trigger(requiredFields[i] as any, { shouldFocus: true });
              alert(
                `Please scroll down and fill out ${fieldtext[i]} and the entire profile and save before registering`,
              );
              return;
            }
          }
        }

        await UploadWaiver(data);
        if (Object.keys(errors).length === 0) {
          const resp = await RegisterSelf();
          if (resp == 'User updated successfully') {
            setUserData({ ...userData, registration_status: 'registered' });
          }
        }

        //window.location.reload();
      } catch (error) {
        console.error('Error uploading waiver:', error);
        alert('Error uploading waiver. Please contact HackRU.');
      }
    } else {
      console.error('No waiver file selected'); //works
      alert('Please select a waiver file');
    }
  };
  const handleChangingFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    acceptedFormats: string,
    input: 'WAIVER' | 'RESUME',
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === acceptedFormats && input === 'WAIVER') {
        setWaiverFile(selectedFile);
        console.log('waiver file: ', selectedFile);
      } else if (selectedFile.type === acceptedFormats && input === 'RESUME') {
        // i'm just as confused... going to make file upload more consistent here....
        // most likely, we don't need this condition.... just think about it later
      } else {
        alert('Invalid file format. Please select a PDF file.');
      }
    }
  };

  const updateTeam = async() =>{
    const resp = await UpdateSelf({team_member_1 : userData.team_member_1, team_member_2 : userData.team_member_2, team_member_3 : userData.team_member_3})
    console.log(resp)
    if (resp === "User updated successfully") {
      setSubmittingPreEventTeamForm("Saved!");
    }
    else{
      setSubmittingPreEventTeamForm("Failed");
    }
    
  }

  // First useEffect to fetch and set schools data
  useEffect(() => {
    try {
      const lines = majorConstants
        .split('\n')
        .filter((line) => line.trim() !== '');
      const parsedData = lines.map((line) => line.trim().replace(/['"]/g, ''));
      setMajors(parsedData);
    } catch (error) {
      console.error('Error fetching or parsing major data:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const lines = mlhSchools.split('\n').filter((line) => line.trim() !== '');
      const parsedData = lines.map((line) => line.trim().replace(/['"]/g, ''));
      setSchools(parsedData);
    } catch (error) {
      console.error('Error fetching or parsing schools data:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const lines = countryConstants
        .split('\n')
        .filter((line) => line.trim() !== '');
      const parsedData = lines.map((line) => line.trim().replace(/['"]/g, ''));
      setCountries(parsedData);
    } catch (error) {
      console.error('Error fetching or parsing country data:', error);
    }
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getSelf();
        const points = await GetPoints();

        const pointsResponseBody =
          points.response as unknown as PointsRequestResponse;

        setPointsData({
          balance: pointsResponseBody.balance ? pointsResponseBody.balance : 0,
          total_points: pointsResponseBody.total_points
            ? pointsResponseBody.total_points
            : 0,
        });

        if (data.error != '') {
          alert(data.error.message);
        }

        setUserData(data.response);
        const resumeInfo = await GetResume();
        setResumeExists(resumeInfo.response.hasUploaded);

        const haswaiver = await GetWaiverInfo();
        setWaiverState(haswaiver.response.hasUploaded);
        const pointResp = await GetPoints();
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
    reset();
  }, []);

  useEffect(() => {
    if (userData && userData.team_id) {
      setCurrentTeam(userData.team_id);
    }
  }, [userData]);

  if (!userData || !userData.role) {
    return <HackerDashboardSkeleton />;
  }

  if (!(userData instanceof Object)) {
    return (
      <main>
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        <div className="flex flex-col items-center justify-center space-y-8 p-4">
          <h1 className="text-2xl font-bold">Error: Invalid User Data</h1>
          <p>Please clear your cookies and refresh the page.</p>
        </div>
      </main>
    );
  }
  if (userData?.role['organizer']) {
    return <OrganizerView />;
  } else if (userData?.role['director']) {
    return <DirectorView userData={userData} />;
  } else if (userData?.role.hacker) {
    //FALSE SINCE WE WANT TO OPT IN ON REGISTRATION
    //REMOVE ONCE OPTIN WORKING AS EXPECTED
    if (false && userData?.opt_in == null) {
      return (
        <div className="flex flex-col items-center justify-center space-y-8 p-4">
          <ProfileHeader
            userData={userData}
            waiverState={waiverState}
            handleChangingFile={handleChangingFile}
            onWaiverSubmit={onWaiverSubmit}
          />
          <Card className="mt-32 w-full max-w-2xl">
            <CardHeader>
              <CardTitle>
                Would you like to opt-in to Major League Hacking emails? You
                must choose before you can proceed.
              </CardTitle>
              <CardDescription>
                <Button
                  onClick={async () => {
                    const resp = await OptInSelf(true);
                    if (resp == 'GOOD') {
                      setUserData({ ...userData, opt_in: true });
                    }
                  }}
                  type="button"
                  className="mt-10"
                >
                  OPT IN
                </Button>
                <Button
                  onClick={async () => {
                    const resp = await OptInSelf(false);
                    if (resp == 'GOOD') {
                      setUserData({ ...userData, opt_in: false });
                    }
                  }}
                  type="button"
                  className="mx-10"
                >
                  OPT OUT
                </Button>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      );
    }
    return (
      <main>
        <Navbar />
        <Suspense>
          <Cursor />
        </Suspense>
        <div className="flex flex-col items-center justify-center space-y-8 p-4">
          <ProfileHeader
            userData={userData}
            waiverState={waiverState}
            handleChangingFile={handleChangingFile}
            onWaiverSubmit={onWaiverSubmit}
          />
          {/*Getting ride of house info as well */}
          {userData?.registration_status === 'checked_in' && false && (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>House Information</CardTitle>
                <CardDescription>
                  Your house is {userData?.house}!
                  <Image
                    src={logoImage[userData?.house as keyof typeof logoImage]}
                    alt={userData?.house}
                    width={200}
                    height={200}
                    priority
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          )}
          {userData?.registration_status === 'checked_in' && false && (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Team Creation</CardTitle>
                <CardDescription>
                  Create your team here. Team creation begins in{' '}
                  {Math.max(numOfMinsUntilTeamCreation, 0).toFixed(0)} minutes.
                  <br />
                  <br />
                  <strong>READ CLOSELY</strong>: Only ONE person needs to submit
                  their team. The team leader (the person who fills out this
                  form) will type in the emails of their team members.
                  <br />
                  <br />
                  NO ONE else BUT the team leader of the team needs to submit
                  this form. Once submitted, team members can refresh their page
                  to see their team id.
                </CardDescription>
              </CardHeader>
              {submittingTeamForm && (
                <CardContent>
                  <p>Submitting team information.</p>
                </CardContent>
              )}
              {currentTeam === 0 &&
                numOfMinsUntilTeamCreation <= 0 &&
                userData?.registration_status == 'checked_in' && (
                  <CardContent>
                    <p>Submitting team information.</p>
                  </CardContent>
                )}
              {currentTeam === 0 &&
                numOfMinsUntilTeamCreation <= 0 &&
                userData?.registration_status == 'checked-in' && (
                  <CardContent>
                    <form
                      id="team-creation-form"
                      onSubmit={handleSubmitTeam(onTeamSubmit)}
                    >
                      <div>
                        {teamSubmissionError && (
                          <p className="text-sm text-red-500">
                            {teamSubmissionError}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="team_member_A">
                          Team Member A (not the one filling this form) * Must
                          be filled.{' '}
                        </Label>
                        <Input
                          id="team_member_A"
                          value={teamFormData?.team_member_A}
                          {...registerTeam('team_member_A')}
                          onChange={(e) =>
                            setTeamFormData({
                              ...teamFormData,
                              team_member_A: e.target.value,
                            })
                          }
                        />
                        {errorsTeam.team_member_A && (
                          <p className="mt-2 text-xs italic text-red-500">
                            {errorsTeam.team_member_A?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="team_member_B">
                          Team Member B (not the one filling this form)
                        </Label>
                        <Input
                          id="team_member_B"
                          value={teamFormData?.team_member_B}
                          {...registerTeam('team_member_B')}
                          onChange={(e) =>
                            setTeamFormData({
                              ...teamFormData,
                              team_member_B: e.target.value,
                            })
                          }
                        />
                        {errorsTeam.team_member_B && (
                          <p className="mt-2 text-xs italic text-red-500">
                            {errorsTeam.team_member_B?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="team_member_C">
                          Team Member C (not the one filling this form)
                        </Label>
                        <Input
                          id="team_member_C"
                          value={teamFormData?.team_member_C}
                          {...registerTeam('team_member_C')}
                          onChange={(e) =>
                            setTeamFormData({
                              ...teamFormData,
                              team_member_C: e.target.value,
                            })
                          }
                        />
                        {errorsTeam.team_member_C && (
                          <p className="mt-2 text-xs italic text-red-500">
                            {errorsTeam.team_member_C?.message}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          if (Object.keys(errorsTeam).length === 0) {
                            setDisplayTeamFormFinalSubmissionWarning(true);
                          }
                        }}
                        type="button"
                        className="mt-10"
                      >
                        {submittingTeamForm ? 'Submitting...' : 'Submit Team'}
                      </Button>
                      <PopupDialog
                        open={displayTeamFormFinalSubmissionWarning}
                        setOpen={setDisplayTeamFormFinalSubmissionWarning}
                        onYes={() => {
                          setTeamSubmissionError('');
                          handleSubmitTeam(onTeamSubmit)();
                        }}
                        onNo={() => {}}
                        title="Final Submission Warning"
                        content="ARE YOU ABSOLUTELY SURE THIS IS YOUR TEAM?! YOU CANNOT UNDO THIS ACTION. PLEASE MAKE SURE YOUR TEAM EMAILS ARE RIGHT!!"
                      />
                    </form>
                  </CardContent>
                )}
              {currentTeam !== 0 && !submittingTeamForm && (
                <CardContent>
                  <p>
                    Your team has been created!
                    <br />
                    <strong>Your team id is</strong>: {currentTeam}.
                    <br />
                    <br />
                    Please have your team members refresh their dashboards and
                    verify that you all have the same team ids.
                  </p>
                </CardContent>
              )}
            </Card>
          )}
          {pointsData && userData.registration_status == 'checked_in' && (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className = "text-green-500">Points Information</CardTitle>
                <CardDescription>
                  Your current points balance and total earned points. At the
                  end of the hackathon, there will be a grand raffle for prizes
                  based on the total number of points you have ever earned. Stay
                  tuned until the end.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg">
                    Current Balance:{' '}
                    <span className="text-green-500 font-bold">
                      {pointsData.balance} points
                    </span>
                  </p>
                  <p className="text-lg">
                    Total Points Earned:{' '}
                    <span className="text-green-500 font-bold">
                      {pointsData.total_points} points
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <Button asChild>
                    <a href="/dashboard/raffle">Go to Raffle</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {
            <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Pre Event Team</CardTitle>
              <CardDescription>Please enter your teammates emails in the fields below. 
                This hackathon is first come first serve, but we will try to make sure that full teams make it through if they are listed here. 
                This does not guarantee a full team to be able to join. 
                The teammates you list here do not have to be final, you are allowed to change your team members before submission of your hack. 
                After you have confirmed your attendance, you will no longer be allowed to change this field.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="m-4">
                <Label htmlFor="team_member_1">Team Member 1</Label>
                  <Input
                    id="team_member_1"
                    value={userData?.team_member_1}
                    onChange={(e) =>
                      setUserData({ ...userData, team_member_1: e.target.value })
                    }
                  />
              </div>
              <div className="m-4">
                <Label htmlFor="team_member_2">Team Member 2</Label>
                  <Input
                    id="team_member_2"
                    value={userData?.team_member_2}
                    onChange={(e) =>
                      setUserData({ ...userData, team_member_2: e.target.value })
                    }
                  />
              </div>
              <div className="m-4">
                <Label htmlFor="team_member_3">Team Member 3</Label>
                  <Input
                    id="team_member_3"
                    value={userData?.team_member_3}
                    onChange={(e) =>
                      setUserData({ ...userData, team_member_3: e.target.value })
                    }
                  />
              </div>
              <Button
                onClick={() => {
                  setTeamConfimWarning(true);
                }}
                type="button"
                className="mt-10"
              >
              {submittingPreEventTeamForm}
            </Button>
            <PopupDialog
              open={displayTeamConfimWarning}
              setOpen={setTeamConfimWarning}
              onYes={() => {
                setSubmittingPreEventTeamForm('Submitting...')
                updateTeam()
              }}
              onNo={() => {}}
              title="Submission Warning"
 
              content={"Are you sure you want the following emails on your team " + userData?.team_member_1 + " " + userData?.team_member_2 + " " + userData?.team_member_3}
            />

            </CardContent>
          </Card>
          }
          {false && (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Links</CardTitle>
                <CardDescription>Links to various things</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="m-4">
                  <Button>
                    <a href="/games">Go to Tetris</a>
                  </Button>
                  <Button className="mx-2">
                    <a href="https://rsvp.withgoogle.com/events/coe-general-form_577b9e/sessions/rutgers-ru-hack">
                      Google Interest Form{' '}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex flex-col ">
                <div className="flex flex-col">
                  <CardTitle>QR Code</CardTitle>
                  <CardDescription>
                    Use this QR code to check-in or scan-in for events!
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-md bg-white p-4">
                <QRCode value={userData?.email} size={256} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex flex-col ">
                <div className="flex flex-col">
                  <CardTitle>Discord</CardTitle>
                  <CardDescription>
                    Use this to validate your HACKRU account with your Discord
                    Account! If you do not validate with discord by the time of
                    hackathon, you will not have write access to the server and
                    can only view things that are happening
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DiscordAuth
                userData={userData}
                code={searchParams.get('code')}
              />
            </CardContent>
          </Card>
          <Card className="w-full max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <div className="flex flex-row items-center justify-center">
                  <div className="flex flex-col">
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>
                      Update your profile information. * fields are required
                    </CardDescription>
                  </div>
                  <Button type="submit" className="ml-auto">
                    {savingUserProfile ? 'Saving...' : userProfileSubmitText}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={userData?.first_name}
                    {...register('first_name')}
                    onChange={(e) =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                  />
                  {errors.first_name && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.first_name?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={userData?.last_name}
                    {...register('last_name')}
                    onChange={(e) =>
                      setUserData({ ...userData, last_name: e.target.value })
                    }
                  />
                  {errors.last_name && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.last_name?.message}
                    </p>
                  )}
                </div>

                {/* Add resume upload file here */}
                <div className="space-y-2">
                  <Label htmlFor="resume">
                    {resumeExists ? 'Resume (Already Uploaded) *' : 'Resume *'}
                  </Label>
                  <Input
                    type="file"
                    id="resume"
                    accept="application/pdf"
                    {...register('resume')}
                    onChange={(e) => {
                      setUserData({ ...userData, resume: e.target.value });
                      // handleChangingFile(e, "application/pdf", "RESUME");
                    }}
                  />
                  <a className="text-sm text-blue-200 underline">
                    Resumes may be considered for potential internships and
                    employment!
                  </a>
                </div>

                {/* <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={userData?.email} {...register("email")} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                {errors.email && (<p className="text-xs italic text-red-500 mt-2">{errors.email?.message}</p>)}
              </div> */}

                <div className="space-y-2">
                  <Label htmlFor="github">Github *</Label>
                  <Input
                    id="github"
                    value={userData?.github}
                    {...register('github')}
                    onChange={(e) =>
                      setUserData({ ...userData, github: e.target.value })
                    }
                  />
                  {errors.github && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.github?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major *</Label>

                  <select
                    id="major"
                    value={selectedMajor}
                    {...register('major')}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setSelectedMajor(selected);
                      if (selected != 'Other') {
                        setUserData({ ...userData, major: selected });
                      }
                    }}
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                  >
                    {majors.map((major, index) => (
                      <option key={index} value={major}>
                        {major}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>

                  {selectedMajor === 'Other' && (
                    <Input
                      placeholder="Enter major here"
                      id="otherMajor"
                      value={otherMajor}
                      onChange={(e) => {
                        const newMajor = e.target.value;
                        setUserData({ ...userData, major: newMajor });
                        setOtherMajor(newMajor);
                      }}
                    />
                  )}
                  {errors.major && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.major?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="short-answer">
                    What are you hoping to experience at HackRU? *
                  </Label>
                  <textarea
                    className="flex h-24 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="short-answer"
                    value={userData?.short_answer}
                    {...register('short_answer')}
                    onChange={(e) =>
                      setUserData({ ...userData, short_answer: e.target.value })
                    }
                  />
                  {errors.short_answer && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.short_answer?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shirt-size">Shirt Size *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.shirt_size}
                    {...register('shirt_size')}
                    onChange={(e) =>
                      setUserData({ ...userData, shirt_size: e.target.value })
                    }
                  >
                    <option value="Unisex S">Unisex S</option>
                    <option value="Unisex M">Unisex M</option>
                    <option value="Unisex L">Unisex L</option>
                    <option value="Unisex XL">Unisex XL</option>
                    <option value="Unisex XXL">Unisex XXL</option>
                  </select>
                  {errors.shirt_size && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.shirt_size?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietary-restrictions">
                    Dietary Restrictions *
                  </Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.dietary_restrictions}
                    {...register('dietary_restrictions')}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        dietary_restrictions: e.target.value,
                      })
                    }
                  >
                    <option value="None">None</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Celiac Disease">Celiac Disease</option>
                    <option value="Allergies">Allergies</option>
                    <option value="Kosher">Kosher</option>
                    <option value="Halal">Halal</option>
                  </select>
                  {errors.dietary_restrictions && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.dietary_restrictions?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="special-needs">
                    Anything we should account for? *
                  </Label>
                  <Input
                    id="special-needs"
                    value={userData?.special_needs}
                    {...register('special_needs')}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        special_needs: e.target.value,
                      })
                    }
                  />
                  {errors.special_needs && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.special_needs?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Age *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.age}
                    {...register('age')}
                    onChange={(e) =>
                      setUserData({ ...userData, age: e.target.value })
                    }
                  >
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                  </select>
                  {errors.age && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.age?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School *</Label>
                  <select
                    id="school"
                    value={userData?.school}
                    {...register('school')}
                    onChange={(e) =>
                      setUserData({ ...userData, school: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                  >
                    {schools.map((school, index) => (
                      <option key={index} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                  {errors.school && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.school?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grad-year">Graduation Year *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.grad_year}
                    {...register('grad_year')}
                    onChange={(e) =>
                      setUserData({ ...userData, grad_year: e.target.value })
                    }
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                    <option value="2031">2031</option>
                    <option value="2032">2032</option>
                    <option value="2033">2033</option>
                    <option value="2034">2034</option>
                    <option value="2035">2035</option>
                    <option value="2036">2036</option>
                    <option value="2037">2037</option>
                    <option value="2038">2038</option>
                    <option value="2039">2039</option>
                    <option value="2040">2040</option>
                  </select>
                  {errors.grad_year && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.grad_year?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.gender}
                    {...register('gender')}
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.gender?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level-of-study">Level of Study *</Label>
                  <select
                    id="level-of-study"
                    value={userData?.level_of_study}
                    {...register('level_of_study')}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        level_of_study: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                  >
                    <option value="Less than Secondary / High School">
                      Less than Secondary / High School
                    </option>
                    <option value="Secondary / High School">
                      Secondary / High School
                    </option>
                    <option value="Undergraduate University (2 year - community college or similar)">
                      Undergraduate University (2 year - community college or
                      similar)
                    </option>
                    <option value="Undergraduate University (3+ year)">
                      Undergraduate University (3+ year)
                    </option>
                    <option value="Graduate University (Masters, Professional, Doctoral, etc)">
                      Graduate University (Masters, Professional, Doctoral, etc)
                    </option>
                    <option value="Code School / Bootcamp">
                      Code School / Bootcamp
                    </option>
                    <option value="Other Vocational / Trade Program or Apprenticeship">
                      Other Vocational / Trade Program or Apprenticeship
                    </option>
                    <option value="Post Doctorate">Post Doctorate</option>
                    <option value="Other">Other</option>
                    <option value="I'm not currently a student">
                      I&apos;m not currently a student
                    </option>
                    <option value="Prefer not to answer">
                      Prefer not to answer
                    </option>
                  </select>
                  {errors.level_of_study && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.level_of_study?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country-of-residence">
                    Country of Residence *
                  </Label>
                  <select
                    id="country-of-residence"
                    value={userData?.country_of_residence}
                    {...register('country_of_residence')}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        country_of_residence: e.target.value,
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country_of_residence && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.country_of_residence?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ethnicity">Ethnicity *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.ethnicity}
                    {...register('ethnicity')}
                    onChange={(e) =>
                      setUserData({ ...userData, ethnicity: e.target.value })
                    }
                  >
                    <option value="American Indian/Alaska Native">
                      American Indian/Alaska Native
                    </option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">
                      Black or African American
                    </option>
                    <option value="Native Hawaiian or other Pacific Islander">
                      Native Hawaiian or other Pacific Islander
                    </option>
                    <option value="White">White</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.ethnicity && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.ethnicity?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hackathon-count">Hackathon Count *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="shirt-size"
                    value={userData?.hackathon_count}
                    {...register('hackathon_count')}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        hackathon_count: e.target.value,
                      })
                    }
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  {errors.hackathon_count && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.hackathon_count?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone # *</Label>
                  <Input
                    type="number"
                    id="phone-number"
                    value={userData?.phone_number}
                    {...register('phone_number', { valueAsNumber: true })}
                    onChange={(e) =>
                      setUserData({ ...userData, phone_number: e.target.value })
                    }
                  />
                  {errors.phone_number && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.phone_number?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="how-heard">
                    How you heard about HackRU? *
                  </Label>
                  <Input
                    id="how-heard"
                    value={userData?.how_you_heard_about_hackru}
                    {...register('how_you_heard_about_hackru')}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        how_you_heard_about_hackru: e.target.value,
                      })
                    }
                  />
                  {errors.how_you_heard_about_hackru && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.how_you_heard_about_hackru?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reasons">
                    What are your reasons for joining HackRU? *
                  </Label>
                  <textarea
                    className="flex h-24 w-full resize-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300"
                    id="reasons"
                    value={userData?.reasons}
                    {...register('reasons')}
                    onChange={(e) =>
                      setUserData({ ...userData, reasons: e.target.value })
                    }
                  />
                  {errors.reasons && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {errors.reasons?.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">
                  {savingUserProfile ? 'Saving...' : userProfileSubmitText}
                </Button>
              </CardFooter>
              {userData.registration_status == 'unregistered' && (
                <p className="p-3">
                  Make to register at the top after saving your profile!
                </p>
              )}
            </form>
          </Card>
        </div>
      </main>
    );
  }
}
