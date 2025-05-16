import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

const calendarControls = createCalendarControlsPlugin();

const NO_WEEKENDS_NDAYS = 5;
const WEEKENDS_NDAYS = 7;

export function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [createViewWeek()],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-12-16",
        end: "2023-12-16",
      },
    ],
    plugins: [eventsService, calendarControls],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  const isAppRendered = !!calendarControls.$app;

  const isWeekendsShowing =
    isAppRendered && calendarControls.getWeekOptions().nDays === WEEKENDS_NDAYS;

  const [_, _set] = useState(0);
  const forceUpdate = () => _set((v) => (v === 0 ? 1 : 0));

  const handleChangeWeekends = (checked: boolean) => {
    calendarControls.setWeekOptions({
      nDays: checked ? WEEKENDS_NDAYS : NO_WEEKENDS_NDAYS,
    });
    // forceUpdate();
  };

  return (
    <div>
      <label style={{ display: "flex", alignItems: "center" }}>
        <span>Show weekened</span>
        <input
          type="checkbox"
          checked={isWeekendsShowing}
          onChange={(e) => handleChangeWeekends(e.target.checked)}
        />
      </label>

      <ScheduleXCalendar
        calendarApp={calendar}
        customComponents={{
          headerContentLeftAppend: ({ $app }) => {
            return $app.datePickerState.selectedDate.value;
          },
        }}
      />
    </div>
  );
}
