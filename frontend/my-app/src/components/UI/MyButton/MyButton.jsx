import React from 'react';
import s from './MyButton.module.scss'

const MyButton = ({children  , ...props  }) => {
	return (
		<button  {...props} style={{ ...props.style }} className={s.mybtn}>
			{children}
		</button>
	);
};

export default MyButton;