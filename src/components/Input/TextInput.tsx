import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className:string
    label: string
    placeholder:string
}

const TextInput = ({ className,label,placeholder, ...props }: TextInputProps) => {
    return (
        <div className='mb-3'>
            <label htmlFor={label} className="text-sm text-slate-500">{label}</label>
            <input {...props} className={["ring-1 ring-gray-300 w-full focus:ring-sky-500 focus:outline-none pr-2 py-1 my-2 rounded-md",className].join(' ')} placeholder={placeholder}/>
        </div>
    )
}

export default TextInput
