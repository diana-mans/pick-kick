import cls from './Game.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../shared/redux/store';
import { Ball } from '../../shared/redux/chooseSlice';
import ClassicBall from '../../shared/assets/images/penis-classic.svg';
import RibbedBall from '../../shared/assets/images/penis-ribbed.png';
import EyeBall from '../../shared/assets/images/penis-eye.svg';
import BlackBall from '../../shared/assets/images/penis-black.svg';
import Lottie from 'lottie-react';
import ClickAnimation from '../../shared/assets/images/click-anim.json';
import LegAnimation from '../../shared/assets/images/leg-anim.json';
import ButtonMenu from '../../shared/ui/ButtonMenu/ButtonMenu';
import Obstacles from '../../shared/ui/Obstacles/Obstacles';
import flappySound from '../../shared/assets/sound/flappy.aac';
import { useSpring, animated } from '@react-spring/web';

let dropTimer: ReturnType<typeof setTimeout>; // таймер для опускания
let intervalContainer: ReturnType<typeof setInterval>; // интервал для движения сонтейнера
let intervalBall: ReturnType<typeof setInterval>; // интервал для движения пениса

const Game = () => {
  const [firstClick, setFirstClick] = useState(true);
  const [obstacleProps, setObstacleProps] = useState({
    containerLeft: 0,
    bottomBall: 84,
  });
  const [isClick, setIsClick] = useState(false);

  //Параметры контейнера
  const containerLeftRef = useRef(0);
  const [springPropsContainer, setSpringPropsContainer] = useSpring(() => ({
    left: `0px`,
  }));

  //Параметры Пениса
  const bottomBallRef = useRef(282);
  const leftBallRef = useRef(84);

  const [springPropsBall, setSpringPropsBall] = useSpring(() => ({
    bottom: `282px`,
    left: `84px`,
    transform: 'rotate(0deg)',
    config: { tension: 300, friction: 30 },
  }));

  const { pause } = useSelector((state: RootState) => state.game);
  const chooseBall = useSelector((state: RootState) => state.choose.chooseBall);

  const getBallImage = (chooseBall: string) => {
    if (chooseBall === Ball.BLACK) {
      return BlackBall;
    } else if (chooseBall === Ball.RIBBED) {
      return RibbedBall;
    } else if (chooseBall === Ball.EYE) {
      return EyeBall;
    } else {
      return ClassicBall;
    }
  };

  const onClickContainer = () => {
    if (!pause) {
      const soundFlappy = new Audio(flappySound);
      soundFlappy.play();
      clearTimeout(dropTimer);

      if (firstClick) {
        bottomBallRef.current += 280;
        leftBallRef.current += 100;
        setFirstClick(false);
      } else {
        setIsClick(true);
        bottomBallRef.current += 120;
      }

      setSpringPropsBall({
        bottom: `${bottomBallRef.current}px`,
        left: `${leftBallRef.current}px`,
        transform: 'rotate(45deg)',
      });

      // Задержка перед установкой угла обратно на 135deg
      dropTimer = setTimeout(() => {
        setIsClick(false);
        setSpringPropsBall((prev: any) => ({
          ...prev,
          transform: `rotate(135deg)`,
        }));
      }, 300);
    }
  };

  useEffect(() => {
    if (!pause && !firstClick) {
      intervalContainer = setInterval(() => {
        containerLeftRef.current -= 10;
        setSpringPropsContainer({
          left: `${containerLeftRef.current}px`,
        });
      }, 50);
    } else {
      clearInterval(intervalContainer);
    }

    if (!pause && !firstClick && !isClick) {
      intervalBall = setInterval(() => {
        bottomBallRef.current -= 15; // тут тоже опускаем на 10px каждые 50 мс
        setSpringPropsBall((prev: any) => ({
          ...prev,
          bottom: `${bottomBallRef.current}px`,
        }));
      }, 50);
    } else {
      clearInterval(intervalBall);
    }

    return () => {
      clearInterval(intervalContainer);
      clearInterval(intervalBall);
    };
  }, [pause, firstClick, isClick]);

  useEffect(() => {
    setInterval(() => {
      setObstacleProps({
        containerLeft: containerLeftRef.current,
        bottomBall: bottomBallRef.current,
      });
    }, 500);
  }, []);

  return (
    <div className={cls.mainContainer}>
      {!firstClick && <ButtonMenu />}

      <animated.div
        className={cls.container}
        style={{ ...springPropsContainer }}
        onClick={onClickContainer}>
        <animated.img
          className={`${cls.BallImage}`}
          alt="Ball"
          src={getBallImage(chooseBall)}
          style={{ ...springPropsBall }}
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
          bottomBall={obstacleProps.bottomBall}
          setBottomBall={() => {
            bottomBallRef.current = 0;
            setSpringPropsBall({
              bottom: `${bottomBallRef.current}px`,
            });
          }}
        />
      </animated.div>
    </div>
  );
};

export default Game;
