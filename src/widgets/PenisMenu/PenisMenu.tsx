import cls from './PenisMenu.module.scss';
import PenisClassic from '../../shared/assets/images/penis-classic.svg';
import PenisRibbed from '../../shared/assets/images/penis-ribbed.svg';
import PenisEye from '../../shared/assets/images/penis-eye.svg';
import PenisBlack from '../../shared/assets/images/penis-black.svg';
import { useDispatch } from 'react-redux';
import { Penis, setPenis } from '../../shared/redux/chooseSlice';
import { Link } from 'react-router-dom';
import buttonSound from '../../shared/assets/sound/button.aac';

const clickSound = new Audio(buttonSound);

const PenisMenu = () => {
  const dispatch = useDispatch();

  const onClickPenis = (item: Penis) => {
    dispatch(setPenis(item));
    clickSound.play();
  };
  return (
    <div className={cls.container}>
      <h2>
        выбери на свой <br /> вкус
      </h2>
      <div className={cls.items}>
        <Link to="/game">
          <div className={cls.penisItem} onClick={() => onClickPenis(Penis.ClASSIC)}>
            <img src={PenisClassic} alt="Classic penis" />
          </div>
        </Link>
        <Link to="/game">
          <div className={cls.penisItem} onClick={() => onClickPenis(Penis.RIBBED)}>
            <img src={PenisRibbed} alt="Ribbed penis" />
          </div>
        </Link>
        <Link to="/game">
          <div className={cls.penisItem} onClick={() => onClickPenis(Penis.EYE)}>
            <img src={PenisEye} alt="Penis with eye" />
          </div>
        </Link>
        <Link to="/game">
          <div className={cls.penisItem} onClick={() => onClickPenis(Penis.BLACK)}>
            <img src={PenisBlack} alt="Black penis" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PenisMenu;
