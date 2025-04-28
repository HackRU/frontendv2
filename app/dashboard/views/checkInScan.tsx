export default function CheckInScan(props: {
  status:
    | 'SUCCESSFUL'
    | 'PENDING'
    | 'FAILED'
    | 'AWAITING SCAN'
    | 'AWAITING RESPONSE';
}) {
  const { status } = props;

  return <div className="w-full text-center"></div>;
}
