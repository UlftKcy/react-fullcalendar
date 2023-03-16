import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  headerText: string;
  onToggle: () => void;
}

const Modal = ({ children, headerText, onToggle }: ModalProps) => {
  return createPortal(
    <div className="fixed w-full h-full flex place-items-center inset-0 bg-black bg-opacity-30 z-10 cursor-pointer p-2">
      <div className="relative w-2/6 min-w-fit m-auto bg-white text-black rounded-md">
        <div className="flex justify-between items-center border-b border-solid border-slate-200 py-2 px-3">
          <h4 className="text-lg font-semibold text-slate-500 tracking-wide">
            {headerText}
          </h4>
          <button onClick={onToggle} className="bg-transparent border-0 focus:outline-none">
            x
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("overlay") as HTMLDivElement
  );
};

export default Modal;
