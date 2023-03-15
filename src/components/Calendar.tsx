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
import { selectEvent } from "../features/events/eventSlice";
import ModalCreateEvent from "./createEvent/ModalCreateEvent";
import ModalUpdateEvent from "./updateEvent/ModalUpdateEvent";

const Calendar = () => {
  const { isShowing, onToggle } = useModal();
  const calendarRef = useRef<any>();
  const [modeModal, setModeModal] = useState("CreateModal");
  const dispatch = useDispatch();
  const events = useAppSelector((state) => state.eventReducer.events);

  const renderEventContent = (eventContent: EventContentArg) => {
    return <div className="text-ellipsis overflow-hidden">{eventContent.event.title}</div>;
  };

  const handleEventClick = (clickInfo: any) => {
    setModeModal("UpdateModal");
    onToggle();
    dispatch(selectEvent(clickInfo.event.id))
  };

  const handleDateSelect = (selectInfo: any) => {
    setModeModal("CreateModal");
    onToggle();
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
          center:"title",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        eventClassNames={"bg-indigo-500 text-white hover:ring-1 hover:ring-indigo-500 border-0 px-2 py-1 my-7"}
        locales={allLocales}
        locale={"tr"}
        selectable={true}
        editable={true}
        events={events}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        select={handleDateSelect}
        dateClick={(e: DateClickArg) => {
          /* console.log(e); */
        }}
      />
      {(isShowing && modeModal === "CreateModal") && <ModalCreateEvent onToggle={onToggle}/>}
      {(isShowing && modeModal === "UpdateModal") && <ModalUpdateEvent onToggle={onToggle}/>}
    </div>
  );
};

export default Calendar;
