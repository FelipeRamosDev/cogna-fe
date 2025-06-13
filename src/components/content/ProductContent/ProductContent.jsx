export default function ProductContent({ product }) {
   return (
      <div className="ProductContent">
         <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
   )
}
