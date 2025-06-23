import { parseCSS } from '@/utils/parse';
import React, { forwardRef } from 'react';

/**
 * Input component for rendering a styled input field with optional label.
 * Supports forwarding refs and accepts standard input props.
 *
 * @param {object} props
 * @param {string} [props.type='text'] - Input type (text, number, email, etc).
 * @param {string} [props.id] - ID for the input and label association.
 * @param {string} [props.name] - Name attribute for the input.
 * @param {string} [props.label] - Optional label for the input.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.className] - Additional CSS classes for the wrapper.
 * @param {string} [props.padding='m'] - Padding size for styling.
 * @param {any} [props.value] - Value of the input.
 * @param {Function} [props.onChange] - Change handler for the input.
 * @param {React.Ref} ref - Ref forwarded to the input element.
 * @returns {JSX.Element}
 */
const Input = forwardRef(({
   type = 'text',
   id,
   name,
   label,
   placeholder,
   className = '',
   padding = 'm',
   defaultValue,
   value,
   multiline,
   minLines = 5,
   onChange,
   ...props
}, ref) => {
   const wrapperCSS = parseCSS(className, 'Input');
   const lineHeigth = 1.2;
   const paddingSizes = 2.5;
   const remLineHeigth = (minLines * lineHeigth) + paddingSizes + 'rem';

   const parseOnChange = (event) => {
      let newValue = event.target.value;

      if (type === 'number') {
         newValue = Number(event.target.value);
      }

      if (onChange) {
         onChange(newValue, event);
      }
   };

   return (
      <div className={wrapperCSS}>
         {label && <label htmlFor={id} className="input-label">{label}</label>}

         {!multiline && <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className="native-input"
            defaultValue={defaultValue}
            value={value}
            onChange={parseOnChange}
            {...props}
         />}

         {multiline && <textarea
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            className="native-textarea"
            style={{ minHeight: remLineHeigth }}
            defaultValue={defaultValue}
            value={value}
            onChange={parseOnChange}
         >
         </textarea>}
      </div>
   );
});

export default Input;