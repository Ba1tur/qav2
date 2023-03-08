import React, {  useState } from 'react';
import s from './Register.module.scss'
import MyInput from '../../components/UI/MyInput/MyInput';
import profile from '../../assets/Avatar.png'
import emailLogo from '../../assets/Email.png'
import passwordLogo from '../../assets/Password.png'
import MyButton from '../../components/UI/MyButton/MyButton';
import Footer from '../../components/Footer/Footer';
import axios from 'axios'
import Loading from '../../components/Loading/Loading';
import openEyes from '../../assets/openEyes.png'
import closeEyes from '../../assets/closeEyes.png'

const Register = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState('');
	const [show, setShow] = useState(false)
	const handleShow = () => {
		 setShow(!show)
	}

	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
	})

	const buttonBackgroundColor = !userData.username || !userData.email || !userData.password ? '#D5D5D5' : '#000000';

	const BASE_URL = 'http://localhost:8080'

	const postDataUser = async () => {
		try {
			setLoading(true)
			await axios
				.post(BASE_URL + "/register", userData)
				.then((res) => localStorage.setItem('token', JSON.stringify(res.data.token)), console.log(localStorage))
			setUserData({ username: '', email: '', password: '' });
			window.location.reload();
		} catch (error) {
			setError(error.response.data.error)
		}
		setLoading(false);
	}

	return (
		<>
			<section className={s.register}>
				<div className={s.register__block}>
					{loading ? (
						<Loading />
					) : (
						<div style={{position: 'relative'}}>
							<h1>Регистрация</h1>
							<form className={s.register__block_inputs}>
								<MyInput value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })}
									type={'text'}
									imagesrc={profile}
									alttext="Image description"
									placeholder="Имя" />
								<MyInput
									value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })}
									type={'email'}
									style={{ left: '22px', top: '17px' }}
									imagesrc={emailLogo} alttext="Image description"
									placeholder="E-mail"
									autoComplete='username'
								/>
								<MyInput
									value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })}
									type={show? 'text' : 'password'} eye={show ? closeEyes : openEyes} fun={handleShow} autoComplete='current-password' imagesrc={passwordLogo} alttext="Image description" placeholder="Пароль"/>
									
									
							</form>
							{!!error.length && <span>{error}</span>}
							<div className={s.register__block_btn}>
								<MyButton
									style={{ backgroundColor: buttonBackgroundColor }}
									disabled={!userData.username || !userData.email || !userData.password ? true : false}
									onClick={postDataUser}>Создать аккаунт
									</MyButton>
							</div>
						</div>
					)}
				</div>
			</section>
			<Footer link={'/login'} title={'Уже есть аккаунт?'} titleLink={'Войти'} />
		</>
	);
};

export default Register;