import { useSelector } from 'react-redux';
import AgeContainer from '../../widgets/AgeContainer/AgeContainer';
import FlappyOnboarding from '../../widgets/FlappyOnboarding/FlappyOnboarding';
import PenisMenu from '../../widgets/PenisMenu/PenisMenu';
import cls from './Onboarding.module.scss';
import { RootState } from '../../shared/redux/store';
import { OnbPages } from '../../shared/redux/onbPageSlice';

const Onboarding = () => {
  const currPage = useSelector((state: RootState) => state.onbPage.currentPage);
  return (
    <div className={cls.Onboarding}>
      {currPage === OnbPages.AGE && <AgeContainer />}
      {currPage === OnbPages.FlAPPY && <FlappyOnboarding />}
      {currPage === OnbPages.MENU && <PenisMenu />}
    </div>
  );
};

export default Onboarding;
