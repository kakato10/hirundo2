import React from 'react';
import './yeoman_image.scss';

const yeomanImage = require('../../images/yeoman.png');

const YeomanImage = () => (
	<div className='image'>
		<img src={yeomanImage} alt="Yeoman Generator" />
	</div>
);
YeomanImage.displayName = 'YeomanImage';

export default YeomanImage;
