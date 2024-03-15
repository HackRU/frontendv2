"use client"

import React, { useState } from 'react'
import './organizerView.css';
import QrReaderWrapper from "../components/QRreader";
import CheckInScan from './checkInScan';
import EventScan from './eventScan';

type STATUS = "SUCCESSFUL" | "FAILED" | "PENDING" | "AWAITING SCAN" | "AWAITING RESPONSE";
type ScannerTab = "CHECK IN" | "EVENT";

const events = [
  "Event1",
  "Event2",
  "Event3",
  "Event4",
  "Event5"
];

function ScanStatus(props: { status: STATUS }) {
  const { status } = props;

  return (
    <div className="w-full text-center">
      <p className="">Scan QR to check in</p>
      <p className="">Status: </p>
      <p className="">
        {
          status === "SUCCESSFUL" &&
          <p className="text-green-500">Successful.</p>
        }
        {
          status === "PENDING" &&
          <p className="text-orange-400">Come again later!</p>
        }
        {
          status === "FAILED" &&
          <p className="text-red-500">
            Failed. Internal server error.
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

function OrganizerView(userData: any) {

  const [status, setStatus] = useState<STATUS>("AWAITING SCAN");
  const [openScanner, setOpenScanner] = useState<boolean>(false);
  const [scannerTab, setScannerTab] = useState<ScannerTab>("CHECK IN");
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const handleOnScan = (result: string) => {
    if (scannerTab === "CHECK IN") {
      alert("Checking in: " + result);
    } else {
      alert("Scanned event: " + result + "Selected event: " + selectedEvent);
    }

    console.log(result);
    setStatus("AWAITING RESPONSE");
    setTimeout(() => {
      setStatus("SUCCESSFUL");
    }, 2000);
  };

  const handleEventSelectChange = (event: string) => {
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
                onClick={() => setScannerTab("CHECK IN")}
              >
                Check In
              </button>
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${scannerTab === "EVENT" ? "bg-blue-700" : ""
                  }`}
                onClick={() => setScannerTab("EVENT")}
              >
                Event
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center my-10">
            <ScanStatus status={status} />
            {
              scannerTab === "CHECK IN" ?
                <CheckInScan status={status} /> :
                <EventScan
                  selectedEvent={selectedEvent}
                  events={events}
                  onChange={handleEventSelectChange}
                />
            }
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