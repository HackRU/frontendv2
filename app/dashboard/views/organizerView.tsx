'use client';

import React, { useState } from 'react';
import './organizerView.css';
import QrReaderWrapper from '../components/QRreader';
import CheckInScan from './checkInScan';
import EventScan from './eventScan';
import { AttendEventScan, GetUser, SetUser } from '@/app/lib/actions';
import PopupDialog from '../components/dialog';
import { set } from 'zod';

type STATUS =
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'PENDING'
  | 'AWAITING SCAN'
  | 'AWAITING RESPONSE';
type ScannerTab = 'CHECK IN' | 'EVENT';
const timeWhenAllHackersCanComeThrough = new Date(2024, 3, 23, 12, 0); // March 23rd, 2PM

const events = [
  'lunch-saturday',
  'wakefern-tech-talk',
  'wakefern-api-demo',
  'icims-tech-talk',
  'rusa-workshop',
  'usacs-resume-workshop',
  'cloudflare-tech-talk',
  'mlh-soroban-quest',
  'mlh-copilot',
  'meta-swe-tech-talk',
  'rucp-workshop',
  'dinner-saturday',
  'breakfast-sunday',
  'lunch-sunday',
  'chess-win',
  'found-douglass',
];

const eventPoints = {
  'lunch-saturday': 0,
  'wakefern-tech-talk': 20,
  'wakefern-api-demo': 20,
  'icims-tech-talk': 20,
  'rusa-workshop': 20,
  'usacs-resume-workshop': 10,
  'cloudflare-tech-talk': 20,
  'mlh-soroban-quest': 10,
  'mlh-copilot': 10,
  'meta-swe-tech-talk': 10,
  'rucp-workshop': 10,
  'dinner-saturday': 0,
  'breakfast-sunday': 0,
  'lunch-sunday': 0,
  'chess-win': 15,
  'found-douglass': 15,
};

function ScanStatus(props: {
  status: STATUS;
  scanType: ScannerTab;
  fullName: string;
}) {
  const { status, scanType, fullName } = props;

  return (
    <div className="w-full text-center">
      <p className="">
        Scan QR to {scanType === 'CHECK IN' ? 'check in' : 'scan for an event'}
      </p>
      <p className="">Status: </p>
      <p>{fullName && <p className="text-green-500">Scanned: {fullName}</p>}</p>
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
  const [scanResponse, setScanResponse] = useState<string>('');
  const [showForceAttendance, setShowForceAttendance] =
    useState<boolean>(false);
  const [latestScannedEmail, setLatestScannedEmail] = useState<string>('');
  const [houseOfScannedUser, setHouseOfScannedUser] = useState<string>('');
  const [scannedName, setScannedName] = useState<string>('');

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
    setHouseOfScannedUser('');
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
    setHouseOfScannedUser(userData.house);

    if (scannerTab === 'CHECK IN') {
      if (
        userData.registration_status === 'confirmed' ||
        userData.registration_status == 'checked-in' ||
        userData.registration_status == "coming" ||
        (now > timeWhenAllHackersCanComeThrough &&
          userData.registration_status !== 'unregistered')
      ) {
        const resp = await SetUser(
          { registration_status: 'checked-in' },
          result,
        );

        if (resp.error !== '') {
          setStatus('FAILED');
          setScanResponse(
            resp.error +
            ' : Registration Status: ' +
            userData.registration_status,
          );
          return;
        }

        setStatus('SUCCESSFUL');
      } else {
        setStatus('PENDING');
      }
    } else {
      if (selectedEvent == '') {
        alert('Please select an event first!');
      }

      const resp = await AttendEventScan(
        result,
        selectedEvent,
        eventPoints[selectedEvent as keyof typeof eventPoints],
        forceAttendance,
      );

      /**
       * Not sure why error code is 402?
       * I just know that it's the error code for multiple attendance.
       */
      const multipleAttendanceStatus = 402;

      if (resp.status == multipleAttendanceStatus && !forceAttendance) {
        setShowForceAttendance(true);
        return;
      }

      if (resp.error !== '') {
        setStatus('FAILED');
        setScanResponse(resp.error);
        return;
      }

      setScanResponse(resp.response + ' Attendance Count: ' + resp.count);
      setStatus('SUCCESSFUL');
    }
  };

  const handleEventSelectChange = async (event: string) => {
    setSelectedEvent(event);
  };

  return (
    <main>
      <div className="flex w-full items-center justify-center text-white">
        <div className="m-32 h-full w-full min-w-fit bg-slate-900">
          <div>
            <h1 className="text-center text-3xl">Organizer View</h1>
            {/* Two buttons, semi-radio where one button is for the "tab". If active, darken the button */}
            <div className="flex justify-center space-x-4">
              <button
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${scannerTab === 'CHECK IN' ? 'bg-blue-700' : ''
                  }`}
                onClick={() => {
                  setScannerTab('CHECK IN');
                  resetScanLog();
                }}
              >
                Check In
              </button>
              <button
                className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${scannerTab === 'EVENT' ? 'bg-blue-700' : ''
                  }`}
                onClick={() => {
                  setScannerTab('EVENT');
                  resetScanLog();
                }}
              >
                Event
              </button>
            </div>
          </div>
          {showForceAttendance && (
            <PopupDialog
              onYes={() => {
                handleOnScan(latestScannedEmail, true);
              }}
              onNo={() => {
                resetScanLog();
              }}
              setOpen={setShowForceAttendance}
              open={showForceAttendance}
              content={`This hacker has already attended this event.
                Are you sure you want to force another attendance count?`}
              title={'Multiple attendance detected for this event.'}
            />
          )}
          <div className="my-10 flex flex-col items-center">
            <ScanStatus
              status={status}
              scanType={scannerTab}
              fullName={scannedName}
            />
            {scannerTab === 'CHECK IN' ? (
              <CheckInScan status={status} />
            ) : (
              <EventScan
                selectedEvent={selectedEvent}
                events={events}
                onChange={handleEventSelectChange}
              />
            )}
            <p className="text-center">
              {scanResponse}
              {houseOfScannedUser && <p>House: {houseOfScannedUser}</p>}
            </p>
            <button
              className="mt-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={() => setOpenScanner(!openScanner)}
            >
              {openScanner ? 'Close Scanner' : 'Open Scanner'}
            </button>
          </div>

          {openScanner && <QrReaderWrapper onScan={handleOnScan} />}
        </div>
      </div>
    </main>
  );
}

export default OrganizerView;
