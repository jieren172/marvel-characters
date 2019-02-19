import dev from './config-dev';
// add more env

const confenv = { dev, };

const env = process.env.REACT_APP_ENV || 'dev';

export default confenv[env];
