import { parseCSS } from "@/utils/parse";

/**
 * Spinner component for displaying a loading indicator.
 *
 * @param {object} props
 * @param {string} [props.size='3rem'] - the size o spinner represents the height and width of the spinner circle.
 * @param {string} [props.wrapperHeight='4rem'] - the height of the wrapper that contains the spinner.
 * @returns {JSX.Element}
 */
export default function Spinner({ className, wrapperHeight, size = '3rem' }) {
   const classNames = parseCSS(className, 'Spinner');

   return (
      <div className={classNames} style={{ height: wrapperHeight || size }}>
         <div className="spinner__circle" style={{ height: size, width: size }}></div>
      </div>
   );
}
