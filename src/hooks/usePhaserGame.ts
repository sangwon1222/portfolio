import { useEffect } from 'react';
import * as Phaser from 'phaser';
import { Game } from 'phaser';
import { calcScreen } from '@/util';

export const usePhaserGame = (
  phaserConfig: Phaser.Types.Core.GameConfig,
  handleOnLoading: () => void,
  handleLoaded: () => void,
  isResize: boolean
) => {
  useEffect(() => {
    const app = document.getElementById('phaser-app');
    app?.replaceChildren();

    const gameRef = new Game(phaserConfig) as Phaser.Game;
    gameRef.events.on('onLoading', handleOnLoading);
    gameRef.events.on('loaded', handleLoaded);

    const mappingCalcScreen = () => calcScreen(gameRef);
    mappingCalcScreen();
    if (isResize) window.addEventListener('resize', mappingCalcScreen, true);

    return () => {
      gameRef.events.off('onLoading', handleOnLoading);
      gameRef.events.off('loaded', handleLoaded);
      if (isResize) window.removeEventListener('resize', mappingCalcScreen, true);
      gameRef.destroy(true);
    };
  }, []);
};
