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
    <div className="mt-2 flex w-full max-w-2xl flex-col items-center justify-center space-y-8 text-black">
      <div className="mt-20 flex h-fit w-full flex-col items-center gap-3">
        {/* <Avatar className="h-24 w-24">
          <AvatarInitials>
            {userData?.first_name[0]}
            {userData?.last_name[0]}
          </AvatarInitials>
        </Avatar> */}
        <div className="grid w-full gap-0.5 overflow-ellipsis text-xs">
          <div className="text-xl font-medium ">
            {userData?.first_name} {userData?.last_name}
          </div>
          <div className="text-lg font-medium ">
            {userData &&
              Object.keys(userData.role).find((key) => userData.role[key])}
          </div>
          <div className=" dark:text-gray-400">{userData?.email}</div>

          <Button
            className="my-2 h-8 w-24"
            onClick={async () => {
              await handleSignOut();
              window.location.href = '/';
            }}
          >
            Log Out
          </Button>
        </div>
        {/* <div className="mb-8 text-center">
          <Link href="/dashboard/raffle">
            <Button className="text-lg">Enter Raffle Dashboard</Button>
          </Link>
        </div> */}
      </div>

      <Card className="w-full max-w-2xl">
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
                {waiverState && (
                  <p className="mt-2 text-xs italic text-green-500">
                    {'Waiver Uploaded'}
                  </p>
                )}
                <div className="flex flex-row items-center justify-center">
                  <p>
                    Click
                    <a
                      className="hover:underline"
                      href="https://docs.google.com/document/d/1ih5iTAA4JkMaGj90sZPBOXErpq2_IKFCQ3tcy4Pmypw/copy"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {' '}
                      HERE{' '}
                    </a>
                    for waiver
                  </p>
                  <input
                    className="ml-auto mr-0"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      handleChangingFile(e, 'application/pdf', 'WAIVER');
                    }}
                    required
                  ></input>
                </div>
                <div className="justify-left flex flex-row items-center">
                  <input
                    type="checkbox"
                    className="mr-3 rounded text-pink-500"
                    required
                  />
                  <p>
                    I have read and agree to the
                    <a
                      className="text-blue-300 hover:text-blue-500"
                      href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {' '}
                      MLH Code of Conduct
                    </a>
                  </p>
                </div>
                <div className="justify-left flex flex-row items-center">
                  <input
                    type="checkbox"
                    className="mr-3 rounded text-pink-500"
                    required
                  />
                  <p>
                    I authorize you to share my application/registration
                    information for event administration, ranking, MLH
                    administration, pre- and post-event informational e-mails,
                    and occasional messages about hackathons in-line with the{' '}
                    <a
                      className="text-blue-300 hover:text-blue-500"
                      href="https://mlh.io/privacy"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      MLH Privacy Policy
                    </a>
                    . Further, I agree to the terms of both the{' '}
                    <a
                      className="text-blue-300 hover:text-blue-500"
                      href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      MLH Contest Terms and Conditions
                    </a>{' '}
                    and the{' '}
                    <a
                      className="text-blue-300 hover:text-blue-500"
                      href="https://mlh.io/privacy"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      MLH Privacy Policy
                    </a>
                  </p>
                </div>
                <div className="justify-left flex flex-row items-center">
                  <input
                    type="checkbox"
                    className="mr-3 rounded text-pink-500"
                    onChange={(e) => (userData.opt_in = e.target.checked)}
                  />
                  <p>
                    I authorize MLH to send me occasional emails about relevant
                    events, career opportunities, and community announcements.
                    (optional)
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <CardTitle>Unregistered</CardTitle>
                  <Button
                    type="submit"
                    className="ml-auto"
                    onClick={() => console.log('register button clicked')}
                  >
                    Register
                  </Button>
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
                      waitlist. Show up closer to our delayed check-in phase
                      where hackers will be checked in based on remaining
                      availability! In the meantime, any confirmed teammates can
                      wait in the venue.
                    </CardDescription>
                  </div>
                </div>
              </>
            )}
            {userData.registration_status == 'confirmed' && (
              <>
                <CardTitle>
                  Get ready to code! You&apos;re fully signed up and ready to
                  show up on October 4th.
                </CardTitle>
                <CardDescription>
                  Get ready to code! You&apos;re fully signed up and ready to
                  show up on October 4th. You are guarenteed entry if you show
                  up before 10:30am, at which point it will be first come first
                  served.
                </CardDescription>
              </>
            )}
            {(userData.registration_status == 'confirmation' ||
              userData.registration_status == 'coming' ||
              userData.registration_status == 'not_coming') && (
              <>
                <div className="flex flex-row items-center justify-center">
                  {uploadingNewConfirmationStatus && (
                    <p className="">Loading confirmation status...</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}

                  {!uploadingNewConfirmationStatus && (
                    <>
                      {userData.registration_status == 'confirmation' && (
                        <>
                          <CardTitle>
                            RSVP: We&apos;re ready to begin moving hackers to
                            acceptance! Please confirm your availability and let
                            us know if you&apos;re &quot;Coming.&quot; We will
                            begin moving hackers to acceptance on a first-come,
                            first-served basis. If your teammates haven&apos;t
                            registered yet, tell them to do so ASAP! We admit
                            individual hackers based on FCFS priority and use
                            team formations to keep your friends with you!
                          </CardTitle>
                          <Button
                            className="ml-auto"
                            onClick={() => onConfirmationChange(true)}
                          >
                            Coming
                          </Button>
                          <Button
                            className="ml-auto"
                            onClick={() => onConfirmationChange(false)}
                          >
                            Not Coming
                          </Button>
                        </>
                      )}
                      {userData.registration_status == 'coming' && (
                        <>
                          <CardTitle>
                            Thanks for letting us know you can make it!
                            We&apos;re slowly moving hackers into the final
                            confirmation stage based on first-come first-serve
                            responses.
                          </CardTitle>
                          <Button
                            className="ml-auto"
                            onClick={() => onConfirmationChange(false)}
                          >
                            Not Coming
                          </Button>
                        </>
                      )}
                      {userData.registration_status == 'not_coming' && (
                        <>
                          <CardTitle>
                            You are not coming. Thanks for letting us know.
                          </CardTitle>
                          <Button
                            className="ml-auto"
                            onClick={() => onConfirmationChange(true)}
                          >
                            Coming
                          </Button>
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
