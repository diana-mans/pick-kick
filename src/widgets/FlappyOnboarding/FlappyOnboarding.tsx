import { useDispatch } from 'react-redux';
import cls from './FlappyOnboarding.module.scss';
import { OnbPages, setOnboardingPage } from '../../shared/redux/onbPageSlice';
import BallImage from '../../shared/assets/images/penis-classic.svg';
import buttonSound from '../../shared/assets/sound/button.aac';

const FlappyOnboarding = () => {
  const dispatch = useDispatch();
  const clickSound = new Audio(buttonSound);
  return (
    <div className={cls.container}>
      <h1>Флэппи Х*й</h1>
      <p>
        Бывает время разбрасывать камни. Бывает время собирать камни. А&nbsp;бывает время пинать
        х*и! <br /> <br />
        Отвлекись от&nbsp;всех тупых дел типа работы. <br />И разомни ноги об&nbsp;упругий
      </p>
      <img alt="Ball" src={BallImage} />
      <button
        onClick={() => {
          dispatch(setOnboardingPage(OnbPages.MENU));
          clickSound.play();
        }}>
        Пни меня!
      </button>
    </div>
  );
};

export default FlappyOnboarding;
