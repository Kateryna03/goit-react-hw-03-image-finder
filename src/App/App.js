import React, { Component, Fragment } from 'react';
//import shortid from 'shortid';
//import './App.css';
import * as Api from '../services/Api';
import Searchbar from '../components/Searchbar';
//import Modal from '../components/Modal';
import ImageGallery from '../components/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Button from '../components/Button/Button';
import LoaderComp from '../components/Loader/Loader';

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
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prev = prevState.request;
    const next = this.state.request;

    if (this.state.page >= 2) {
      //console.log(this.state.page);
      this.scrollOnLoadButton();
    }

    if (prev !== next) {
      this.pageRender();
    }
  }

  //плавная прокрутка изображений
  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  pageRender = () => {
    const { request, page } = this.state;
    this.setState({ status: Status.PENDING });
    Api.fetchImages(request, page)
      .then(({ data }) => {
        if (data.hits.length === 0) {
          console.log({ data });
          this.setState({ status: Status.IDLE });
          toast.error('No result were found for your search');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: prevState.page + 1,
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

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
          <ToastContainer />
        </div>
      );
    }

    if (status === Status.PENDING) {
      return <LoaderComp></LoaderComp>;
    }

    if (status === Status.REJECTED) {
      console.log(error);
      return <ErrorMessage message={error} />;
    }

    if (status === Status.RESOLVED) {
      return (
        <Fragment>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
          <ImageGallery images={this.state.images} />
          <Button OnClick={this.pageRender}></Button>
        </Fragment>
      );
    }
  }
}

export default App;
