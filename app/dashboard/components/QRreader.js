import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

const defaultConstraints = {
  facingMode: 'environment',
  width: { min: 640, ideal: 720, max: 1920 },
  height: { min: 640, ideal: 720, max: 1080 },
};

const styles = {
  container: {
    width: 400,
    margin: 'auto',
  },
};

const args = {
  scanDelay: 100,
  tracker: true,
  hideCount: true,
  constraints: defaultConstraints,
  deviceId: '',
};

function QrScannerWrapper(props) {
  const { onScan } = props;

  return (
    <div style={styles.container}>
      <Scanner
        options={{
          delayBetweenScanSuccess: args.scanDelay,
        }}
        constraints={defaultConstraints}
        onResult={(result) => {
          onScan(result);
        }}
      />
    </div>
  );
}

export default QrScannerWrapper;
