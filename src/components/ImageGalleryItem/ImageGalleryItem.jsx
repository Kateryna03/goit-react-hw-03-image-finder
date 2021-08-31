import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';

class GalleryItem extends Component {
  state = {};

  render() {
    const { id, src, alt } = this.props;
    return (
      <li key={id} className={styles.imageGalleryItem}>
        <img src={src} alt={alt} className={styles.imageGalleryItemImage} />
      </li>
    );
  }
}

export default GalleryItem;
