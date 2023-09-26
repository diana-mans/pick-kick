import { useDispatch } from 'react-redux';
import cls from './AgeContainer.module.scss';
import { OnbPages, setOnboardingPage } from '../../shared/redux/onbPageSlice';
import YesIcon from '../../shared/assets/images/yes.svg';
import buttonSound from '../../shared/assets/sound/button.aac';

const clickSound = new Audio(buttonSound);

const AgeContainer = () => {
  const dispatch = useDispatch();

  return (
    <div className={cls.container}>
      <h2>
        Докажи, что <br /> ты взрослый!
      </h2>
      <p>Нажми на кнопку «Мне есть 18», чтобы начать!</p>
      <button
        onClick={() => {
          dispatch(setOnboardingPage(OnbPages.FlAPPY));
          clickSound.play();
        }}>
        Мне есть 18
        <img alt="Yes" src={YesIcon} />
      </button>
    </div>
  );
};

export default AgeContainer;
