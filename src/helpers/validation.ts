export function isGamePlatformValid(platform: string): Boolean {
  const validPlatforms = [
    'pc',
    'ios',
    'dreamcast',
    'gameboy advance',
    'ds',
    '3ds',
    'nintendo 64',
    'gamecube',
    'wii',
    'wii u',
    'switch',
    'playstation',
    'playstation 2',
    'playstation 3',
    'playstation 4',
    'playstation 5',
    'psp',
    'playstation vita',
    'xbox',
    'xbox 360',
    'xbox one',
    'xbox series x',
    'stadia'
  ];

  return validPlatforms.some((p) => p === platform.toLowerCase());
}
