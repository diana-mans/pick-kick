import cls from './Game.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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
import flappySound from '../../shared/assets/sound/flappy.aac';
import { useSpring, animated } from '@react-spring/web';

let interval: ReturnType<typeof setInterval>;
const soundFlappy = new Audio(flappySound);

const Game = () => {
  const [firstClick, setFirstClick] = useState(true);
  const [obstacleProps, setObstacleProps] = useState({
    containerLeft: 0,
    bottomPenis: 84,
  });

  //Параметры контейнера
  const containerLeftRef = useRef(0);
  const [springPropsContainer, setSpringPropsContainer] = useSpring(() => ({
    left: `0px`,
  }));

  //Параметры Пениса
  const bottomPenisRef = useRef(282);
  const leftPenisRef = useRef(84);

  const [springPropsPenis, setSpringPropsPenis] = useSpring(() => ({
    bottom: `282px`,
    left: `84px`,
    transform: 'rotate(0deg)',
    config: { tension: 300, friction: 30 },
  }));

  const { pause } = useSelector((state: RootState) => state.game);
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
        bottomPenisRef.current = bottomPenisRef.current + 120;
        setSpringPropsPenis({
          bottom: `${bottomPenisRef.current}px`,
        });
      }
    }
    if (firstClick) {
      soundFlappy.play();
      setTimeout(() => {
        leftPenisRef.current = leftPenisRef.current + 100;
        bottomPenisRef.current = bottomPenisRef.current + 400;

        setSpringPropsPenis({
          bottom: `${bottomPenisRef.current}px`,
          left: `${leftPenisRef}px`,
          transform: 'rotate(45deg)',
        });
      }, 100);
    }
    setFirstClick(false);
  };

  useEffect(() => {
    pause && clearInterval(interval);
    if (!firstClick && !pause) {
      interval = setInterval(() => {
        containerLeftRef.current = containerLeftRef.current - 10;
        bottomPenisRef.current = bottomPenisRef.current - 15;
        setSpringPropsContainer({
          left: `${containerLeftRef.current}px`,
        });
        setSpringPropsPenis({
          bottom: `${bottomPenisRef.current}px`,
        });
      }, 50);
    }
  }, [pause, firstClick]);

  useEffect(() => {
    setInterval(() => {
      setObstacleProps({
        containerLeft: containerLeftRef.current,
        bottomPenis: bottomPenisRef.current,
      });
    }, 1000);
  }, []);

  return (
    <div className={cls.mainContainer}>
      {!firstClick && <ButtonMenu />}

      <animated.div
        className={cls.container}
        style={{ ...springPropsContainer }}
        onClick={onClickContainer}>
        <animated.img
          className={`${cls.penisImage}`}
          alt="Penis"
          src={getPenisImage(choosePenis)}
          style={{ ...springPropsPenis }}
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
        <Obstacles
          containerLeft={obstacleProps.containerLeft}
          bottomPenis={obstacleProps.bottomPenis}
          setBottomPenis={() => {
            bottomPenisRef.current = 0;
            setSpringPropsPenis({
              bottom: `${bottomPenisRef.current}px`,
            });
          }}
        />
      </animated.div>
    </div>
  );
};

export default Game;
