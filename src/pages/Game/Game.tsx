import cls from './Game.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../shared/redux/store';
import { Penis } from '../../shared/redux/chooseSlice';
import ClassicPenis from '../../shared/assets/images/penis-classic.svg';
import RibbedPenis from '../../shared/assets/images/penis-ribbed.svg';
import EyePenis from '../../shared/assets/images/penis-eye.svg';
import BlackPenis from '../../shared/assets/images/penis-black.svg';
import Lottie from 'lottie-react';
import ClickAnimation from '../../shared/assets/images/click-anim.json';
import LegAnimation from '../../shared/assets/images/leg-anim.json';
import ButtonMenu from '../../shared/ui/ButtonMenu/ButtonMenu';
import Obstacles from '../../shared/ui/Obstacles/Obstacles';
import { setIsVisiblePopup, togglePause } from '../../shared/redux/gameSlice';
import flappySound from '../../shared/assets/sound/flappy.aac';

type PenisStyleType = {
  bottom: string;
  left: string;
  transform: string;
};

let setNewPosition: NodeJS.Timer;

const Game = () => {
  const [leftContainer, setLeftContainer] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  const [bottomPenis, setBottomPenis] = useState(282);
  const [leftPenis, setLeftPenis] = useState(84);
  const [penisStyle, setPenisStyle] = useState<PenisStyleType>();
  const dispatch = useDispatch();
  const soundFlappy = new Audio(flappySound);

  const { pause, count } = useSelector((state: RootState) => state.game);
  const choosePenis = useSelector((state: RootState) => state.choose.choosePenis);

  const getPenisImage = (choosePenis: string) => {
    if (choosePenis === Penis.BLACK) {
      return BlackPenis;
    } else if (choosePenis === Penis.RIBBED) {
      return RibbedPenis;
    } else if (choosePenis === Penis.EYE) {
      return EyePenis;
    } else {
      return ClassicPenis;
    }
  };

  const onClickContainer = () => {
    if (!firstClick) {
      if (!pause) {
        soundFlappy.play();
        setBottomPenis((act) => act + 120);
      }
    }
    if (firstClick) {
      soundFlappy.play();
      setTimeout(() => {
        setLeftPenis((act) => act + 100);
        setBottomPenis((act) => act + 400);
      }, 100);
      setNewPosition = setInterval(() => {
        setLeftContainer((act) => act - 10);
        setBottomPenis((act) => act - 15);
      }, 50);
    }
    setFirstClick(false);
  };
  useEffect(() => {
    if (!firstClick) {
      setPenisStyle({
        bottom: `${bottomPenis}px`,
        left: `${leftPenis}px`,
        transform: `rotate(45deg)`,
      });
    } else {
      setPenisStyle({
        bottom: `${bottomPenis}px`,
        left: `${leftPenis}px`,
        transform: `rotate(0deg)`,
      });
    }
  }, [bottomPenis, leftPenis]);
  useEffect(() => {
    pause && clearInterval(setNewPosition);
    if (!firstClick && !pause) {
      setNewPosition = setInterval(() => {
        setLeftContainer((act) => act - 10);
        setBottomPenis((act) => act - 15);
      }, 50);
    }
  }, [pause]);

  useEffect(() => {
    const divisionRez = count / 5;
    if ((divisionRez + 1) % 2 === 0 || divisionRez === 1) {
      dispatch(togglePause());
      dispatch(setIsVisiblePopup(true));
    }
  }, [count]);
  return (
    <div className={cls.mainContainer}>
      {!firstClick && <ButtonMenu />}
      <div
        className={cls.container}
        style={{ left: `${leftContainer}px` }}
        onClick={onClickContainer}>
        <img
          className={`${cls.penisImage}`}
          alt="Penis"
          src={getPenisImage(choosePenis)}
          style={penisStyle}
        />
        {!firstClick && <Lottie animationData={LegAnimation} className={cls.legImg} loop={false} />}
        {firstClick && (
          <>
            <Lottie className={cls.cursorImage} animationData={ClickAnimation} loop={true} />
            <p>
              тапай по экрану,
              <br />
              чтобы проходить
              <br />
              препятствия
            </p>
          </>
        )}
        <Obstacles containerLeft={leftContainer} bottomPenis={bottomPenis} />
      </div>
    </div>
  );
};

export default Game;
