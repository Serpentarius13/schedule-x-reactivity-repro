import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import dayjs from "dayjs";

import "@schedule-x/theme-default/dist/index.css";
import { memo, useEffect, useMemo, useState } from "react";

const components = {
  headerContentLeftAppend: ({ $app }) => {
    return $app.datePickerState.selectedDate.value;
  },
};

const WITH_OUTER_COMPONENTS = false;

export function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendarsService = useState(() => createCalendarControlsPlugin())[0];

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
    plugins: [eventsService, calendarsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, []);

  const [_, upd] = useState(0);
  const forceUpdate = () => upd((prev) => (prev === 0 ? 1 : 0));

  const handleSetDateValue = (value: string) => {
    calendarsService.setDate(dayjs(value).format("YYYY-MM-DD"));
    forceUpdate();
  };

  const memoizedComponents = useMemo(() => {
    return {
      headerContentLeftAppend: ({ $app }) => {
        return $app.datePickerState.selectedDate.value;
      },
    };
  }, [_]);

  return (
    <div>
      <input
        style={{ marginBottom: "300px" }}
        type="date"
        onChange={(e) => handleSetDateValue(e.target.value)}
      ></input>

      <ScheduleXCalendar calendarApp={calendar} customComponents={components} />
    </div>
  );
}
