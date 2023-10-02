const parent = window.parent.window;

export const setUserScore = (score: number, force: boolean = false) => {
  const payload = {
    playdeck: {
      method: 'setScore',
      value: score,
      isForce: force,
    },
  };
  parent.postMessage(payload, '*');
};

export function isLoad() {
  const payload = {
    playdeck: {
      method: 'loading',
      value: 100,
    },
  };
  parent.postMessage(payload, '*');
}

// export const getUserData = () => {
//   parent.postMessage({ playdeck: { method: 'getUser' } }, '*');

//   window.addEventListener('message', ({ data }) => {
//     const playdeck = data?.playdeck;
//     if (!playdeck) return;
//     if (playdeck.method === 'getUser') {
//       return playdeck.value.username;
//     }
//   });
// };

export type userType = {
  position: number;
  score: number;
  username?: string;
};

export const getUsersTop = (): Promise<userType[]> => {
  return new Promise((resolve, reject) => {
    const payload = {
      playdeck: {
        method: 'getGlobalScore',
        top: 10,
      },
    };

    parent.postMessage(payload, '*');

    const onMessage = (event: MessageEvent) => {
      const playdeck = event.data?.playdeck;
      if (!playdeck) return;
      if (playdeck.method === 'getGlobalScore') {
        window.removeEventListener('message', onMessage); // Убираем обработчик после получения данных
        resolve(playdeck.value as userType[]);
      }
    };

    window.addEventListener('message', onMessage);
  });
};

export function getBestScore(): Promise<number | null> {
  return new Promise((resolve, reject) => {
    // Отправляем запрос на получение счета
    const payload = {
      playdeck: {
        method: 'getScore',
      },
    };
    parent.postMessage(payload, '*');

    // Функция-обработчик для входящих сообщений
    const messageHandler = ({ data }: MessageEvent) => {
      const playdeck = data?.playdeck;
      if (!playdeck) return;

      if (playdeck.method === 'getScore') {
        // Удаляем обработчик, так как он нам больше не нужен
        window.removeEventListener('message', messageHandler);

        // Разрешаем промис, возвращая полученный счет
        resolve(playdeck.value.score ?? null);
      }
    };

    // Устанавливаем обработчик для входящих сообщений
    window.addEventListener('message', messageHandler);
  });
}
