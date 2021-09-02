import styles from './Button.module.css';

// window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'smooth',
// });

const Button = ({ OnClick }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={OnClick} type="button">
        Load More
      </button>
    </div>
  );
};
export default Button;
