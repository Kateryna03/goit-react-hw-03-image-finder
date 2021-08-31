import React, { Component, Fragment } from 'react';
//import shortid from 'shortid';
import './App.css';
import * as Api from '../services/api';
import Searchbar from '../components/Searchbar';
import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

class App extends Component {
  state = {
    showModal: false,
    request: '',
    page: 1,
    images: [],
    isLoading: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prev = prevState.request;
    const next = this.state.request;

    if (prev !== next) {
      this.setState({ status: 'pending' });
      const { request, page } = this.state;
      Api.fetchImages(request, page)
        .then(({ data }) =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = newRequest => {
    this.setState({ request: newRequest, page: 1, images: [] });
  };

  render() {
    // console.log("App render");
    const { showModal, error, status } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme={'colored'}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }

    if (status === 'pending') {
      return <div>Loading...</div>;
    }
    if (status === 'rejected') {
      return <ErrorMessage message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <Fragment>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme={'colored'}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ImageGallery images={this.state.images} />
          {/* <ContactsForm onSubmit={this.handleSubmit} /> */}
          <button type="button" onClick={this.toggleModal}>
            open/close
          </button>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <button type="button" onClick={this.toggleModal}>
                open/close
              </button>
            </Modal>
          )}
        </Fragment>
      );
    }
  }
}

export default App;
