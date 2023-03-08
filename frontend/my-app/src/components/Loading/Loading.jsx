import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
	return (
		<CircularProgress style={{
			color: 'black',
			width: '100px',
			height: '100px',
			marginTop: '140px',
			marginLeft: '150px'
		}} color='secondary' />
	);
};

export default Loading;