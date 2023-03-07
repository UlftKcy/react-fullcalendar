import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../hooks/useModal";
import Button from "./Button/Button";
import TextInput from "./Input/TextInput";

const Modal = ({ onToggle }: { onToggle: any }) => {
  return createPortal(
    <div className="fixed w-full h-full flex place-items-center inset-0 bg-black bg-opacity-30 z-10 cursor-pointer px-5">
      <div className="relative max-w-3xl m-auto bg-white text-black rounded-xl">
        <div className="flex justify-between items-center border-b border-solid border-slate-200 py-2 px-3">
          <h4 className="text-lg font-semibold text-slate-500 tracking-wide">
            New Event
          </h4>
          <button
            onClick={onToggle}
            className="bg-transparent hover:bg-slate-100 border-0 focus:outline-none"
          >
            x
          </button>
        </div>
        <div className="py-4 px-8">
          <form>
            <TextInput
              className="ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none px-2 py-2 mt-2 rounded-md"
              label="Event Title"
              type="text"
              name="title"
              id="title"
            />
            <TextInput
              className="ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none px-2 py-2 mt-2 rounded-md"
              label="Start Date"
              type="date"
              name="startDate"
              id="startDate"
            />
            <TextInput
              className="ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none px-2 py-2 mt-2 rounded-md"
              label="End Date"
              type="date"
              name="endDate"
              id="endDate"
            />
          </form>
        </div>
        <div className="py-3 px-8 flex justify-end">
          <Button
            type="submit"
            className="px-3 py-1 bg-sky-500 text-white font-normal hover:bg-sky-600 border-0 focus:outline-none tracking-wide mr-2"
          >
            Save
          </Button>
          <Button className="px-3 py-1 bg-slate-400 text-white font-normal hover:bg-slate-500 border-0 focus:outline-none tracking-wide mr-2">
            Delete
          </Button>
          <Button className="px-3 py-1 bg-slate-400 text-white font-normal hover:bg-slate-500 border-0 focus:outline-none tracking-wide">
            Cancel
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById("overlay") as HTMLDivElement
  );
};

export default Modal;
