import cls from './ButtonMenu.module.scss';
import pauseIcon from '../../assets/images/pause.svg';
import playIcon from '../../assets/images/play.svg';
import soundIcon from '../../assets/images/sound.svg';
import soundOffIcon from '../../assets/images/soundOff.svg';
import arrowIcon from '../../assets/images/strelka.svg';
import moneyIcon from '../../assets/images/money.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OnbPages, setOnboardingPage } from '../../redux/onbPageSlice';
import { resetCount, setPause, togglePause, toggleSound } from '../../redux/gameSlice';
import { RootState } from '../../redux/store';
import buttonSound from '../../assets/sound/button.aac';
import { useEffect, useState } from 'react';

const ButtonMenu = () => {
  const dispatch = useDispatch();
  const [isCoarse, setIsCoarse] = useState(false);
  const { pause, count, isSound, isVisiblePopup } = useSelector((state: RootState) => state.game);
  const clickSound = new Audio(buttonSound);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsCoarse(true);
    }
  }, []);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.add('active');
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.classList.remove('active');
  };

  return (
    <div className={cls.menuContainer}>
      <div className={cls.buttonContainer}>
        <Link to="/" className={isVisiblePopup ? cls.disabledLink : cls.link}>
          <div
            className={`${cls.button} ${isCoarse ? '' : cls.hoverable}`}
            onTouchStart={isCoarse ? handleTouchStart : undefined}
            onTouchEnd={isCoarse ? handleTouchEnd : undefined}
            onClick={() => {
              if (!isVisiblePopup) {
                dispatch(setOnboardingPage(OnbPages.FlAPPY));
                dispatch(setPause(false));
                dispatch(resetCount());
                clickSound.play();
              }
            }}>
            <img alt="Come back" src={arrowIcon} className={cls.arrowIcon} />
          </div>
        </Link>
        <div
          className={`${cls.button} ${isCoarse ? '' : cls.hoverable} ${
            isVisiblePopup && cls.disabledButton
          }`}
          onTouchStart={isCoarse ? handleTouchStart : undefined}
          onTouchEnd={isCoarse ? handleTouchEnd : undefined}
          onClick={() => {
            if (!isVisiblePopup) {
              dispatch(toggleSound());
              clickSound.play();
            }
          }}>
          <img
            alt="Toggle sound"
            src={isSound ? soundIcon : soundOffIcon}
            className={cls.soundIcon}
          />
        </div>
        <div
          className={`${cls.button} ${isCoarse ? '' : cls.hoverable} ${
            isVisiblePopup && cls.disabledButton
          }`}
          onTouchStart={isCoarse ? handleTouchStart : undefined}
          onTouchEnd={isCoarse ? handleTouchEnd : undefined}
          onClick={() => {
            if (!isVisiblePopup) {
              dispatch(togglePause());
              clickSound.play();
            }
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
