import React, { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className: string,
    label: string,
}

const TextInput = ({ className, label, ...props }: TextInputProps) => {
    return (
        <div className='mb-3'>
            <label htmlFor={label} className="text-sm text-slate-500">{label}</label>
            <input {...props} className={className}/>
        </div>
    )
}

export default TextInput
