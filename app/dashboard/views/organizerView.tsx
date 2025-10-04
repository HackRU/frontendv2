'use client';

import React, { useState, useEffect, use } from 'react';
import './organizerView.css';
import QrReaderWrapper from '../components/QRreader';
import CheckInScan from './checkInScan';
import EventScan from './eventScan';
import { AttendEventScan, GetUser, SetUser } from '@/app/lib/actions';
import { handleSignOut } from '@/app/lib/actions';
import { getSelf } from '@/app/lib/data';
import PopupDialog from '../components/dialog';
import { set } from 'zod';
import Page from '@/app/(pre-dashboard)/(landing)/page';

type STATUS =
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'PENDING'
  | 'AWAITING SCAN'
  | 'AWAITING RESPONSE';
type ScannerTab = 'CHECK IN' | 'EVENT' | 'MANUAL' | 'SPONSOR' | 'CLUE';
const timeWhenAllHackersCanComeThrough = new Date(2024, 2, 23, 12, 0); // March 23rd, 12PM

const eventPoints = {
  'SELECT AN EVENT': 0,
  'f-25 breakfast-sunday': 0,
  'f-25 lunch-sunday-real': 0,
  'rad-workshop': 15,
  'idea-workshop': 15,
  'wakefern-coffee-chat': 15,
  'wakefern-cafe': 15,
  'midnight-surprise': 15,
  'mlh-workshops': 15,
  'f-25 lunch-saturday': 0,
  'f-25 dinner-saturday': 0,
  'meal-placeholder': 0,
  'Cipher': 20,
  'Card Game': 10,
  'Gear game 20': 20,
  'Gear game 15': 15,
  'Switch game': 10,
  'Ring toss - middle': 15, 
  'Ring toss - side10': 10, 
  'Ring toss - side5': 5, 
  'Cup stacking - 10': 10,
  'Cup stacking - 20': 20,
  'Workshop': 15,
  'shop - Lego flowers' : -15,
  'shop - LotFancy Deck of Cards': -30,
  'shop - Mochi squish toys':  -15,
  'shop - Vaseline cocoa glow lotion':  -40,
  'shop - Magnifying glass key chains': -30,
  'shop - Laptop Adjustable Stand': -80,
  'shop - Squishmallow Octopus': -110,
  'shop - Fall Squishmallows': -65,
  'shop - steampunk plush': -40,
  'shop - google waterbottle': -120,
};

function ScanStatus(props: {
  status: STATUS;
  scanType: ScannerTab;
  fullName: string;
  scannedEmail: string;
}) {
  const { status, scanType, fullName, scannedEmail } = props;

  return (
    <div className="w-full text-center">
      <p className="">
        Scan QR to{' '}
        {scanType === 'CHECK IN'
          ? 'check in'
          : scanType === 'CLUE'
            ? 'scan for a clue'
            : 'scan for an event'}
      </p>
      <p className="">Status: </p>
      <p>{fullName && <p className="text-white">Found User: {fullName}</p>}</p>
      <p>{fullName && <p className="text-white">Email: {scannedEmail}</p>}</p>
      <p className="">
        {status === 'SUCCESSFUL' && (
          <p className="text-green-500">Successful.</p>
        )}
        {status === 'PENDING' && (
          <p className="text-orange-400">
            Come again later at {timeWhenAllHackersCanComeThrough.toString()}
          </p>
        )}
        {status === 'FAILED' && (
          <p className="text-red-500">Failed. An error occurred.</p>
        )}
        {status === 'AWAITING SCAN' && (
          <p className="text-blue-500">Awaiting Scan</p>
        )}
        {status === 'AWAITING RESPONSE' && (
          <p className="text-blue-500">Loading data...</p>
        )}
      </p>
    </div>
  );
}

function OrganizerView() {
  const [status, setStatus] = useState<STATUS>('AWAITING SCAN');
  const [openScanner, setOpenScanner] = useState<boolean>(false);
  const [scannerTab, setScannerTab] = useState<ScannerTab>('CHECK IN');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [selectedABList, setSelectedABList] = useState<boolean>(true);
  const [scanResponse, setScanResponse] = useState<string>('');
  const [showForceAttendance, setShowForceAttendance] =
    useState<boolean>(false);
  const [latestScannedEmail, setLatestScannedEmail] = useState<string>('');
  const [scannedName, setScannedName] = useState<string>('');
  const [selectedClue, setSelectedClue] = useState<string>('');
  const [clueWin, setClueWin] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [manualEmail, setManualEmail] = useState<string>('');
  const [manualPoints, setManualPoints] = useState<number>(0);
  const [pointOperation, setPointOperation] = useState<'add' | 'subtract'>(
    'add',
  );
  const [isSponsor, setIsSponsor] = useState<boolean>(false);

  const clues = ['', 'Cipher', 'Nemo', 'Gear Game', 'Cup stacking', 'Ring Toss']

  const resetScanLog = () => {
    setScannedName('');
    setLatestScannedEmail('');
    setScanResponse('');
    setStatus('AWAITING SCAN');
  };

  const handleOnScan = async (
    result: string,
    forceAttendance: boolean = false,
  ) => {
    setScanResponse('');
    setScannedName('');
    setStatus('AWAITING RESPONSE');
    setLatestScannedEmail(result);

    const resp = await GetUser(result);
    if (typeof resp.response === 'string') {
      if (resp.response.includes('error')) {
        setStatus('FAILED');
        return;
      }
    }
    const userData = resp.response as unknown as Record<any, any>;
    const now = new Date();
    setScannedName(userData.first_name + ' ' + userData.last_name);

    if (scannerTab === 'CHECK IN') {
      const resp = await SetUser({ registration_status: 'checked_in' }, result);

      if (!resp) {
        setStatus('FAILED');
        setScanResponse('Failed to check in user.');
      }

      if (resp.error !== '') {
        setStatus('FAILED');
        setScanResponse(resp.response + '; ' + resp.error);
        return;
      }

      setScanResponse(resp.response);
      setStatus('SUCCESSFUL');
    } else if (scannerTab === 'EVENT') {
      if (selectedEvent == '') {
        alert('Please select an event first!');
      }

      const resp = await AttendEventScan(
        result,
        selectedEvent,
        eventPoints[selectedEvent as keyof typeof eventPoints],
        forceAttendance,
        1,
      );

      /**
       * Not sure why error code is 402?
       * I just know that it's the error code for multiple attendance.
       */
      const multipleAttendanceStatus = 409;

      if (resp.status == multipleAttendanceStatus && !forceAttendance) {
        setShowForceAttendance(true);
        return;
      }

      if (resp.error !== '') {
        setStatus('FAILED');
        setScanResponse(resp.error + '; ' + resp.response);
        return;
      }

      setScanResponse(resp.response + ' Attendance Count: ' + resp.count);
      setStatus('SUCCESSFUL');
    } else if (scannerTab === 'CLUE') {

      const updatedStage = selectedClue;
      let updatedCount = (userData?.clue_count || 0);
      //const updatedStage = (userData?.stage || 0) + 1;
      const clue1Done = userData?.clue1 || updatedStage == 'Cipher'
      const clue2Done = userData?.clue2 || updatedStage == 'Nemo'
      const clue3Done = userData?.clue3 || updatedStage == 'Gear Game'
      const clue4Done = userData?.clue4 || updatedStage == 'Cup stacking'
      const clue5Done = userData?.clue5 || updatedStage == 'Ring Toss'

      if (updatedStage != "") {
        updatedCount = updatedCount + 1;
      }

      const resp = await SetUser(
        {
          clue_count: updatedCount,
          stage: updatedStage,
          clue1 : clue1Done,
          clue2 : clue2Done,
          clue3 : clue3Done,
          clue4 : clue4Done,
          clue5 : clue5Done,

        },
        userData.email,
      );

      if ( clueWin ){
      const resp2 = await AttendEventScan(
        userData.email,
        updatedStage,
        10,
        true,
        1,
      );
      }



      if (!resp.error) {
        setScanResponse(
          `Clue count updated! New count: ${updatedCount}, Stage: ${updatedStage}, 
${clues[1]}: ${clue1Done}, 
${clues[2]}: ${clue2Done}, 
${clues[3]}: ${clue3Done},
${clues[4]}: ${clue4Done},
${clues[5]}: ${clue5Done}`,
        );
        setStatus('SUCCESSFUL');
      } else {
        setScanResponse(resp.response || 'Error updating clue count');
        setStatus('FAILED');
      }
    } else if (scannerTab === 'SPONSOR') {
      const eventName = selectedABList ? 'SponsorA' : 'SponsorB';

      const resp = await AttendEventScan(
        result,
        eventName,
        0,
        forceAttendance,
        1,
        true,
      );

      /**
       * Not sure why error code is 402?
       * I just know that it's the error code for multiple attendance.
       */
      const multipleAttendanceStatus = 409;

      if (resp.status == multipleAttendanceStatus && !forceAttendance) {
        console.log('HI');
        setShowForceAttendance(true);
        return;
      }

      if (resp.error !== '') {
        setStatus('FAILED');
        setScanResponse(resp.error + '; ' + resp.response);
        return;
      }

      setScanResponse(resp.response + ' Attendance Count: ' + resp.count);
      setStatus('SUCCESSFUL');
    } else {
      const operationToApply = pointOperation === 'add' ? 1 : -1;

      const resp = await AttendEventScan(
        result,
        'Manual',
        manualPoints * operationToApply,
        true,
        999,
      );

      /**
       * Not sure why error code is 402?
       * I just know that it's the error code for multiple attendance.
       */
      const multipleAttendanceStatus = 409;

      if (resp.status == multipleAttendanceStatus && !forceAttendance) {
        setShowForceAttendance(true);
        return;
      }

      if (resp.error !== '') {
        setStatus('FAILED');
        setScanResponse(resp.error + '; ' + resp.response);
        return;
      }

      setScanResponse(resp.response + ' Attendance Count: ' + resp.count);
      setStatus('SUCCESSFUL');
    }
  };

  const handleEventSelectChange = async (event: string) => {
    setSelectedEvent(event);
  };

  const handleManualScan = async () => {
    if (manualEmail.trim() === '') {
      setStatus('FAILED');
      return;
    }
    await handleOnScan(manualEmail);
    setManualEmail('');
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getSelf();

        const domain = data.response.email.slice(-11);
        setIsSponsor(domain == 'sponsor.com');
        if (domain == 'sponsor.com') {
          setScannerTab('SPONSOR');
          resetScanLog();
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <main>
      <div className="flex w-full items-center justify-center text-white">
        <div className="m-32 h-full w-full min-w-fit bg-slate-900">
          <div>
            <h1 className="text-center text-3xl">Organizer View</h1>

            {/* Two buttons, semi-radio where one button is for the "tab". If active, darken the button */}
            <div className="grid justify-center space-x-4 md:grid-cols-6">
              <button
                disabled={isSponsor}
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                  scannerTab === 'CHECK IN' ? 'bg-blue-700' : ''
                } ${isSponsor ? 'bg-blue-500 hover:bg-blue-500' : ''}`}
                onClick={() => {
                  setScannerTab('CHECK IN');
                  resetScanLog();
                }}
              >
                Check In
              </button>
              <button
                disabled={isSponsor}
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                  scannerTab === 'EVENT' ? 'bg-blue-700' : ''
                }${isSponsor ? 'bg-blue-500 hover:bg-blue-500' : ''}`}
                onClick={() => {
                  setScannerTab('EVENT');
                  resetScanLog();
                }}
              >
                Event
              </button>
              <button
                disabled={isSponsor}
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                  scannerTab === 'MANUAL' ? 'bg-blue-700' : ''
                }${isSponsor ? 'bg-blue-500 hover:bg-blue-500' : ''}`}
                onClick={() => {
                  setScannerTab('MANUAL');
                  resetScanLog();
                }}
              >
                Manual
              </button>
              <button
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                  scannerTab === 'SPONSOR' ? 'bg-blue-700' : ''
                }`}
                onClick={() => {
                  setScannerTab('SPONSOR');
                  resetScanLog();
                }}
              >
                Sponsor
              </button>
              <button
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                  scannerTab === 'CLUE' ? 'bg-blue-700' : ''
                }`}
                onClick={() => {
                  setScannerTab('CLUE');
                  resetScanLog();
                }}
              >
                Clue
              </button>
              <button
                className="mt-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                onClick={async () => {
                  await handleSignOut();
                  window.location.href = '/';
                }}
              >
                Logout
              </button>
            </div>
          </div>
          {showForceAttendance && (
            <PopupDialog
              onYes={() => {
                handleOnScan(latestScannedEmail, true);
              }}
              onNo={() => {
                // resetScanLog();
              }}
              setOpen={setShowForceAttendance}
              open={showForceAttendance}
              content={`Either this student has reached event attendance limit or the student is not checked in.
                Do you want to force attendance? (If they are not checked in, scan in will fail.)`}
              title={`An error occurred.`}
            />
          )}
          {confirmation && (
            <PopupDialog
              onYes={() => {
                setConfirmation(false);
                handleOnScan(latestScannedEmail, false);
              }}
              onNo={() => {
                setConfirmation(false);
              }}
              setOpen={setConfirmation}
              open={confirmation}
              content={`Continue the scan?`}
              title={'You have just scanned someone.'}
            />
          )}
          <div className="my-10 flex flex-col items-center">
            <ScanStatus
              status={status}
              scanType={scannerTab}
              fullName={scannedName}
              scannedEmail={latestScannedEmail}
            />
            {scannerTab === 'CLUE' ? (<div>
              <select
                value={selectedClue}
                onChange={(e) => {setSelectedClue(e.target.value);}}
                className="w-full text-black"
              >
        {clues.map((event, index) => (
          <option key={index} value={event}>
            {event}
          </option>
        ))}
        </select>
                  <button
                    className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                      !clueWin ? 'bg-blue-700' : ''
                    }`}
                    onClick={() => {
                      setClueWin(false);
                      resetScanLog();
                    }}
                  >
                  No points
                </button>
                <button
                  className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                    clueWin ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => {
                    setClueWin(true);
                    resetScanLog();
                  }}
                >
                  points
                </button>
                </div>
      ) : 
            scannerTab ===
            'CHECK IN' ? (
              <CheckInScan status={status} />
            ) : scannerTab === 'EVENT' ? (
              <EventScan
                selectedEvent={selectedEvent}
                events={Object.keys(eventPoints).sort()}
                onChange={handleEventSelectChange}
              />
            ) : scannerTab === 'SPONSOR' ? (
              <div>
                <button
                  className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                    selectedABList ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => {
                    setSelectedABList(true);
                    resetScanLog();
                  }}
                >
                  A
                </button>
                <button
                  className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${
                    !selectedABList ? 'bg-blue-700' : ''
                  }`}
                  onClick={() => {
                    setSelectedABList(false);
                    resetScanLog();
                  }}
                >
                  B
                </button>
              </div>
            ) : scannerTab === 'MANUAL' ? (
              <div className="mt-4">
                Manual Points:
                <input
                  type="number"
                  value={manualPoints}
                  onChange={(e) => setManualPoints(Number(e.target.value))}
                  placeholder="Enter points"
                  className="mr-2 rounded border p-2 text-black"
                />
                <div className="mt-2 flex justify-center">
                  <button
                    className={`mr-2 rounded px-4 py-2 font-bold text-white ${
                      pointOperation === 'add' ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                    onClick={() => setPointOperation('add')}
                  >
                    +
                  </button>
                  <button
                    className={`rounded px-4 py-2 font-bold text-white ${
                      pointOperation === 'subtract'
                        ? 'bg-red-500'
                        : 'bg-gray-500'
                    }`}
                    onClick={() => setPointOperation('subtract')}
                  >
                    -
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4"></div>
            )}
            <pre className="text-center">{scanResponse}</pre>
            <button
              className="mt-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={() => setOpenScanner(!openScanner)}
            >
              {openScanner ? 'Close Scanner' : 'Open Scanner'}
            </button>

            <div className="mt-4">
              <input
                type="email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                placeholder="Enter email manually (If QR Code fails)"
                className="mr-2 rounded border p-2 text-black"
              />
              <button
                onClick={handleManualScan}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Manual Scan
              </button>
            </div>
          </div>

          {openScanner && (
            <QrReaderWrapper
              qrScanEnabled={!confirmation}
              onScan={(text: string) => {
                setConfirmation(true);
                setLatestScannedEmail(text);
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default OrganizerView;
