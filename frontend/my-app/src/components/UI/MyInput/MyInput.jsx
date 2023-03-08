import React from 'react';
import s from './MyInput.module.scss'

const MyInput = ({ style, ...props }) => {
	return (

		<div className={s.input_block} style={{ display: 'inline-block', position: 'relative' }}>
			<input {...props} placeholder={props.placeholder} />
			<img style={style} src={props.imagesrc} alt={props.alttext} />
			
		</div>


	);
};

export default MyInput;