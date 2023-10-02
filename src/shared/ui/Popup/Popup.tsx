import { useDispatch, useSelector } from 'react-redux';
import cls from './Popup.module.scss';
import { setIsVisiblePopup, setPause } from '../../redux/gameSlice';
import buttonSound from '../../assets/sound/button.aac';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { setUserScore } from '../Api/getFunc';

const Popup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickSound = new Audio(buttonSound);
  const count = useSelector((state: RootState) => state.game.count);
  const speechArr = [
    'М-м-м, у тебя такой большой игровой потенциал!',
    'Скажи, что я крепкий, как хозяйственник!',
    'Давай, запинай меня глубже!',
    'Я чувствую, как ты горяч, даже через экран!',
    'Это очко персонально от меня!',
    'Только не в меня… а, пофиг, давай в меня!',
    'Ты лучший игрок, который у меня был!',
    'А давай ты сегодня вообще не будешь работать?',
    'Не кончай играть!',
  ];
  const randomNumber = Math.floor(Math.random() * speechArr.length);
  return (
    <div className={cls.PopopContainer}>
      <p>{speechArr[randomNumber]}</p>
      <button
        onClick={() => {
          clickSound.play();
          dispatch(setIsVisiblePopup(false));
          navigate('/final');
          setUserScore(count);
          dispatch(setPause(false));
        }}>
        Продолжить
      </button>
    </div>
  );
};

export default Popup;
