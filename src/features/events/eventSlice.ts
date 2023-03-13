import { createSlice } from "@reduxjs/toolkit";

interface EventDataTypes {
  id: string;
  title: string;
  start: string;
  end: string;
}

const defaultEvents: EventDataTypes[] = [
  { id: "1", title: "Event-1", start: "2023-03-09", end: "2023-03-10" },
  { id: "2", title: "Event-2", start: "2023-03-10", end: "2023-03-11" },
  { id: "3", title: "Event-3", start: "2023-03-11", end: "2023-03-12" },
  { id: "4", title: "Event-4", start: "2023-03-12", end: "2023-03-13" },
];

type InitialStateTypes = {
  events: EventDataTypes[];
  selectDay: string;
  selectEvent: EventDataTypes | undefined;
};

const initialState: InitialStateTypes = {
  events: defaultEvents,
  selectDay: "",
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
    selectDay: (state, action) => {
      state.selectDay = action.payload;
    },
    selectEvent: (state, action) => {
      const id = action.payload;
      const selectedEvent = state.events.find((event) => event.id === id);
      state.selectEvent = selectedEvent;
    },
  },
});

export const { addEvents, updateEvents, selectDay, selectEvent } =
  eventSlice.actions;
export default eventSlice.reducer;
