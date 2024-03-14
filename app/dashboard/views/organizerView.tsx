"use client"

import React from 'react'
import './organizerView.css';
import QrReaderWrapper from "../components/QRreader";

function OrganizerView(userData: any) {

  return (
    <main>
      <div className="flex w-full items-center justify-center text-white">
        <div className="w-full h-full m-32 min-w-fit bg-slate-900">
          <QrReaderWrapper />
        </div>
      </div>
    </main>
  );
}

export default OrganizerView;