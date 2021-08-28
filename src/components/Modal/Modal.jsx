import React, { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    // console.log("didMount");
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log('Unmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  //закрытие модалки по ескейпу
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  //закрытие модалки по клику в бэкдроп
  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.overlay} onClick={this.handleBackDropClick}>
        <div className={styles.modal}>
          {this.props.children}
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
