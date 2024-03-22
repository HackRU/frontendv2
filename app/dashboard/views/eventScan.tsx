
export default function EventScan(props: {
  events: string[];
  selectedEvent: string;
  onChange: (event: string) => void;
}) {

  const { events, onChange, selectedEvent } = props;

  return (
    <div>
      <select
        value={selectedEvent}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="w-full text-black"
      >
        <option value="">Select an event</option>
        {
          events.map((event, index) => (
            <option key={index} value={event}>{event}</option>
          ))
        }
      </select>
    </div>
  )
}