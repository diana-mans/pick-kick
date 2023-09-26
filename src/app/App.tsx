import { Route, Routes, useLocation } from 'react-router-dom';
import Onboarding from '../pages/Onboarding/Onboarding';
import './styles/index.scss';
import Game from '../pages/Game/Game';
import Final from '../pages/Final/Final';
import Table from '../pages/Table/Table';
import { useSelector } from 'react-redux';
import { RootState } from '../shared/redux/store';
import Popup from '../shared/ui/Popup/Popup';
import bgMusic from '../shared/assets/sound/music.aac';
import { useEffect, useMemo } from 'react';
import { Howl } from 'howler';
import { isLoad } from '../shared/ui/Api/getFunc';

function App() {
  const { isVisiblePopup, isSound } = useSelector((state: RootState) => state.game);
  const onbPage = useSelector((state: RootState) => state.onbPage.currentPage);
  let location = useLocation();
  const sound = useMemo(() => {
    return new Howl({
      src: [bgMusic],
    });
  }, []);

  useEffect(() => {
    if (isSound) {
      sound.once('load', function () {
        sound.play();
      });
      sound.play();
    } else {
      sound.pause();
    }
  }, [onbPage, isSound]);

  window.addEventListener('load', isLoad);

  return (
    <div className="App">
      {isVisiblePopup && <Popup />}
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/game" element={<Game />} />
        <Route path="/final" element={<Final />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
