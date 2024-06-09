import React, { forwardRef, useEffect, useRef } from "react";


export default forwardRef(function Select({  type='select',name ='', value= '', onChange = '', options = '', className='', placeholder = '', required = false, isFocused= false, ...props }, ref) {
    const select = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    })

    return (
    
        <select
          name={name}
          className={'border-gray-400 focus:border-amber-400 focus:ring-amber-300 rounded-lg shadow-sm bg-gray-50' + className}
          required={required}
          value={value}
          onChange={onChange}
          style={{ 
            WebkitAppearance: 'none', 
            MozAppearance: 'none', 
            appearance: 'none' 
          }} 
          ref={select}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});