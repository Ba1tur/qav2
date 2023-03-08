import React, { useContext } from 'react';
import s from './Header.module.scss'
import { Link, useLocation } from 'react-router-dom';
import { AddContext } from '../../Context';

const Header = () => {

	const {renderUser, setRenderUser} = useContext(AddContext)

	const location = useLocation();
	const isHomePage = location.pathname === '/';

	return (
		<header className={s.header}>
			<div className={s.header__bloks}>
				<div className={s.header__block}>
					<div className={s.header__block__logo}>
						Logo
					</div>
					<div className={s.header__block_title}>
						Разрабатываем и запускаем <br /> сложные веб проекты
					</div>
				</div>
				{isHomePage ? (
          <div className={s.header_block__profile}>
            <p>{renderUser.username}</p>
            <img src={renderUser.avatar} alt="user_avatar" />
          </div>
        ) : (
          <div className={s.header__block__button}>
            <Link to='/login'>
              <button>Войти</button>
            </Link>
          </div>
        )}
			</div>
		</header>
	);
};

export default Header;