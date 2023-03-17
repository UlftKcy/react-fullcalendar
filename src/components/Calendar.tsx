import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { useRef, useState } from "react";
import { EventContentArg } from "@fullcalendar/core";
import { useModal } from "../hooks/useModal";
import { useAppSelector } from "../hooks/redux-helper";
import { useDispatch } from "react-redux";
import { dropEvent, selectEvent } from "../features/events/eventSlice";
import ModalCreateEvent from "./createEvent/ModalCreateEvent";
import ModalUpdateEvent from "./updateEvent/ModalUpdateEvent";

const Calendar = () => {
  const { isShowing, onToggle } = useModal();
  const calendarRef = useRef<any>();
  const [mode, setMode] = useState("create");
  const dispatch = useDispatch();
  const events = useAppSelector((state) => state.eventReducer.events);

  const renderEventContent = (eventContent: EventContentArg) => {
    return <div className="text-ellipsis overflow-hidden">{eventContent.event.title}</div>;
  };

  const handleEventClick = (clickInfo: any) => {
    setMode("update");
    onToggle();
    dispatch(selectEvent(clickInfo.event.id))
  };

  const handleDateSelect = (selectInfo: any) => {
    setMode("create");
    onToggle();
  };

  const handleEventDrop = (selectedEvent: any) => {
    const { id, startStr, endStr, allDay } = selectedEvent.event;
    let startDate = "";
    let endDate = "";
    if (allDay === true) {
      startDate = startStr;
      endDate = startStr;
    } else {
      startDate = [startStr.split("T")[0], startStr.split("T")[1].slice(0, 8)].join('T');
      endDate = [endStr.split("T")[0], endStr.split("T")[1].slice(0, 8)].join('T');
    }
    dispatch(dropEvent({ "id": id, "startDate": startDate, "endDate": endDate }))
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        buttonText={{
          prev: "Önceki",
          next: "Sonraki",
          today: "Bugün",
        }}
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        eventClassNames={"bg-indigo-500 text-white hover:ring-1 hover:ring-indigo-500 border-0 px-1 py-0.5 mb-7"}
        locales={allLocales}
        locale={"tr"}
        selectable={true}
        editable={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        select={handleDateSelect}
        dateClick={(e: DateClickArg) => {
          /* console.log(e); */
        }}
      />
      {(isShowing && mode === "create") && <ModalCreateEvent onToggle={onToggle} mode="create"/>}
      {(isShowing && mode === "update") && <ModalUpdateEvent onToggle={onToggle} mode="update" />}
    </div>
  );
};

export default Calendar;
