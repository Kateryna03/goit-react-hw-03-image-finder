import React, { Component } from 'react';
// import { toast } from 'react-tostify';
import styles from './Searchbar.module.css';

// Компонент принимает один проп onSubmit - функцию для передачи значения инпута при сабмите формы. Создает DOM-элемент следующей структуры.
class Searchbar extends Component {
  state = {
    request: '',
  };

  handleChangeInput = e => {
    this.setState({ request: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.request.trim() === '') {
      return alert('введите поиск');
      // return toast.error('введите параметры поиска');
    }
    this.props.onSubmit(this.state.request);
    this.setState({ request: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
