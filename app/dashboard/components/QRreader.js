import { Scanner } from '@yudiel/react-qr-scanner';

const defaultConstraints = {
  facingMode: 'environment',
  width: { min: 640, ideal: 720, max: 1920 },
  height: { min: 640, ideal: 720, max: 1080 },
};

const styles = {
  container: {
    width: '100%',
    maxWidth: 400,
    margin: 'auto',
  },
};

function QrScannerWrapper(props) {
  const { onScan, qrScanEnabled } = props;

  return (
    <div style={styles.container}>
      <Scanner
        // allowMultiple={false}
        paused={!qrScanEnabled}
        constraints={defaultConstraints}
        retryDelay={1000}
        onScan={(results) => {
          const value = results[0]?.rawValue;
          if (value) onScan(value);
        }}
      />
    </div>
  );
}

export default QrScannerWrapper;
