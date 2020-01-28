function isGamePlatformValid(platform) {
    const validPlatforms = [
        'pc',
        'ios',
        'dreamcast',
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
        'psp',
        'playstation vita',
        'xbox',
        'xbox 360',
        'xbox one'
    ];

    return validPlatforms.find(p => p === platform.toLowerCase()); 
}

module.exports = {
    isGamePlatformValid
};