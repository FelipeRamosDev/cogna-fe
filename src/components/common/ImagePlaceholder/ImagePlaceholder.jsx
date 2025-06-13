import Image from 'next/image';
import ImagePlaceholderFile from '@/resources/images/image_placeholder.svg';

/**
 * Renders a placeholder image component using Next.js Image optimization.
 *
 * Displays a full-sized image that covers its container and is centered,
 * typically used as a fallback or default image in the UI.
 *
 * @component
 * @returns {JSX.Element} A div containing a responsive placeholder image.
 */
export default function ImagePlaceholder() {
   return (
      <div className="ImagePlaceholder">
         <Image
            fill
            priority
            src={ImagePlaceholderFile}
            alt="Image Placeholder"
            style={{
               objectFit: 'cover',
               objectPosition: 'center',
            }}
         />
      </div>
   );
}

