import React, { Component, Fragment } from 'react';
//import shortid from 'shortid';
import './App.css';
import * as Api from '../services/api';
import Searchbar from '../components/Searchbar';
//import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    //showModal: false,
    request: '',
    page: 1,
    images: [],
    isLoading: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prev = prevState.request;
    const next = this.state.request;

    if (prev !== next) {
      this.setState({ status: Status.PENDING });
      const { request, page } = this.state;
      Api.fetchImages(request, page)
        .then(({ data }) =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            page: prevState.page + 1,
            status: Status.RESOLVED,
          })),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  //Переношу в Гэллери айтем
  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  handleFormSubmit = newRequest => {
    this.setState({ request: newRequest, page: 1, images: [] });
  };

  render() {
    // console.log("App render");
    const { error, status } = this.state;

    if (status === Status.IDLE) {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
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

    if (status === Status.PENDING) {
      return <div>Loading...</div>;
    }
    if (status === Status.REJECTED) {
      return <ErrorMessage message={error.message} />;
    }
    if (status === Status.RESOLVED) {
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
          {/* <button type="button" onClick={this.toggleModal}>
            open/close
          </button> */}
        </Fragment>
      );
    }
  }
}

export default App;
