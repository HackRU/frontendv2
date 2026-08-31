import StatusBar from '@/app/dashboard/components/StatusBar';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarInitials } from './avatar';
import { Button } from './button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';
import { handleSignOut } from '@/app/lib/actions';
import { redirect } from 'next/dist/server/api-utils';
import { useState } from 'react';
import { ConfirmComingOrNot } from '@/app/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//TODO: coming and not-coming should be ENUMS!!!!

export default function ProfileHeader(props: {
  userData: any;
  onWaiverSubmit: any;
  handleChangingFile: any;
  waiverState: any;
}) {
  const { userData, onWaiverSubmit, handleChangingFile, waiverState } = props;
  const [uploadingNewConfirmationStatus, setUploadingNewConfirmationStatus] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedWaiverName, setSelectedWaiverName] = useState('');
  const router = useRouter();

  const requiredProfileFields = [
    'first_name',
    'last_name',
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
    'phone_number',
    'how_you_heard_about_hackru',
    'reasons',
  ];

  const profileReady = requiredProfileFields.every((field) => {
    const value = userData?.[field];

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) && value > 0;
    }

    return value !== null && value !== undefined && value !== '';
  });

  const registrationReady = profileReady && !!waiverState;

  const onConfirmationChange = async (isComing: boolean) => {
    setUploadingNewConfirmationStatus(true);
    const resp = await ConfirmComingOrNot(isComing);

    if (resp && resp.error == '') {
      window.location.reload();
      setUploadingNewConfirmationStatus(false);
      //force them to reload cause why not
      //let's play it safe... but please....
      //there's a better way to do this without refreshing. haha
      return;
    }

    if (resp.error) setErrorMessage(resp.error);
    setUploadingNewConfirmationStatus(false);
  };

  return (
    <div className="mt-2 flex w-full max-w-2xl flex-col items-center justify-center gap-4 px-3 text-white sm:mt-8 sm:px-0">
      <div className="mt-4 flex h-fit w-full flex-col items-center gap-3 text-center sm:mt-10">
        <div className="grid w-full gap-2 overflow-hidden text-center text-xs sm:text-sm">
          <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {userData?.first_name} {userData?.last_name}
          </div>
          <div className="text-base font-medium uppercase tracking-[0.18em] text-slate-300 sm:text-lg">
            {userData &&
              Object.keys(userData.role).find((key) => userData.role[key])}
          </div>
          <div className="break-all text-sm text-slate-300 sm:text-base">
            {userData?.email}
          </div>

          <Button
            variant="secondary"
            className="mx-auto my-2 h-10 w-full max-w-[160px] rounded-full border border-white/10 bg-white text-slate-900 hover:bg-slate-100"
            onClick={async () => {
              const result = await handleSignOut();
              if (result === 'success' || result === 'Something went wrong') {
                router.replace('/');
              }
            }}
          >
            Log Out
          </Button>
        </div>
      </div>

      <Card className="w-full max-w-2xl border border-white/10 bg-slate-900/80">
        <form
          onSubmit={async (e) => {
            setLoading(true);
            await onWaiverSubmit(e);
            setLoading(false);
          }}
        >
          <CardHeader>
            <CardTitle>Registration</CardTitle>
            <CardDescription>Check your registration status.</CardDescription>
            <StatusBar status={userData.registration_status} />
          </CardHeader>
          <CardContent className="space-y-4">
            {/* {userData.registration_status == 'unregistered' && (
              <>
                <div className="flex flex-row items-center">
                  <CardTitle>Unregistered – at this point, you will not be able to attend HackRU, we hope to see you in the spring!</CardTitle>
                </div>
              </>
            )} */}
            {userData.registration_status == 'unregistered' && (
              <>
                <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                        Step 1: Profile
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        Complete your HackRU profile first
                      </h3>
                    </div>
                    <span
                      className={`inline-flex w-fit shrink-0 self-start rounded-full px-2.5 py-1 text-xs font-semibold ${
                        profileReady
                          ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
                          : 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30'
                      }`}
                    >
                      {profileReady ? 'Profile complete' : 'Required'}
                    </span>
                  </div>

                  {!profileReady && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-slate-300 sm:text-base">
                        You need to finish and save your profile before you can
                        upload a waiver or register for HackRU.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-sky-400/40 bg-slate-950/60 text-sky-200 hover:bg-slate-800"
                        onClick={() =>
                          document
                            .getElementById('profile-form-card')
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      >
                        Go to profile form
                      </Button>
                    </div>
                  )}

                  {profileReady && (
                    <p className="mt-4 text-sm font-medium text-emerald-300 sm:text-base">
                      Your profile is complete. You can continue to the waiver.
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                        Step 2: Waiver
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        Upload your waiver
                      </h3>
                    </div>
                    <span
                      className={`inline-flex w-fit shrink-0 self-start rounded-full px-2.5 py-1 text-xs font-semibold ${
                        waiverState
                          ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
                          : profileReady
                            ? 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/30'
                            : 'bg-slate-700 text-slate-300 ring-1 ring-slate-600'
                      }`}
                    >
                      {waiverState
                        ? 'Waiver complete'
                        : profileReady
                          ? 'Required'
                          : 'Profile required'}
                    </span>
                  </div>

                  {!waiverState && (
                    <div className="mt-4 space-y-4">
                      {!profileReady && (
                        <p className="text-sm text-amber-200 sm:text-base">
                          Complete and save your profile first before uploading a
                          waiver.
                        </p>
                      )}

                      {profileReady && (
                        <p className="text-sm text-slate-300 sm:text-base">
                          Please review and upload the HackRU waiver. You cannot
                          complete registration until it&apos;s submitted.
                        </p>
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm sm:text-base">
                          Click
                          <a
                            className="font-medium text-sky-300 hover:underline"
                            href="https://docs.google.com/document/d/1B0k_l3S6rDiGmM6d6-3T5Cs6dkpKo9hiA8B5235vkYE/copy"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {' '}
                            here{' '}
                          </a>
                          to open the waiver
                        </p>
                        <div className="w-full max-w-xs sm:ml-auto sm:mr-0">
                          <input
                            className="w-full rounded-lg border border-slate-600 bg-slate-950/70 px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                            type="file"
                            accept=".pdf"
                            disabled={!profileReady}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              setSelectedWaiverName(file ? file.name : '');
                              handleChangingFile(e, 'application/pdf', 'WAIVER');
                            }}
                            required
                          ></input>
                          {selectedWaiverName && (
                            <p className="mt-2 text-xs text-slate-300">
                              Selected file:{' '}
                              <span className="font-medium text-white">
                                {selectedWaiverName}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/50 p-3">
                          <input
                            type="checkbox"
                            className="mt-1 rounded text-pink-500"
                            required
                          />
                          <p className="text-sm sm:text-base">
                            I have read and agree to the
                            <a
                              className="text-sky-300 hover:text-sky-200"
                              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {' '}
                              MLH Code of Conduct
                            </a>
                          </p>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/50 p-3">
                          <input
                            type="checkbox"
                            className="mt-1 rounded text-pink-500"
                            required
                          />
                          <p className="text-sm sm:text-base">
                            I authorize you to share my application/registration
                            information for event administration, ranking, MLH
                            administration, pre- and post-event informational
                            emails, and occasional messages about hackathons in
                            line with the{' '}
                            <a
                              className="text-sky-300 hover:text-sky-200"
                              href="https://mlh.io/privacy"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              MLH Privacy Policy
                            </a>
                            . Further, I agree to the terms of both the{' '}
                            <a
                              className="text-sky-300 hover:text-sky-200"
                              href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              MLH Contest Terms and Conditions
                            </a>{' '}
                            and the{' '}
                            <a
                              className="text-sky-300 hover:text-sky-200"
                              href="https://mlh.io/privacy"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              MLH Privacy Policy
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <Button
                          type="submit"
                          className="w-full sm:w-auto"
                          disabled={!profileReady || !selectedWaiverName}
                        >
                          Submit waiver
                        </Button>
                      </div>
                    </div>
                  )}

                  {waiverState && (
                    <p className="mt-4 text-sm font-medium text-emerald-300 sm:text-base">
                      Your waiver has been submitted. You may continue to
                      registration.
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                        Step 3: Registration
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">
                        Register for HackRU
                      </h3>
                    </div>
                    <Button
                      type="submit"
                      className="w-full sm:ml-auto sm:w-auto"
                      disabled={!registrationReady}
                      onClick={() => console.log('register button clicked')}
                    >
                      {registrationReady ? 'Register' : 'Complete profile + waiver'}
                    </Button>
                  </div>
                  {!registrationReady && (
                    <p className="mt-3 text-sm text-amber-200">
                      Finish your profile and upload the waiver before registering.
                    </p>
                  )}
                </div>
              </>
            )}
            {userData.registration_status == 'checked_in' && (
              <>
                <div className="flex flex-row items-center">
                  <CardTitle>You are now checked in!</CardTitle>
                </div>
              </>
            )}
            {userData.registration_status == 'registered' && (
              <>
                <div className="flex flex-row items-center">
                  <CardTitle>Registered!</CardTitle>
                </div>
              </>
            )}
            {userData.registration_status == 'waitlist' && (
              <>
                <div className="flex flex-col">
                  <CardTitle>Delayed Entry</CardTitle>
                  <div>
                    <CardDescription>
                      Unfortunately, we&apos;ve had to place you on our
                      waitlist. Show up closer to our delayed check-in phase at 10:45
                      where hackers will be checked in based on remaining
                      availability! 
                    </CardDescription>
                  </div>
                </div>
              </>
            )}
            {userData.registration_status == 'confirmed' && (
              <>
                <CardTitle>
                  Get ready to code! You&apos;re fully signed up and ready to
                  show up on October 10th.
                </CardTitle>
                <CardDescription>
                  Get ready to code! You&apos;re fully signed up and ready to
                  show up on October 10th. You are guarenteed entry if you show
                  up before 10:30am, at which point it will be first come first
                  served.
                </CardDescription>
              </>
            )}
            {(userData.registration_status == 'confirmation' ||
              userData.registration_status == 'coming' ||
              userData.registration_status == 'not_coming') && (
              <>
                <div className="flex flex-col gap-4">
                  {uploadingNewConfirmationStatus && (
                    <p className="text-sm sm:text-base">Loading confirmation status...</p>
                  )}
                  {errorMessage && (
                    <p className="text-sm text-red-500 sm:text-base">{errorMessage}</p>
                  )}

                  {!uploadingNewConfirmationStatus && (
                    <>
                      {userData.registration_status == 'confirmation' && (
                        <>
                          <CardTitle className="text-lg sm:text-xl">
                            RSVP: We&apos;re ready to begin moving hackers to
                            acceptance! Please confirm your availability and let
                            us know if you&apos;re &quot;Coming.&quot; We will
                            begin moving hackers to acceptance on a first-come,
                            first-served basis. If your teammates haven&apos;t
                            registered yet, tell them to do so ASAP! We admit
                            individual hackers based on FCFS priority and use
                            team formations to keep your friends with you!
                          </CardTitle>
                          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Button onClick={() => onConfirmationChange(true)}>
                              Coming
                            </Button>
                            <Button variant="outline" onClick={() => onConfirmationChange(false)}>
                              Not Coming
                            </Button>
                          </div>
                        </>
                      )}
                      {userData.registration_status == 'coming' && (
                        <>
                          <CardTitle className="text-lg sm:text-xl">
                            Thanks for letting us know you can make it!
                            We&apos;re slowly moving hackers into the final
                            confirmation stage based on first-come first-serve
                            responses.
                          </CardTitle>
                          <div className="flex justify-end">
                            <Button variant="outline" onClick={() => onConfirmationChange(false)}>
                              Not Coming
                            </Button>
                          </div>
                        </>
                      )}
                      {userData.registration_status == 'not_coming' && (
                        <>
                          <CardTitle className="text-lg sm:text-xl">
                            You are not coming. Thanks for letting us know.
                          </CardTitle>
                          <div className="flex justify-end">
                            <Button onClick={() => onConfirmationChange(true)}>
                              Coming
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
