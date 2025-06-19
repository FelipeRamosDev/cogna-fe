export default function Spinner({ height = '3rem' }) {
   return (
      <div className="Spinner" style={{ minHeight: height }}>
         <div className="spinner__circle"></div>
      </div>
   );
}
