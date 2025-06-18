import { parseCSS } from '@/helpers/parse';
import { createContext, useContext, useState, useCallback } from 'react';
import { Button } from '..';

const FormContext = createContext();

const FormProvider = ({ className, children, submitLabel = 'Enviar', initialValues = {}, onSubmit = () => {}, ...props }) => {
   const [ values, setValues ] = useState(initialValues);
   const [ errors, setErrors ] = useState({});
   const CSS = parseCSS(className, 'FormControl');

   const setFieldValue = (field, value) => {
      setValues((prev) => ({ ...prev, [field]: value }));
   };

   const setFieldError = (field, error) => {
      setErrors((prev) => ({ ...prev, [field]: error }));
   };

   const resetForm = () => {
      setValues(initialValues);
      setErrors({});
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      onSubmit(values, errors, event);
   };

   return (
      <FormContext.Provider
         className={CSS}
         value={{
            values,
            errors,
            setFieldValue,
            setFieldError,
            resetForm,
         }}
      >
         <form onSubmit={handleSubmit} {...props}>
            {children}

            <div className="form-actions">
               <Button type="submit" fullwidth>{submitLabel}</Button>
            </div>
         </form>
      </FormContext.Provider>
   );
};

const useForm = () => {
   const context = useContext(FormContext);
   if (!context) {
      throw new Error('useForm must be used within a FormProvider');
   }

   return context;
};

export { useForm };
export default FormProvider;
