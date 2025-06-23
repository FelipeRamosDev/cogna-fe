import { FileInput, Input } from '@/components/inputs';
import { useForm } from './FormControl';

/**
 * FormInput component for controlled form fields using FormProvider context.
 * Renders an Input component and syncs its value with the form state.
 *
 * @param {object} props
 * @param {string} [props.id] - Optional id for the input element.
 * @param {string} [props.fieldName] - Name of the field in the form state.
 * @param {string} [props.label] - Label for the input field.
 * @param {string} [props.accept] - Accept attribute for file inputs (e.g., 'image/*').
 * @param {boolean} [props.multiline=false] - If true, renders a textarea instead of an input.
 * @param {number} [props.minLines=5] - Minimum number of lines for the muultiline.
 * @param {'text' | 'number' | 'email' | 'password' | 'tel'} [props.type='text'] - Input type (text, number, email, password, tel, etc).
 * @returns {JSX.Element}
 */
export default function FormInput({ id, fieldName = '', label = '', type = 'text', accept, multiline, minLines, ...props }) {
   const { values, setFieldValue } = useForm();

   switch (type) {
      case 'file':
         return <FileInput
            id={id || `forminput-${fieldName}`}
            data-testid={id || `forminput-${fieldName}`}
            label={label}
            name={fieldName}
            accept={accept}
            fileValue={values[fieldName] || ''}
            onChange={(files) => setFieldValue(fieldName, files)}
            {...props}
         />;
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
            label={label}
            name={fieldName}
            value={values[fieldName] || ''}
            multiline={multiline}
            minLines={minLines}
            onChange={(value, ev) => setFieldValue(fieldName, value)}
            {...props}
         />;
   }
}
