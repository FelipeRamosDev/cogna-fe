import Image from 'next/image';
import ImagePlaceholderFile from '@/resources/images/image_placeholder.svg';

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

