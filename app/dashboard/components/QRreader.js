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

function QrScannerWrapper() {
  const [stopDecoding, setStopDecoding] = useState(false);

  return (
    <div style={styles.container}>
      <button
        onClick={() => setStopDecoding((prev) => !prev)}
        style={{ marginBottom: 5 }}
      >
        {stopDecoding ? 'Start Decoding' : 'Stop Decoding'}
      </button>
      <Scanner
        constraints={defaultConstraints}
        onResult={(result) => {
          alert(result);
        }}
      />
    </div>
  );
}

export default QrScannerWrapper;
