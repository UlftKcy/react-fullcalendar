import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import { useState } from "react";
import { EventContentArg } from "@fullcalendar/core";
import { useModal } from "../hooks/useModal";
import Modal from "./Modal";
import { useAppSelector } from "../hooks/redux-helper";

const Calendar = () => {
  const { isShowing, onToggle } = useModal();
  const events = useAppSelector((state)=>state.eventReducer.events);

  console.log(events)

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <div>
        <b>{eventContent.timeText}</b>
        <b>{eventContent.event.title}</b>
      </div>
    );
  };
  return (
    <div>
      <div>
        <button onClick={onToggle}>Add Event</button>
        {isShowing && <Modal onToggle={onToggle} />}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth, timeGridWeek, timeGridDay",
        }}
        selectable={true}
        editable={true}
        locales={allLocales}
        locale={"tr"}
        eventContent={renderEventContent}
        buttonText={{
          day: "Gün",
          prev: "Önceki Ay",
          next: "Sonraki Ay",
          today: "Bugün",
          month: "Ay",
          nextYear: "Sonraki Yıl",
          prevYear: "Önceki Yıl",
          week: "Haftasonu",
        }}
        initialEvents={events}
      />
    </div>
  );
};

export default Calendar;
