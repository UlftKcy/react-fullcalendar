import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
import { useRef } from "react";
import { EventContentArg } from "@fullcalendar/core";
import { useModal } from "../hooks/useModal";
import { useAppSelector } from "../hooks/redux-helper";
import { useDispatch } from "react-redux";
import { selectDay, selectEvent } from "../features/events/eventSlice";
import ModalCreateEvent from "./createEvent/ModalCreateEvent";
import ModalUpdateEvent from "./updateEvent/ModalUpdateEvent";

const Calendar = () => {
  const calendarRef = useRef<any>();
  const { isShowing, onToggle } = useModal();
  const dispatch = useDispatch();
  const events = useAppSelector((state) => state.eventReducer.events);

  const renderEventContent = (eventContent: EventContentArg) => {
    return <div className="text-ellipsis overflow-hidden">{eventContent.event.title}</div>;
  };

  const handleEventClick = (clickInfo: any) => {
    onToggle();
    dispatch(selectEvent(clickInfo.event.id))
  };

  const handleDateSelect = (selectInfo: any) => {
    onToggle();
    dispatch(selectDay(selectInfo.startStr));
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        selectable={true}
        editable={true}
        locales={allLocales}
        locale={"tr"}
        initialEvents={events}
        eventContent={renderEventContent}
        eventClassNames={"bg-green-600 border-0 pl-2 py-1 my-7"}
        buttonText={{
          prev: "Önceki",
          next: "Sonraki",
          today: "Bugün",
        }}
        eventClick={handleEventClick}
        select={handleDateSelect}
        dateClick={(e: DateClickArg) => {
          console.log(e);
        }}
      />
      {isShowing && <ModalCreateEvent onToggle={onToggle} calendarRef={calendarRef} />}
      {isShowing && <ModalUpdateEvent onToggle={onToggle} calendarRef={calendarRef} />}
    </div>
  );
};

export default Calendar;
