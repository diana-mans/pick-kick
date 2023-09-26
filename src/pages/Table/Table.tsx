import cls from './Table.module.scss';
import moneyIcon from '../../shared/assets/images/money.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCount } from '../../shared/redux/gameSlice';
import { OnbPages, setOnboardingPage } from '../../shared/redux/onbPageSlice';
import buttonSound from '../../shared/assets/sound/button.aac';
import scrollBar from '../../shared/assets/images/scrollbar.svg';
import penisIcon from '../../shared/assets/images/penis-classic.svg';
import { Scrollbar } from '../../shared/ui/Scrollbar/Scrollbar';
const clickSound = new Audio(buttonSound);

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = [
    {
      id: 1,
      name: 'Моргенштерн',
      count: 500,
    },
    {
      id: 2,
      name: 'Михалков',
      count: 450,
    },
    {
      id: 3,
      name: 'Юрий Дудь',
      count: 400,
    },
    {
      id: 4,
      name: 'Дэд инсайд',
      count: 350,
    },
    {
      id: 5,
      name: 'Хатабыч',
      count: 300,
    },
    {
      id: 6,
      name: 'Навальный',
      count: 250,
    },
    {
      id: 7,
      name: 'Игорь',
      count: 200,
    },
    {
      id: 8,
      name: 'Сергей',
      count: 200,
    },
    {
      id: 9,
      name: 'Олег',
      count: 200,
    },
    {
      id: 10,
      name: 'Никита Кукушкин',
      count: 200,
    },
    {
      id: 11,
      name: 'Владимир',
      count: 200,
    },
    {
      id: 12,
      name: 'Дмитрий Комаров',
      count: 200,
    },
    {
      id: 13,
      name: 'Стас Михайлов',
      count: 200,
    },
    {
      id: 14,
      name: 'Дарья Каплан',
      count: 200,
    },
    {
      id: 15,
      name: 'Стас Костюшкин',
      count: 200,
    },
    {
      id: 16,
      name: 'Георгий',
      count: 200,
    },
    {
      id: 17,
      name: 'Мишустин',
      count: 200,
    },
    {
      id: 18,
      name: 'Шилинко',
      count: 200,
    },
    {
      id: 19,
      name: 'Кириенко',
      count: 200,
    },
    {
      id: 10,
      name: 'Никита Кукушкин',
      count: 200,
    },
    {
      id: 11,
      name: 'Владимир',
      count: 200,
    },
    {
      id: 12,
      name: 'Дмитрий Комаров',
      count: 200,
    },
    {
      id: 16,
      name: 'Георгий',
      count: 200,
    },
    {
      id: 17,
      name: 'Мишустин',
      count: 200,
    },
    {
      id: 18,
      name: 'Шилинко',
      count: 200,
    },
    {
      id: 19,
      name: 'Кириенко',
      count: 200,
    },
  ];
  return (
    <div className={cls.container}>
      <div className={cls.contentContainer}>
        <h2>х*еборд</h2>
        <Scrollbar
          children={
            <div className={cls.listContainer}>
              <ul>
                {userList.map((el) => (
                  <li key={el.id}>
                    <div className={cls.name}>{el.name}</div>
                    <div className={cls.counter}>
                      <img alt="Money" src={moneyIcon} className={cls.moneyIcon} />
                      <div>{el.count}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
        <button
          onClick={() => {
            clickSound.play();
            dispatch(resetCount());
            dispatch(setOnboardingPage(OnbPages.MENU));
            navigate('/');
          }}>
          ПОПИНАТЬ ЕЩЕ!
        </button>
        {/* <img alt="scroll" src={scrollBar} className={cls.scrollBar} />
        <img alt="penis" src={penisIcon} className={cls.penisIcon} /> */}
      </div>
    </div>
  );
};

export default Table;
