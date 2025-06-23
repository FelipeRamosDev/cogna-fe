/**
 * Spinner component for displaying a loading indicator.
 *
 * @param {object} props
 * @param {string} [props.height='3rem'] - Minimum height for the spinner container.
 * @returns {JSX.Element}
 */
export default function Spinner({ height = '3rem' }) {
   return (
      <div className="Spinner" style={{ minHeight: height }}>
         <div className="spinner__circle"></div>
      </div>
   );
}
