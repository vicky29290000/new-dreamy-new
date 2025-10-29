import React, { useState } from "react";

type Role = "super-admin" | "admin" | "architect" | "structural-team" | "customer";

interface EventItem {
  name: string;
  date: string;
}

const Calendar: React.FC<{ role: Role }> = ({ role }) => {
  const [title, setTitle] = useState("Calendar");
  const [events, setEvents] = useState<EventItem[]>([
    { name: "Event 1", date: "2025-10-30" },
    { name: "Event 2", date: "2025-11-05" },
  ]);

  const canEdit = ["super-admin", "admin", "architect"].includes(role);

  const handleAddEvent = () => {
    setEvents([...events, { name: "New Event", date: "2025-10-28" }]);
  };

  const handleChangeEvent = (index: number, key: keyof EventItem, value: string) => {
    const updated = [...events];
    updated[index][key] = value;
    setEvents(updated);
  };

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      {canEdit ? (
        <input
          className="text-2xl font-bold mb-4 border-b w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
      )}

      {canEdit && (
        <button
          onClick={handleAddEvent}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Event
        </button>
      )}

      <div className="border rounded-lg p-4 space-y-3">
        {events.map((event, index) => (
          <div key={index} className="flex justify-between items-center">
            {canEdit ? (
              <div className="flex-1 space-y-1">
                <input
                  className="w-full font-semibold border-b"
                  value={event.name}
                  onChange={(e) => handleChangeEvent(index, "name", e.target.value)}
                />
                <input
                  className="w-full text-sm border-b"
                  type="date"
                  value={event.date}
                  onChange={(e) => handleChangeEvent(index, "date", e.target.value)}
                />
              </div>
            ) : (
              <div>
                <p className="font-semibold">{event.name}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            )}

            {canEdit && (
              <button
                onClick={() => handleDeleteEvent(index)}
                className="ml-4 text-red-500 hover:text-red-700 font-bold"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
