"use client"

import React, { useState } from 'react'
import './organizerView.css';
import QrReaderWrapper from "../components/QRreader";
import CheckInScan from './checkInScan';
import EventScan from './eventScan';
import { AttendEventScan, GetUser } from '@/app/lib/actions';

type STATUS = "SUCCESSFUL" | "FAILED" | "PENDING" | "AWAITING SCAN" | "AWAITING RESPONSE";
type ScannerTab = "CHECK IN" | "EVENT";
const timeWhenAllHackersCanComeThrough = new Date(2024, 3, 23, 12, 0); // March 23rd, 2PM

const events = [
  "Event1",
  "Event2",
  "Event3",
  "Event4",
  "Event5"
];

const eventPoints = {
  "Event1": 0,
  "Event2": 2,
  "Event3": 3,
  "Event4": 4,
  "Event5": 5
};

function ScanStatus(props: { status: STATUS, scanType: ScannerTab }) {
  const { status, scanType } = props;

  return (
    <div className="w-full text-center">
      <p className="">Scan QR to {
        scanType === "CHECK IN" ? "check in" : "scan for an event"
      }</p>
      <p className="">Status: </p>
      <p className="">
        {
          status === "SUCCESSFUL" &&
          <p className="text-green-500">Successful.</p>
        }
        {
          status === "PENDING" &&
          <p className="text-orange-400">Come again later at {timeWhenAllHackersCanComeThrough.toString()}</p>
        }
        {
          status === "FAILED" &&
          <p className="text-red-500">
            Failed. An error occurred.
          </p>
        }
        {
          status === "AWAITING SCAN" &&
          <p className="text-blue-500">Awaiting Scan</p>
        }
        {
          status === "AWAITING RESPONSE" &&
          <p className="text-blue-500">Loading data...</p>
        }
      </p>
    </div>
  );
}

function OrganizerView() {
  const [status, setStatus] = useState<STATUS>("AWAITING SCAN");
  const [openScanner, setOpenScanner] = useState<boolean>(false);
  const [scannerTab, setScannerTab] = useState<ScannerTab>("CHECK IN");
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [scanResponse, setScanResponse] = useState<string>("");
  const [showAgainDialog, setShowAgainDialog] = useState<boolean>(true);

  const handleOnScan = async (result: string) => {
    setStatus("AWAITING RESPONSE");
    if (scannerTab === "CHECK IN") {
      const resp = await GetUser(result);
      if (typeof resp.response === 'string') {
        if (resp.response.includes('error')) {
          setStatus("FAILED");
          return;
        }
      }

      const userData = resp.response as unknown as Record<any, any>;
      const now = new Date();
      if (userData.registration_status === "confirmed" || now > timeWhenAllHackersCanComeThrough) {
        setStatus("SUCCESSFUL");
        setScanResponse(`Welcome ${userData.first_name} ${userData.last_name}!`);
      } else {
        setStatus("PENDING");
      }
    } else {
      if (selectedEvent == "") {
        alert("Please select an event first!");
      }

      //check if selectedEvent is in eventPoints object
      if (!Object.keys(eventPoints).includes(selectedEvent)) {
        setStatus("FAILED");
        setScanResponse("Event not found in eventPoints object.");
        return;
      }

      const resp = await AttendEventScan(
        result,
        selectedEvent,
        eventPoints[selectedEvent as keyof typeof eventPoints]
      );

      if (resp.error !== '') {
        setStatus("FAILED");
        setScanResponse(resp.error);
        return;
      }

      setScanResponse(resp.response);
      setStatus("SUCCESSFUL");
    }
  };

  const handleEventSelectChange = async (event: string) => {
    setSelectedEvent(event);
  }

  return (
    <main>
      <div className="flex w-full items-center justify-center text-white">
        <div className="w-full h-full m-32 min-w-fit bg-slate-900">
          <div>
            <h1 className="text-3xl text-center">Organizer View</h1>
            {/* Two buttons, semi-radio where one button is for the "tab". If active, darken the button */}
            <div className="flex justify-center space-x-4">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${scannerTab === "CHECK IN" ? "bg-blue-700" : ""
                  }`}
                onClick={() => {
                  setScannerTab("CHECK IN");
                  setSelectedEvent("");
                }}
              >
                Check In
              </button>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${scannerTab === "EVENT" ? "bg-blue-700" : ""
                  }`}
                onClick={() => {
                  setScannerTab("EVENT");
                  setSelectedEvent("");
                }}
              >
                Event
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center my-10">
            <ScanStatus status={status} scanType={scannerTab} />
            {
              scannerTab === "CHECK IN" ?
                <CheckInScan status={status} /> :
                <EventScan
                  selectedEvent={selectedEvent}
                  events={events}
                  onChange={handleEventSelectChange}
                />
            }
            <p className="text-center">
              {scanResponse}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10"
              onClick={() => setOpenScanner(!openScanner)}
            >
              {openScanner ? "Close Scanner" : "Open Scanner"}
            </button>

          </div>

          {openScanner &&
            (
              <QrReaderWrapper
                onScan={handleOnScan}
              />
            )
          }
        </div>
      </div>
    </main>
  );
}

export default OrganizerView;