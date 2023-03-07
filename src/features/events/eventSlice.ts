import { createSlice } from "@reduxjs/toolkit";

interface EventDataTypes {
    id: string,
    title: string,
    start: string,
    end: string,
}

const defaultEvents: EventDataTypes[] = [
    { id: "1", title: "Event-1", start: new Date("08 March 2023 14:48 UTC").toISOString().split("T")[0], end: new Date("09 March 2023 14:48 UTC").toISOString().split("T")[0] },
    { id: "2", title: "Event-2", start: new Date("09 March 2023 14:48 UTC").toISOString().split("T")[0], end: new Date("10 March 2023 14:48 UTC").toISOString().split("T")[0] },
    { id: "3", title: "Event-3", start: new Date("10 March 2023 14:48 UTC").toISOString().split("T")[0], end: new Date("11 March 2023 14:48 UTC").toISOString().split("T")[0] },
    { id: "4", title: "Event-4", start: new Date("11 March 2023 14:48 UTC").toISOString().split("T")[0], end: new Date("12 March 2023 14:48 UTC").toISOString().split("T")[0] },
];

type InitialStateTypes = {
    events: EventDataTypes[]
}

const initialState: InitialStateTypes = {
    events: defaultEvents,
}
const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvents: (state, action) => {
            const event = action.payload;
            state.events = [...state.events, event]
        }
    }

})

export default eventSlice.reducer;