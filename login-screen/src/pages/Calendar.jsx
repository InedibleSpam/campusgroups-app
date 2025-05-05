import React, { useState, useEffect } from "react";
import CreateEventButton from "../components/CreateEventButton";

// Function to generate a consistent color for each group based on its ID
const generateColor = (id) => {
  const hash = String(id).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = (hash * 137) % 360; // Multiply by a prime number for more variation
  const saturation = 50 + (hash % 50); // Saturation between 50% and 100%
  const lightness = 60 + (hash % 20); // Lightness between 60% and 80%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const Calendar = () => {
  // State variables to manage events, user-specific event IDs, current date, and view settings
  const [allEvents, setAllEvents] = useState([]);
  const [myEventIds, setMyEventIds] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("all"); // "all" or "my" events
  const [viewMode, setViewMode] = useState("month"); // "month" or "week" view
  const [selectedDay, setSelectedDay] = useState(null); // Selected day for detailed view
  const [groupColors, setGroupColors] = useState({}); // Dynamically generated colors for groups

  // Fetch events and groups from local storage when the component mounts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("allEvents") || "[]");
    const myIds = JSON.parse(localStorage.getItem("myEventIds") || "[]");
    setAllEvents(storedEvents);
    setMyEventIds(myIds);

    // Generate colors for groups using group IDs as keys
    const savedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    const colors = savedGroups.reduce((acc, group) => {
      acc[group.id] = generateColor(group.id); // Use group ID as key
      return acc;
    }, {});
    setGroupColors(colors);
  }, []);

  // Get the days to display in the current view (month or week)
  const getDaysInView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewMode === "month") {
      // Generate days for the entire month, including leading empty days for alignment
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0).getDate();
      const startWeekday = firstDayOfMonth.getDay();
      const leading = Array.from({ length: startWeekday }, () => null);
      const days = Array.from({ length: lastDay }, (_, i) => new Date(year, month, i + 1));
      return [...leading, ...days];
    }

    // Generate days for the current week
    const current = new Date(currentDate);
    const dayOfWeek = current.getDay();
    const weekStart = new Date(current.setDate(current.getDate() - dayOfWeek));
    return Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
  };

  // Handle navigation between months
  const handleMonthChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDay(null); // Reset selected day
  };

  // Handle navigation between weeks
  const handleWeekChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(newDate);
    setSelectedDay(null); // Reset selected day
  };

  // Format a date-time string into a readable time format
  const formatTime = (dateTimeStr) => {
    const dt = new Date(dateTimeStr);
    return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Normalize a date object to a string in "YYYY-MM-DD" format
  const normalizeDate = (date) => date.toISOString().split("T")[0];

  // Filter events based on the current view ("all" or "my")
  const displayedEvents = view === "my" ? allEvents.filter((ev) => myEventIds.includes(ev.id)) : allEvents;

  // Get the days to display in the current view
  const days = getDaysInView();

  return (
    <div className="calendar-container">
      {/* Header section for navigation and view toggles */}
      <div className="calendar-header">
        <div>
          {viewMode === "month" ? (
            <>
              <button onClick={() => handleMonthChange(-1)}>&lt;</button>
              <strong>
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </strong>
              <button onClick={() => handleMonthChange(1)}>&gt;</button>
            </>
          ) : (
            <>
              <button onClick={() => handleWeekChange(-1)}>&lt;</button>
              <strong>Week of {days[0]?.toLocaleDateString()}</strong>
              <button onClick={() => handleWeekChange(1)}>&gt;</button>
            </>
          )}
        </div>
        <div>
          <button onClick={() => setView(view === "all" ? "my" : "all")}>
            View: {view === "all" ? "All Events" : "My Events"}
          </button>
          <button onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}>
            Mode: {viewMode === "month" ? "Month" : "Week"}
          </button>
        </div>
      </div>

      {/* Legend for group colors */}
      <div className="calendar-legend">
        {Object.entries(groupColors).map(([groupId, color]) => {
          const group = JSON.parse(localStorage.getItem("groups") || "[]").find((g) => g.id === groupId);
          return (
            <div key={groupId} className="calendar-legend-item">
              <div style={{ backgroundColor: color }} />
              <span>{group?.name || "Unknown Group"}</span>
            </div>
          );
        })}
      </div>

      {/* Calendar grid displaying days and events */}
      <div className="calendar-grid">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} className="calendar-cell" />; // Empty cell for alignment
          const dayStr = normalizeDate(day);
          const dayEvents = displayedEvents
            .filter((ev) => normalizeDate(new Date(ev.dateTime)) === dayStr)
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

          return (
            <div key={idx} className="calendar-cell" onClick={() => setSelectedDay(dayStr)}>
              <strong>
                {day.toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}
              </strong>
              {dayEvents.slice(0, 2).map((ev) => (
                <div key={ev.id} className="calendar-event" style={{ backgroundColor: groupColors[ev.group] || "#ffffff" }}>
                  {formatTime(ev.dateTime)} - {ev.title}
                </div>
              ))}
              {dayEvents.length > 2 && <div className="calendar-event-more">+{dayEvents.length - 2} more...</div>}
            </div>
          );
        })}
      </div>

      {/* Detailed view for selected day */}
      {selectedDay && (
        <div className="selected-day-details">
          <h3>📅 Events on {new Date(selectedDay).toLocaleDateString()}</h3>
          {displayedEvents
            .filter((ev) => normalizeDate(new Date(ev.dateTime)) === selectedDay)
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            .map((ev) => (
              <div key={ev.id} className="event-detail" style={{ backgroundColor: groupColors[ev.group] || "#ffffff" }}>
                <strong>{formatTime(ev.dateTime)}</strong> — {ev.title}
                <div>{ev.description}</div>
              </div>
            ))}
          <div className="buttons">
            <CreateEventButton />
            <button className="close-button" onClick={() => setSelectedDay(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
