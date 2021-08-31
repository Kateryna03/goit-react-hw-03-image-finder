//https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12
// id - уникальный идентификатор
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение для модального окна
import axios from 'axios';
// https://pixabay.com/api/?key=22365966-aff4cd8f16c1939d45ba5b542&q=image_type=photo&orientation=horizontal&per_page=12
const API_KEY = 'key=22365966-aff4cd8f16c1939d45ba5b542';
const URL_REQUEST = 'https://pixabay.com/api/?';
const DEFAULT_REQUEST_PARAM =
  '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = (searchName = '', searchPage = '1') => {
  return axios.get(
    URL_REQUEST +
      `q=${searchName}&page=${searchPage}&` +
      API_KEY +
      DEFAULT_REQUEST_PARAM,
  );
};
