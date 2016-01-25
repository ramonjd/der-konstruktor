let configFile = './development';

if (process.env.NODE_ENV === 'production') {
    configFile = './production';
}

export default require(`${configFile}`).config;