import { useState } from "react";



export default function EventScan(props: {
  events: string[];
  onChange: (event: string) => void;
}) {

  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const { events, onChange } = props;

  return (
    <div>
      <select
        value={selectedEvent}
        onChange={(e) => {
          setSelectedEvent(e.target.value)
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