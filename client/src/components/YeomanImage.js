import React from 'react';
import './YeomanImage.scss';

const yeomanImage = require('../images/yeoman.png');

const YeomanImage = () => (<img src={yeomanImage} alt="Yeoman Generator" />);
YeomanImage.displayName = 'YeomanImage';

export default YeomanImage;
