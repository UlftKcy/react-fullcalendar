import React, { useEffect, useState } from "react";
import TextInput from "./Input/TextInput";
import Button from "./Button/Button";
import { useDispatch } from "react-redux";
import {
  addEvents,
  removeEvent,
  updateEvents,
} from "../features/events/eventSlice";
import { useAppSelector } from "../hooks/redux-helper";
import { nanoid } from "nanoid";

interface IFormProps {
  mode: string;
  onToggle: () => void;
}

const Form = (props: IFormProps) => {
  const { mode, onToggle } = props;
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isAllDay, setIsAllDay] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentEvent = useAppSelector(
    (state) => state.eventReducer.selectEvent
  );

  useEffect(() => {
    if (currentEvent && mode === "update") {
      setTitle(currentEvent.title ?? "");
      setStartDate(currentEvent.start ?? "");
      setEndDate(currentEvent.end ?? "");
      setIsAllDay(currentEvent.allDay ?? "");
    }
  }, []);

  const handleStartDate = (date: string) => {
    if (mode === "create") {
      return date;
    } else if (mode === "update") {
      return isAllDay ? `${date.split("T")[0]}` : date;
    }
  };
  const handleEndDate = (date: string) => {
    if (mode === "create") {
      return date;
    } else if (mode === "update") {
      return isAllDay ? `${date.split("T")[0]}` : date;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      let newEvent = {
        id: nanoid(),
        title: title,
        start: isAllDay ? `${startDate.split("T")[0]}T00:00:00` : startDate,
        end: isAllDay ? `${endDate.split("T")[0]}T23:59:00` : endDate,
        allDay: isAllDay,
      };
      dispatch(addEvents(newEvent));
    } else if (mode === "update") {
      let updateEvent = {
        ...currentEvent,
        title: title,
        start: isAllDay ? `${startDate.split("T")[0]}T00:00:00` : startDate,
        end: isAllDay ? `${endDate.split("T")[0]}T23:59:00` : endDate,
        allDay: isAllDay,
      };

      dispatch(updateEvents(updateEvent));
    }
    onToggle();
  };
  const handleRemoveEvent = () => {
    dispatch(removeEvent(currentEvent?.id));
    onToggle();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <TextInput
          className="pl-2"
          label="Title"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          className="pl-12"
          label="Start Date"
          type={isAllDay ? "date" : "datetime-local"}
          name="startDate"
          id="startDate"
          placeholder="Start Date"
          value={handleStartDate(startDate)}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextInput
          className="pl-12"
          label="End Date"
          type={isAllDay ? "date" : "datetime-local"}
          name="endDate"
          id="endDate"
          placeholder="End Date"
          value={handleEndDate(endDate)}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label htmlFor="allDay">
          <input
            className="w-4 h-4 mr-2 accent-indigo-600 border-indigo-300 rounded focus:ring-indigo-500 focus:ring-2"
            type="checkbox"
            name="allDay"
            id="allDay"
            checked={isAllDay}
            onChange={() => setIsAllDay(!isAllDay)}
          />
          All Day
        </label>
      </div>
      {mode === "create" ? (
        <div className="py-3 px-8 flex justify-end">
          <Button
            type="submit"
            className="px-3 py-1 bg-green-600 text-white font-normal hover:bg-green-500 border-0 focus:outline-none tracking-wide mr-2"
          >
            Save
          </Button>
        </div>
      ) : (
        <div className="py-3 px-8 flex justify-end">
          <Button
            type="submit"
            className="px-3 py-1 bg-orange-600 text-white font-normal hover:bg-orange-500 border-0 focus:outline-none tracking-wide mr-2"
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={handleRemoveEvent}
            className="px-3 py-1 bg-slate-600 text-white font-normal hover:bg-slate-500 border-0 focus:outline-none tracking-wide mr-2"
          >
            Delete
          </Button>
        </div>
      )}
    </form>
  );
};

export default Form;
