// import { styles } from "./ImageGallery.module.css";
import GalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

function ImageGallery({ images }) {
  return (
    <ul className={styles.imageGallery}>
      {images.map(image => (
        <GalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags}
          largeImageUrl={image.largeImageUrl}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
