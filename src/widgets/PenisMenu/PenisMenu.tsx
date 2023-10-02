import cls from './PenisMenu.module.scss';
import BallClassic from '../../shared/assets/images/penis-classic.svg';
import BallRibbed from '../../shared/assets/images/penis-ribbed.png';
import BallEye from '../../shared/assets/images/penis-eye.svg';
import BallBlack from '../../shared/assets/images/penis-black.svg';
import { useDispatch } from 'react-redux';
import { Ball, setBall } from '../../shared/redux/chooseSlice';
import { Link } from 'react-router-dom';
import buttonSound from '../../shared/assets/sound/button.aac';

const clickSound = new Audio(buttonSound);

const BallMenu = () => {
  const dispatch = useDispatch();

  const onClickBall = (item: Ball) => {
    dispatch(setBall(item));
    clickSound.play();
  };
  return (
    <div className={cls.container}>
      <h2>
        выбери
        <br />
        на свой вкус
      </h2>
      <div className={cls.items}>
        <Link to="/game">
          <div className={cls.BallItem} onClick={() => onClickBall(Ball.ClASSIC)}>
            <img src={BallClassic} alt="Classic Ball" />
          </div>
        </Link>
        <Link to="/game">
          <div className={cls.BallItem} onClick={() => onClickBall(Ball.RIBBED)}>
            <img src={BallRibbed} alt="Ribbed Ball" />
          </div>
        </Link>
        <Link to="/game">
          <div className={cls.BallItem} onClick={() => onClickBall(Ball.EYE)}>
            <img src={BallEye} alt="Ball with eye" />
          </div>
        </Link>
        <Link to="/game">
          <div className={cls.BallItem} onClick={() => onClickBall(Ball.BLACK)}>
            <img src={BallBlack} alt="Black Ball" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BallMenu;
