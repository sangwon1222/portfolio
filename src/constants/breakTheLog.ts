export const STATUS_LIST = ['tree', 'tree-left', 'tree-right'] as const;

export const INIT_LOG_COUNT = 8 as const;

export const BREAK_THE_LOG_RESOURCE_LIST: { image: [string, string][]; audio: [string, string][] } =
  {
    image: [
      ['touch-guide', 'common/image/touch-guide.png'],
      ['bg', 'breakTheLog/image/bg.png'],
      ['ground', 'breakTheLog/image/ground.png'],
      ['tree', 'breakTheLog/image/tree.png'],
      ['tree-left', 'breakTheLog/image/tree-left.png'],
      ['tree-right', 'breakTheLog/image/tree-right.png'],
    ],
    audio: [],
  } as const;
