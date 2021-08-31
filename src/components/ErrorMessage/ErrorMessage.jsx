import errorImage from './232.jpg';

export default function ErrorMessage({ message }) {
  return (
    <div role="alert">
      <img src={errorImage} width="240" alt="error" />
      <p>
        Something went wrong...
        <span>Error:{message}</span>
      </p>
    </div>
  );
}
