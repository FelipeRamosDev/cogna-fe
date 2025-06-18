import { parseCSS } from '@/helpers/parse';
import React, { forwardRef, useRef, useMemo } from 'react';

const Input = forwardRef(({
   type = 'text',
   id,
   name,
   label,
   placeholder,
   className = '',
   padding = 'm',
   inputProps = {},
   value,
   onChange,
   ...props
}, ref) => {
   const wrapperCSS = parseCSS(className, 'Input');

   return (
      <div className={wrapperCSS}>
         {label && <label htmlFor={id} className="input-label">{label}</label>}

         <input
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            className="native-input"
            onChange={onChange}
            {...props}
         />
      </div>
   );
});

export default Input;