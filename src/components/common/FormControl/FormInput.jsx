import { Input } from '@/components/inputs';
import { useForm } from './FormControl';

/**
 * FormInput component for controlled form fields using FormProvider context.
 * Renders an Input component and syncs its value with the form state.
 *
 * @param {object} props
 * @param {string} [props.id] - Optional id for the input element.
 * @param {string} [props.fieldName] - Name of the field in the form state.
 * @param {'text' | 'number' | 'email' | 'password' | 'tel'} [props.type='text'] - Input type (text, number, email, password, tel, etc).
 * @returns {JSX.Element}
 */
export default function FormInput({ id, fieldName = '', type = 'text', ...props }) {
   const { values, setFieldValue } = useForm();

   switch (type) {
      case 'text':
      case 'number':
      case 'email':
      case 'password':
      case 'tel':
      default:
         return <Input
            id={id || `forminput-${fieldName}`}
            data-testid={id || `forminput-${fieldName}`}
            type={type}
            name={fieldName}
            value={values[fieldName] || ''}
            onChange={(e) => setFieldValue(fieldName, e.target.value)}
            {...props}
         />;
   }
}
