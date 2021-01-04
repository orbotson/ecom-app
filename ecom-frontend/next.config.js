const nextTranslate = require('next-translate');

module.exports = {
    ...nextTranslate(),
    images: {
        deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
};
