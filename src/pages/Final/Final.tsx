import cls from './Final.module.scss';
import moneyIcon from '../../shared/assets/images/money.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../shared/redux/store';
import { OnbPages, setOnboardingPage } from '../../shared/redux/onbPageSlice';
import { useNavigate } from 'react-router-dom';
import { resetCount } from '../../shared/redux/gameSlice';
import buttonSound from '../../shared/assets/sound/button.aac';

const Final = () => {
  const count = useSelector((state: RootState) => state.game.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickSound = new Audio(buttonSound);
  return (
    <div className={cls.container}>
      <div className={cls.contentContainer}>
        <p>Сегодня ты пинал х*й вместо работы {count} раз.</p>
        <div className={cls.counter}>
          <img alt="Money" src={moneyIcon} className={cls.moneyIcon} />
          <div>{count}</div>
        </div>
        <h1>Поздравляем, это твой личный рекорд!</h1>
        <p className={cls.onboard}>
          Чтобы не&nbsp;возвращаться к&nbsp;работе прямо сразу, посмотри х*еборд и&nbsp;узнай,
          на&nbsp;каком ты&nbsp;месте в&nbsp;топе главных пропинателей жизни!
        </p>
        <div className={cls.buttonContainer}>
          <button
            onClick={() => {
              clickSound.play();
              navigate('/table');
            }}>
            ПОСМОТРЕТЬ Х*ЕБОРД
          </button>
          <button
            onClick={() => {
              clickSound.play();
              dispatch(resetCount());
              dispatch(setOnboardingPage(OnbPages.MENU));
              navigate('/');
            }}>
            ПОПИНАТЬ ЕЩЕ!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Final;
