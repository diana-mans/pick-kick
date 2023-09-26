import cls from './ButtonMenu.module.scss';
import pauseIcon from '../../assets/images/pause.svg';
import playIcon from '../../assets/images/play.svg';
import soundIcon from '../../assets/images/sound.svg';
import arrowIcon from '../../assets/images/strelka.svg';
import moneyIcon from '../../assets/images/money.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OnbPages, setOnboardingPage } from '../../redux/onbPageSlice';
import { setPause, togglePause, toggleSound } from '../../redux/gameSlice';
import { RootState } from '../../redux/store';
import buttonSound from '../../assets/sound/button.aac';

const ButtonMenu = () => {
  const dispatch = useDispatch();
  const { pause, count } = useSelector((state: RootState) => state.game);
  const clickSound = new Audio(buttonSound);
  return (
    <div className={cls.menuContainer}>
      <div className={cls.buttonContainer}>
        <Link to="/">
          <div
            className={cls.button}
            onClick={() => {
              dispatch(setOnboardingPage(OnbPages.FlAPPY));
              dispatch(setPause(false));
              clickSound.play();
            }}>
            <img alt="Come back" src={arrowIcon} className={cls.arrowIcon} />
          </div>
        </Link>
        <div
          className={cls.button}
          onClick={() => {
            dispatch(toggleSound());
            clickSound.play();
          }}>
          <img alt="Toggle sound" src={soundIcon} className={cls.soundIcon} />
        </div>
        <div
          className={cls.button}
          onClick={() => {
            dispatch(togglePause());
            clickSound.play();
          }}>
          {pause ? (
            <img alt="Play" src={playIcon} className={cls.playIcon} />
          ) : (
            <img alt="Pause" src={pauseIcon} className={cls.pauseIcon} />
          )}
        </div>
      </div>
      <div className={cls.counter}>
        <img alt="Money" src={moneyIcon} className={cls.moneyIcon} />
        <div>{count}</div>
      </div>
    </div>
  );
};

export default ButtonMenu;
