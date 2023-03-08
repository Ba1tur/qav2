import React, { useState } from 'react';
import s from './Login.module.scss'
import MyInput from '../../components/UI/MyInput/MyInput';
import MyButton from '../../components/UI/MyButton/MyButton';
import emailLogo from '../../assets/Email.png'
import passwordLogo from '../../assets/Password.png'
import Footer from '../../components/Footer/Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import openEyes from '../../assets/openEyes.png';
import closeEyes from '../../assets/closeEyes.png';


const Login = () => {
	const [userLogin, setUserLogin] = useState({
		email: '',
		password: ''
	})
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setLoading] = useState('');
	const [show, setShow] = useState(false)
	const handleShow = () => {
		 setShow(!show)
	}

	const navigate = useNavigate();

	const buttonBackgroundColor = !userLogin.email || !userLogin.password ? '#D5D5D5' : '#000000';

	const LOGIN_URL = 'http://localhost:8080/login'

	const login = async () => {
		if (userLogin.email.length > 1 || userLogin.password.length > 1) {
			try {
				setLoading(true)
				const { data } = await axios.post(LOGIN_URL, userLogin);
				console.log(data);
				localStorage.setItem('token', JSON.stringify(data.token));
				navigate('/');
			} catch (error) {
				setErrorMessage(error.response.data.error);
			}
			setLoading(false)
		}
	};

	return (
		<>
			<section className={s.login_section}>
				<div className={s.login_section__block}>
					{isLoading ? (
						<Loading />
					) : (
						<div>
							<h1>Вход</h1>
							<form className={s.login_section__block_inputs}>
								<MyInput value={userLogin.email} onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
									type={'email'} style={{ left: '22px', top: '17px' }}
									imagesrc={emailLogo}
									alttext="Image description"
									placeholder="E-mail"
									autoComplete='username'
								/>
								<MyInput value={userLogin.password} onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
									type={show? 'text' : 'password'}
									imagesrc={passwordLogo}
									alttext="Image description"
									placeholder="Пароль"
									autoComplete='current-password'
									eye={show ? closeEyes : openEyes} fun={handleShow}
								/>
								{!!errorMessage.length && <span>{errorMessage}</span>}
							</form>
							<div className={s.login_section__block_btn}>
								<MyButton
									style={{ backgroundColor: buttonBackgroundColor }}
									disabled={!userLogin.email || !userLogin.password ? true : false}
									onClick={login}>Войти
								</MyButton>
							</div>
						</div>
					)}
				</div>
			</section>
			<Footer title='Еще нет аккаунта?' titleLink='Зарегистрироваться' link='/register' />
		</>

	);
};

export default Login;