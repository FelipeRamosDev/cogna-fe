import { parseCSS, parsePadding, parseRadius } from '@/helpers/parse';

export default function FileInput({
   className,
   id,
   name,
   fileValue,
   padding = 'm',
   radius = 'm',
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
            accept="application/json"
            id={id}
            name={name}
            onChange={(event) => onChange(event.target.files[0], event)}
            {...props}
         />

         <label htmlFor={id} className="label">
            {!fileValue && <span className="label-title">Escolha um arquivo</span>}
            {fileValue && <span className="label-title">{fileValue ? fileValue.name : 'Nenhum arquivo selecionado'}</span>}

            <p className="label-description">Arraste ou clique para escolher seu arquivo JSON com os produtos para importação.</p>
         </label>
      </div>
   );
}
