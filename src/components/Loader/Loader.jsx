// Компонент спинера, отображется пока идет загрузка изобаржений. Используй любой готовый компонент, например react-loader-spinner или любой другой.
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';
const LoaderComp = () => {
  return (
    <div className={styles.wrapperLoader}>
      <Loader
        type="BallTriangle"
        color="rgb(155, 236, 34)"
        height={100}
        width={100}
        timeout={5000}
      />
    </div>
  );
};
export default LoaderComp;
