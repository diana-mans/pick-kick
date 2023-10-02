import cls from './Table.module.scss';
import moneyIcon from '../../shared/assets/images/money.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCount } from '../../shared/redux/gameSlice';
import { OnbPages, setOnboardingPage } from '../../shared/redux/onbPageSlice';
import buttonSound from '../../shared/assets/sound/button.aac';
import { Scrollbar } from '../../shared/ui/Scrollbar/Scrollbar';
import { useEffect, useState } from 'react';
import { getUsersTop, userType } from '../../shared/ui/Api/getFunc';
const clickSound = new Audio(buttonSound);

const Table = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await getUsersTop();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Произошла ошибка при получении счета:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cls.container}>
      <div className={cls.contentContainer}>
        <h2>х*еборд</h2>
        <Scrollbar
          children={
            <div className={cls.listContainer}>
              <ul>
                {users
                  .sort((a, b) => a.position - b.position) // Сортировка пользователей по полю position
                  .map((user) => (
                    <li key={user.position}>
                      <div className={cls.name}>
                        {user.username
                          ? user.username
                          : user.position % 2 === 0
                          ? 'Хуан Диккенс'
                          : 'Кончита Диккенс'}
                      </div>
                      <div className={cls.counter}>
                        <img alt="Money" src={moneyIcon} className={cls.moneyIcon} />
                        <div>{user.score}</div>
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
      </div>
    </div>
  );
};

export default Table;
