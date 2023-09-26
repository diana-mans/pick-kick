const parent = window.parent.window;

export function gameOver(count: number) {
  const payload = {
    playdeck: {
      method: 'getScore',
      value: count,
    },
  };
  parent.postMessage(payload, '*');
}

export function isLoad() {
  const payload = {
    playdeck: {
      method: 'loading',
      value: 100,
    },
  };
  parent.postMessage(payload, '*');
}
