import React from 'react';
import s from './Footer.module.scss'
import { Link } from 'react-router-dom';

const Footer = ({ title, titleLink , link }) => {
	return (
		<footer className={s.footer}>
			<Link to={link}>
				<div className={s.footer_title}>
					<p>{title}   <span>{titleLink}</span> </p>
				</div>
			</Link>
		</footer>
	);
};

export default Footer;