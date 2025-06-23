import { parseCSS } from '@/utils/parse';
import { createContext, useContext, useState } from 'react';
import { Button } from '..';
import { ErrorTile } from '@/components/tiles';

/**
 * React Context for form state management.
 * Provides values, errors, and field setters to child components.
 * @type {React.Context<{values: object, errors: object, setFieldValue: Function, setFieldError: Function, resetForm: Function}>}
 */
const FormContext = createContext();

/**
 * FormProvider component for managing form state and submission.
 * Wraps children in a form context and handles value/error updates and submit events.
 *
 * @param {object} props
 * @param {string} [props.className] - Additional CSS classes for the form.
 * @param {React.ReactNode} props.children - Form fields and content.
 * @param {boolean} [props.hideSubmit] - If true, hides the submit button. 
 * @param {string} [props.submitLabel='Enviar'] - Label for the submit button.
 * @param {object} [props.initialValues={}] - Initial values for form fields.
 * @param {Function} [props.onSubmit] - Callback for form submission.
 * @returns {JSX.Element}
 */
function FormProvider({
   className,
   children,
   hideSubmit,
   submitLabel = 'Enviar',
   initialValues = {},
   onSubmit = () => {},
   ...props
}) {
   const [ values, setValues ] = useState(initialValues);
   const [ errors, setErrors ] = useState({});
   const [ responseError, setResponseError ] = useState(null);
   const CSS = parseCSS(className, 'FormControl');

   const setFieldValue = function(field, value) {
      setValues((prev) => ({ ...prev, [field]: value }));
   };

   const setFieldError = (field, error) => {
      setErrors((prev) => ({ ...prev, [field]: error }));
   };

   const resetForm = () => {
      setValues(initialValues);
      setErrors({});
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const result = await onSubmit(values, errors, event);
      if (!result || typeof result !== 'object' || Array.isArray(result)) {
         console.error('[FormControl] The "onSubmit" must return an object with success or error properties');
         return;
      }

      if (result.error) {
         return setResponseError(result);
      }

      if (result.success) {
         resetForm();
         setResponseError(null);
         setFieldError({});
      }
   };

   return (
      <FormContext.Provider
         value={{
            values,
            errors,
            responseError,
            setFieldValue,
            setFieldError,
            setResponseError,
            resetForm,
         }}
      >
         <form className={CSS} onSubmit={handleSubmit} {...props}>
            <ErrorTile error={responseError} />
            {children}

            {!hideSubmit && <div className="form-actions">
               <Button type="submit" fullwidth>{submitLabel}</Button>
            </div>}
         </form>
      </FormContext.Provider>
   );
};

/**
 * Custom hook to access form context values and helpers.
 * Must be used within a FormProvider.
 *
 * @returns {{values: object, errors: object, setFieldValue: Function, setFieldError: Function, resetForm: Function}}
 */
const useForm = () => {
   const context = useContext(FormContext);
   if (!context) {
      throw new Error('useForm must be used within a FormProvider');
   }

   return context;
};

export { useForm };
export default FormProvider;
