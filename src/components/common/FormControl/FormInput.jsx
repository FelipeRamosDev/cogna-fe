import { Input } from '@/components/inputs';
import { useForm } from './FormControl';

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
            id={`forminput-${fieldName}` || id}
            type={type}
            name={fieldName}
            value={values[fieldName] || ''}
            onChange={(e) => setFieldValue(fieldName, e.target.value)}
            {...props}
         />;
   }
}
