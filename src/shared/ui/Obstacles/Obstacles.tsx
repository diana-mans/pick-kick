import cls from './Obstacles.module.scss';
import bossImage from '../../assets/images/boss.svg';
import chairImage from '../../assets/images/chair.svg';
import coolerImage from '../../assets/images/cooler.svg';
import colleagueImage from '../../assets/images/colleague.svg';
import colleagueTwoImage from '../../assets/images/colleague1.svg';
import fishImage from '../../assets/images/fish.svg';
import fishTwoImage from '../../assets/images/fish2.svg';
import fishThreeImage from '../../assets/images/fish1.svg';
import folderImage from '../../assets/images/folder.svg';
import windowImage from '../../assets/images/window.svg';
import posterImage from '../../assets/images/poster.svg';
import poufImage from '../../assets/images/pouf.svg';
import conditionImage from '../../assets/images/condition.svg';
import lampImage from '../../assets/images/lamp.svg';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, setIsVisiblePopup, setPause } from '../../redux/gameSlice';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import moneySound from '../../assets/sound/money.aac';
import failSound from '../../assets/sound/fail.aac';
import { Howl } from 'howler';

type obstacleType = {
  name: string;
  initialLeft: number;
  count: number;
  bottom: number;
  height: number;
  width: number;
  additionalLeft: number;
  passedCount: number;
};
const arr: obstacleType[] = [
  {
    name: 'window',
    initialLeft: 830,
    count: 0,
    bottom: 380,
    height: 311,
    width: 187,
    additionalLeft: 60,
    passedCount: 0,
  },
  {
    name: 'boss',
    initialLeft: 1490,
    count: 0,
    bottom: 127,
    height: 334,
    width: 106,
    additionalLeft: 30,
    passedCount: 0,
  },
  {
    name: 'poster',
    initialLeft: 2030,
    count: 0,
    bottom: 495,
    height: 275,
    width: 173,
    additionalLeft: 20,
    passedCount: 0,
  },
  {
    name: 'colleague',
    initialLeft: 2640,
    count: 0,
    bottom: 170,
    height: 323,
    width: 160,
    additionalLeft: 50,
    passedCount: 0,
  },
  {
    name: 'fishTwo',
    initialLeft: 3300,
    count: 0,
    bottom: 250,
    height: 125,
    width: 135,
    additionalLeft: 30,
    passedCount: 0,
  },
  {
    name: 'chair',
    initialLeft: 4100,
    count: 0,
    bottom: 320,
    height: 321,
    width: 180,
    additionalLeft: 30,
    passedCount: 0,
  },
  {
    name: 'pouf',
    initialLeft: 5020,
    count: 0,
    bottom: 115,
    height: 333,
    width: 241,
    additionalLeft: 70,
    passedCount: 0,
  },
  {
    name: 'condition',
    initialLeft: 5820,
    count: 0,
    bottom: 645,
    height: 141,
    width: 305,
    additionalLeft: 0,
    passedCount: 0,
  },
  {
    name: 'fish',
    initialLeft: 6300,
    count: 0,
    bottom: 160,
    height: 125,
    width: 135,
    additionalLeft: 30,
    passedCount: 0,
  },
  {
    name: 'folder',
    initialLeft: 6840,
    count: 0,
    bottom: 560,
    height: 269,
    width: 187,
    additionalLeft: 20,
    passedCount: 0,
  },
  {
    name: 'colleagueTwo',
    initialLeft: 7580,
    count: 0,
    bottom: 185,
    height: 341,
    width: 154,
    additionalLeft: 0,
    passedCount: 0,
  },
  {
    name: 'lamp',
    initialLeft: 8340,
    count: 0,
    bottom: 545,
    height: 275,
    width: 193,
    additionalLeft: 30,
    passedCount: 0,
  },
  {
    name: 'fishThree',
    initialLeft: 9000,
    count: 0,
    bottom: 155,
    height: 125,
    width: 135,
    additionalLeft: 30,
    passedCount: 0,
  },
  {
    name: 'cooler',
    initialLeft: 9610,
    count: 0,
    bottom: 335,
    height: 329,
    width: 123,
    additionalLeft: 0,
    passedCount: 0,
  },
];

const sound = new Howl({
  src: [failSound],
});
const soundMoney = new Howl({
  src: [moneySound],
});

const Obstacles = (props: {
  containerLeft: number;
  bottomBall: number;
  setBottomBall: () => void;
}) => {
  const count = useSelector((state: RootState) => state.game.count);

  if (count === 0) {
    for (let i = 0; i < 14; i++) {
      arr[i].count = 0;
      arr[i].passedCount = 0;
    }
  }
  const dispatch = useDispatch();
  const getLeft = (idx: number) => {
    const isMove =
      Math.abs(props.containerLeft) - arr[idx].initialLeft - 10370 * arr[idx].count > 1000;
    if (isMove) {
      arr[idx].count = arr[idx].count + 1;
    }
    return arr[idx].initialLeft + 10370 * arr[idx].count;
  };
  const left = {
    window: getLeft(0),
    boss: getLeft(1),
    poster: getLeft(2),
    colleague: getLeft(3),
    fishTwo: getLeft(4),
    chair: getLeft(5),
    pouf: getLeft(6),
    condition: getLeft(7),
    fish: getLeft(8),
    folder: getLeft(9),
    colleagueTwo: getLeft(10),
    lamp: getLeft(11),
    fishThree: getLeft(12),
    cooler: getLeft(13),
  };

  useEffect(() => {
    arr.map((el, idx) => {
      const passed =
        Math.abs(props.containerLeft) - el.initialLeft - 10370 * el.count > -100 &&
        Math.abs(props.containerLeft) - el.initialLeft - 10370 * el.count < 100;
      const betweenHorizontalArr =
        Math.abs(props.containerLeft) - el.initialLeft - 10370 * el.count < 0 &&
        Math.abs(props.containerLeft) - el.initialLeft - 10370 * el.count >
          -el.width + el.additionalLeft;
      const betweenVerticalArr =
        props.bottomBall > el.bottom - 45 && props.bottomBall < el.bottom + el.height;
      const isCollide = betweenHorizontalArr && betweenVerticalArr;
      const isFall = props.bottomBall < -20;
      const isTop = props.bottomBall > window.innerHeight + 10 && betweenHorizontalArr;
      if (isCollide || isTop) {
        props.setBottomBall();
      }
      if (isCollide || isFall || isTop) {
        dispatch(setPause(true));
        sound.play();
        setTimeout(() => {
          dispatch(setIsVisiblePopup(true));
        }, 300);
      }
      if (passed && el.passedCount === el.count) {
        arr[idx].passedCount = arr[idx].passedCount + 1;
        dispatch(incrementCount());
        soundMoney.play();
      }
    });
  }, [props.containerLeft]);

  return (
    <div className={cls.obstacles}>
      <img
        alt="Wondow"
        src={windowImage}
        className={`${cls.windowImage} windowImage`}
        style={{ left: `${left.window}px` }}
      />
      <img
        alt="Boss"
        src={bossImage}
        className={cls.bossImage}
        style={{ left: `${left.boss}px` }}
      />
      <img
        alt="Poster"
        src={posterImage}
        className={cls.posterImage}
        style={{ left: `${left.poster}px` }}
      />
      <img
        alt="Colleague"
        src={colleagueImage}
        className={cls.colleagueImage}
        style={{ left: `${left.colleague}px` }}
      />
      <img
        alt="Fish"
        src={fishTwoImage}
        className={cls.fishTwoImage}
        style={{ left: `${left.fishTwo}px` }}
      />
      <img
        alt="Chair"
        src={chairImage}
        className={cls.chairImage}
        style={{ left: `${left.chair}px` }}
      />
      <img
        alt="Pouf"
        src={poufImage}
        className={cls.poufImage}
        style={{ left: `${left.pouf}px` }}
      />
      <img
        alt="Condition"
        src={conditionImage}
        className={cls.conditionImage}
        style={{ left: `${left.condition}px` }}
      />
      <img
        alt="Fish"
        src={fishImage}
        className={cls.fishImage}
        style={{ left: `${left.fish}px` }}
      />
      <img
        alt="Folder"
        src={folderImage}
        className={cls.folderImage}
        style={{ left: `${left.folder}px` }}
      />
      <img
        alt="Colleague"
        src={colleagueTwoImage}
        className={cls.colleagueTwoImage}
        style={{ left: `${left.colleagueTwo}px` }}
      />
      <img
        alt="Lamp"
        src={lampImage}
        className={cls.lampImage}
        style={{ left: `${left.lamp}px` }}
      />
      <img
        alt="Fish"
        src={fishThreeImage}
        className={cls.fishThreeImage}
        style={{ left: `${left.fishThree}px` }}
      />
      <img
        alt="Cooler"
        src={coolerImage}
        className={cls.coolerImage}
        style={{ left: `${left.cooler}px` }}
      />
    </div>
  );
};

export default Obstacles;
