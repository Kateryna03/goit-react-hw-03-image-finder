import React, { Component, Fragment } from 'react';
//import shortid from 'shortid';
import './App.css';
import Searchbar from '../components/Searchbar';
import Modal from '../components/Modal';

class App extends Component {
  state = {
    showModal: false,
    request: '',
    page: 1,
    images: [],
  };

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
    const { showModal } = this.state;
    return (
      <Fragment>
        <div>
          <h1>HELLO WORLD</h1>
          <Searchbar onSubmit={this.handleFormSubmit} />
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
        </div>
      </Fragment>
    );
  }
}

export default App;
