import { useDispatch } from 'react-redux';
import cls from './Popup.module.scss';
import { setIsVisiblePopup, togglePause } from '../../redux/gameSlice';
import buttonSound from '../../assets/sound/button.aac';

const Popup = () => {
  const dispatch = useDispatch();
  const clickSound = new Audio(buttonSound);
  const speechArr = [
    'М-м-м, у тебя такой большой игровой потенциал!',
    'Не останавливайся!',
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
          dispatch(togglePause());
        }}>
        Продолжить
      </button>
    </div>
  );
};

export default Popup;
