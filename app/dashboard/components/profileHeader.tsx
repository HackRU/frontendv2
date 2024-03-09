import { Avatar } from "@radix-ui/react-avatar";
import { AvatarInitials } from "./avatar";
import { Button } from "./button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card";
import { handleSignOut } from "@/app/lib/actions";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { ConfirmComingOrNot } from "@/app/lib/data";

//TODO: coming and not-coming should be ENUMS!!!!

export default function ProfileHeader(props: {
  userData: any;
  onWaiverSubmit: any;
  handleChangingFile: any;
  waiverState: any;
}) {

  const { userData, onWaiverSubmit, handleChangingFile, waiverState } = props;
  const [uploadingNewConfirmationStatus, setUploadingNewConfirmationStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(userData.registration_status)

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
    <div className="w-full max-w-2xl flex flex-col items-center justify-center space-y-8 mt-2 text-white">
      <div className="flex flex-col items-center gap-3 w-full h-fit mt-20">
        <Avatar className="h-24 w-24">
          <AvatarInitials>{userData?.first_name[0]}{userData?.last_name[0]}</AvatarInitials>
        </Avatar>
        <div className="grid gap-0.5 text-xs overflow-ellipsis w-full">
          <div className="font-medium text-xl ">{userData?.first_name} {userData?.last_name}</div>
          <div className="font-medium text-lg ">{userData && Object.keys(userData.role).find(key => userData.role[key])}</div>
          <div className=" dark:text-gray-400">{userData?.email}</div>
          <Button
            className="w-24 h-8 my-2"
            onClick={async () => {
              await handleSignOut();
              window.location.href = "/";
            }}
          >Log Out</Button>
        </div>
        {/* Add component to log out */}

      </div>

      <Card className="w-full max-w-2xl">
        <form onSubmit={(onWaiverSubmit)}>
          <CardHeader>
            <CardTitle>Registration</CardTitle>
            <CardDescription>Check your registration status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(userData.registration_status == "unregistered") &&
              <>
                {waiverState && (<p className="text-xs italic text-green-500 mt-2">{"Waiver Uploaded"}</p>)}
                <div className="flex flex-row items-center justify-center">
                  <a className="underline" href="waiver.pdf" rel="noopener noreferrer" target="_blank">Click here for the waiver</a>
                  <input
                    className="ml-auto mr-0"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      handleChangingFile(e, "application/pdf", "WAIVER");
                    }}
                    required
                  ></input>
                </div>
                <div className="flex flex-row items-center justify-left">
                  <input type="checkbox" className="rounded text-pink-500 mr-3" required />
                  <p>I have read and agree to the
                    <a className="text-blue-300 hover:text-blue-500" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" rel="noopener noreferrer" target="_blank"> MLH Code of Conduct</a></p>
                </div>
                <div className="flex flex-row items-center justify-left">
                  <input type="checkbox" className="rounded text-pink-500 mr-3" required />
                  <p>I authorize you to share my application/registration information for event administration, ranking, MLH administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the{" "}
                    <a className="text-blue-300 hover:text-blue-500" href="https://mlh.io/privacy" rel="noopener noreferrer" target="_blank">MLH Privacy Policy</a>
                  </p>
                </div>
                <div className="flex flex-row items-center justify-left">
                  <input type="checkbox" className="rounded text-pink-500 mr-3" required />
                  <p> Further, I agree to the terms of both the{" "}
                    <a
                      className="text-blue-300 hover:text-blue-500"
                      href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                      rel="noopener noreferrer"
                      target="_blank"
                    >MLH Contest Terms and Conditions</a> and the{" "}
                    <a
                      className="text-blue-300 hover:text-blue-500"
                      href="https://mlh.io/privacy"
                      rel="noopener noreferrer"
                      target="_blank"
                    >MLH Privacy Policy</a></p>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <CardTitle>Unregistered</CardTitle>
                  <Button type="submit" className="ml-auto" onClick={() => console.log("register button clicked")}>Register</Button>
                </div>
              </>
            }
            {(userData.registration_status == "registered") &&
              <>
                <div className="flex flex-row items-center">
                  <CardTitle>Registered! You will be emailed about acceptance soon.</CardTitle>
                </div>
              </>
            }
            {(userData.registration_status == "confirmation" ||
              userData.registration_status == "coming" ||
              userData.registration_status == "not-coming"
            ) &&
              <>
                <div className="flex flex-row items-center justify-center">

                  {uploadingNewConfirmationStatus && <p className="">Loading confirmation status...</p>}
                  {
                    errorMessage && <p className="text-red-500">{errorMessage}</p>
                  }

                  {!uploadingNewConfirmationStatus && <>

                    {
                      userData.registration_status == "confirmation" &&
                      <>
                        <CardTitle>Confirmation</CardTitle>
                        <Button className="ml-auto" onClick={() => onConfirmationChange(true)}>Coming</Button>
                        <Button className="ml-auto" onClick={() => onConfirmationChange(false)}>Not Coming</Button>
                      </>
                    }
                    {
                      userData.registration_status == "coming" &&
                      <>
                        <CardTitle>You are confirmed to be coming to HackRU!</CardTitle>
                        <Button className="ml-auto" onClick={() => onConfirmationChange(false)}>Not Coming</Button>
                      </>
                    }
                    {
                      userData.registration_status == "not-coming" &&
                      <>
                        <CardTitle>You are not coming. Thanks for letting us know.</CardTitle>
                        <Button className="ml-auto" onClick={() => onConfirmationChange(true)}>Coming</Button>
                      </>
                    }
                  </>}
                </div>
              </>
            }
          </CardContent>
        </form>
      </Card>
    </div >

  );
}