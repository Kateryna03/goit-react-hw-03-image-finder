import React, { Component } from 'react';
import Modal from '../Modal';
import styles from './ImageGalleryItem.module.css';

class GalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { id, src, alt, largeImageURL } = this.props;
    const { showModal } = this.state;
    return (
      <li key={id} className={styles.imageGalleryItem}>
        <img
          onClick={this.toggleModal}
          src={src}
          alt={alt}
          className={styles.imageGalleryItemImage}
        />
        {showModal && (
          <Modal onClose={this.toggleModal} src={largeImageURL} alt={alt} />
        )}
      </li>
    );
  }
}

export default GalleryItem;
