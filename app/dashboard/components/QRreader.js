import { Scanner } from '@yudiel/react-qr-scanner';
import { useRef } from 'react';

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
  scanDelay: 1500,
  tracker: true,
  hideCount: true,
  constraints: defaultConstraints,
  deviceId: '',
};

function QrScannerWrapper(props) {
  const { onScan, qrScanEnabled } = props;

  return (
    <div style={styles.container}>
      <Scanner
        // allowMultiple={false}
        paused={!qrScanEnabled}
        options={{
          delayBetweenScanAttempts: 1000,
        }}
        onScan={(result) => {
          onScan(result[0].rawValue);
        }}
      />
    </div>
  );
}

export default QrScannerWrapper;
