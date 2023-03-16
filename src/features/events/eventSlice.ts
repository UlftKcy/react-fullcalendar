import { createSlice } from "@reduxjs/toolkit";

interface EventDataTypes {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

const defaultEvents: EventDataTypes[] = [
  {
    id: "1",
    title: "Event-1",
    start: "2023-03-09T00:00:00",
    end: "2023-03-09T23:59:00",
    allDay: true,
  },
  {
    id: "2",
    title: "Event-2",
    start: "2023-03-10T00:00:00",
    end: "2023-03-10T23:59:00",
    allDay: true,
  },
  {
    id: "3",
    title: "Event-3",
    start: "2023-03-11T00:00:00",
    end: "2023-03-11T23:59:00",
    allDay: true,
  },
  {
    id: "4",
    title: "Event-4",
    start: "2023-03-12T00:00:00",
    end: "2023-03-12T23:59:00",
    allDay: true,
  },
];

type InitialStateTypes = {
  events: EventDataTypes[];
  selectEvent: EventDataTypes | undefined;
};

const initialState: InitialStateTypes = {
  events: defaultEvents,
  selectEvent: undefined,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvents: (state, action) => {
      const newEvent = action.payload;
      state.events = [...state.events, newEvent];
    },
    updateEvents: (state, action) => {
      const newEvent = action.payload;
      const newEventIndex = state.events.findIndex(
        (event) => event.id === newEvent.id
      );
      if (newEventIndex >= 0) {
        state.events[newEventIndex] = newEvent;
      }
    },
    selectEvent: (state, action) => {
      const id = action.payload;
      const selectedEvent = state.events.find((event) => event.id === id);
      state.selectEvent = selectedEvent;
    },
    removeEvent: (state, action) => {
      const id = action.payload;
      state.events = state.events.filter((event) => event.id !== id);
    },
    dropEvent: (state, action) => {
      const { id, startDate, endDate } = action.payload;
      const selectedEventIndex: any = state.events.findIndex((event) => event.id === id);
      if (selectedEventIndex >= 0) {
        state.events[selectedEventIndex] = { ...state.events[selectedEventIndex], start: startDate, end: endDate };
      }
    }
  },
});

export const { addEvents, updateEvents, selectEvent, removeEvent, dropEvent } =
  eventSlice.actions;
export default eventSlice.reducer;
