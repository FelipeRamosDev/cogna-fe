import { parseCSS, parsePadding, parseRadius } from '@/utils/parse';

/**
 * FileInput component for uploading JSON files.
 * Renders a styled file input and label, and displays the selected file name.
 *
 * @param {object} props
 * @param {string} [props.className] - Additional CSS classes for the input container.
 * @param {string} [props.id] - ID for the input and label association.
 * @param {string} [props.name] - Name attribute for the input.
 * @param {File} [props.fileValue] - Currently selected file.
 * @param {string} [props.padding='m'] - Padding size for styling.
 * @param {string} [props.radius='m'] - Border radius for styling.
 * @param {Function} [props.onChange] - Callback when a file is selected.
 * @returns {JSX.Element}
 */
export default function FileInput({
   className,
   id,
   name,
   fileValue,
   accept,
   padding = 'm',
   radius = 'm',
   multiFiles = false,
   onChange = () => {},
   ...props
}) {
   const CSS = parseCSS(className, [
      parsePadding(padding),
      parseRadius(radius),
      'FileInput'
   ]);

   return (
      <div className={CSS}>
         <input
            type="file"
            accept={accept}
            id={id}
            name={name}
            multiple={multiFiles}
            onChange={(event) => onChange(multiFiles ? event.target.files : event.target.files[0], event)}
            {...props}
         />

         <label htmlFor={id} className="label">
            {fileValue ? (
               <span className="label-title">{fileValue.name}</span>
            ) : (
               <span className="label-title">Escolha um arquivo</span>
            )}

            <p className="label-description">Arraste ou clique para escolher seu arquivo JSON com os produtos para importação.</p>
         </label>
      </div>
   );
}
