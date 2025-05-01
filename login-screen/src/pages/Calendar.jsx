import React, { useState, useEffect } from "react";
import CreateEventButton from "../components/CreateEventButton"; 

const groupColors = {
  group1: "#FFD700", // Gold
  group2: "#90EE90", // LightGreen
  group3: "#ADD8E6", // LightBlue
  default: "#ffffff", // White
};

const groupLabels = {
  group1: "Group 1",
  group2: "Group 2",
  group3: "Group 3",
};

const Calendar = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [myEventIds, setMyEventIds] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("all");
  const [viewMode, setViewMode] = useState("month");
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("allEvents") || "[]");
    const myIds = JSON.parse(localStorage.getItem("myEventIds") || "[]");
    setAllEvents(storedEvents);
    setMyEventIds(myIds);
  }, []);

  const getDaysInView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (viewMode === "month") {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0).getDate();
      const startWeekday = firstDayOfMonth.getDay(); // 0 = Sunday

      // Leading blanks (nulls)
      const leading = Array.from({ length: startWeekday }, () => null);

      // Days in month
      const days = Array.from({ length: lastDay }, (_, i) => new Date(year, month, i + 1));

      return [...leading, ...days];
    }

    // Week view logic remains unchanged
    const current = new Date(currentDate);
    const dayOfWeek = current.getDay(); // 0 = Sun
    const weekStart = new Date(current.setDate(current.getDate() - dayOfWeek));
    return Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
  };

  const handleMonthChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const handleWeekChange = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + offset * 7);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const formatTime = (dateTimeStr) => {
    const dt = new Date(dateTimeStr);
    return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const normalizeDate = (date) => {
    return date.toISOString().split("T")[0]; // Extracts the date in YYYY-MM-DD format
  };

  const displayedEvents = view === "my"
    ? allEvents.filter((ev) => myEventIds.includes(ev.id))
    : allEvents;

  const days = getDaysInView();

  return (
    <div style={{ padding: "20px" }}>
      {/* Header Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div>
          {viewMode === "month" ? (
            <>
              <button onClick={() => handleMonthChange(-1)}>&lt;</button>
              <strong style={{ margin: "0 12px" }}>
                {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
              </strong>
              <button onClick={() => handleMonthChange(1)}>&gt;</button>
            </>
          ) : (
            <>
              <button onClick={() => handleWeekChange(-1)}>&lt;</button>
              <strong style={{ margin: "0 12px" }}>
                Week of {days[0]?.toLocaleDateString()}
              </strong>
              <button onClick={() => handleWeekChange(1)}>&gt;</button>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setView(view === "all" ? "my" : "all")}>
            View: {view === "all" ? "All Events" : "My Events"}
          </button>
          <button onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}>
            Mode: {viewMode === "month" ? "Month" : "Week"}
          </button>
        </div>
      </div>

      {/* Group Color Legend */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        {Object.entries(groupLabels).map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: groupColors[key],
                border: "1px solid #ccc",
              }}
            />
            <span style={{ fontSize: "0.9em" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "12px",
          marginBottom: "24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
        className="calendar-grid"
      >
        {days.map((day, idx) => {
          if (!day) {
            return <div key={idx} style={{ minHeight: "100px" }} />; // Empty cell
          }

          const dayStr = normalizeDate(day); // Use normalized date
          const dayEvents = displayedEvents
            .filter((ev) => {
              const eventDate = new Date(ev.dateTime);
              return normalizeDate(eventDate) === dayStr; // Compare normalized dates
            })
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

          return (
            <div
              key={idx}
              onClick={() => setSelectedDay(dayStr)} // Set normalized date
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "6px",
                minHeight: "100px",
                backgroundColor: "#fefefe",
                cursor: "pointer",
              }}
            >
              <strong style={{ color: "#000" }}>
                {day.toLocaleDateString(undefined, { weekday: "short", day: "numeric" })}
              </strong>
              {dayEvents.slice(0, 2).map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    marginTop: "4px",
                    padding: "4px",
                    fontSize: "0.85em",
                    borderRadius: "4px",
                    backgroundColor: groupColors[ev.group] || groupColors.default,
                    color: "#000",
                  }}
                >
                  {formatTime(ev.dateTime)} - {ev.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div style={{ fontSize: "0.75em", color: "#888" }}>
                  +{dayEvents.length - 2} more...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="selected-day-details">
          <h3 style={{ color: "#000", textAlign: "center" }}>
            📅 Events on {new Date(selectedDay).toLocaleDateString()}
          </h3>
          {displayedEvents
            .filter((ev) => normalizeDate(new Date(ev.dateTime)) === selectedDay) // Compare normalized dates
            .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
            .map((ev) => (
              <div
                key={ev.id}
                style={{
                  marginBottom: "8px",
                  padding: "8px",
                  borderRadius: "6px",
                  backgroundColor: groupColors[ev.group] || groupColors.default,
                  border: "1px solid #ccc",
                  color: "#000",
                }}
              >
                <strong>{formatTime(ev.dateTime)}</strong> — {ev.title}
                <div style={{ fontSize: "0.9em", marginTop: "4px" }}>{ev.description}</div>
              </div>
            ))}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "12px" }}>
            <CreateEventButton
              style={{
                padding: "8px 16px",
                fontSize: "1em",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            <button
              onClick={() => setSelectedDay(null)}
              style={{
                padding: "8px 16px",
                fontSize: "1em",
                borderRadius: "4px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
