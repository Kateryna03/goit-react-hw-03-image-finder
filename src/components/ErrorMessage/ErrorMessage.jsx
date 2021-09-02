import errorImage from '../ErrorMessage/232.jpg';

export default function ErrorMessage({ message }) {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="error" />
      <p>Error:{message}ОШИБКА</p>
    </div>
  );
}
