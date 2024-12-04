import { CANVAS_RATIO } from '@/constants/canvas';

export const calcScreen = (game: Phaser.Game | null = null) => {
  const canvas = getCanvas(game);
  const width = window.innerWidth;
  const height = window.innerHeight;

  showScaleGuide(width > height);

  // 유저 화면 비율
  const WINDOW_RATIO = width / height;

  if (WINDOW_RATIO < CANVAS_RATIO) {
    canvas.style.width = width < 320 ? '320px' : width + 'px';
    canvas.style.height = width < 320 ? '180px' : Math.floor(width / CANVAS_RATIO) + 'px';
  } else {
    canvas.style.width = Math.floor(height * CANVAS_RATIO) + 'px';
    canvas.style.height = height + 'px';
  }
};

function getCanvas(game: Phaser.Game | null) {
  return game ? game.canvas : (document.getElementsByTagName('canvas')[0] as HTMLCanvasElement);
}

function showScaleGuide(isShow: boolean) {
  // 회전 유도 텍스트
  const guide = document.getElementById('canvas-scale-guide') as HTMLDivElement;

  if (isShow) guide?.classList.add('!hidden');
  else guide?.classList.remove('!hidden');
}
