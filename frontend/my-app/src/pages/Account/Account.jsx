import React, { useContext, useEffect, useState } from 'react';
import s from './Account.module.scss'
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import './Accaount.css'
import BasicInput from '../../components/UI/Input/Input';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AddContext } from '../../Context';



const Account = () => {
	const [modal2Open, setModal2Open] = useState(false);
	const { renderUser, setRenderUser } = useContext(AddContext)
	const [changeData, setChangeData] = useState({
		username: '',
		email: '',
		about: '',
		avatar: '',
	})

	let navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		return navigate("/register");
	};

	const getUser = async () => {
		try {
			let config = {
				headers: {
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token"))
				}
			}
			await axios
				.get('http://localhost:8080/profile', config)
				.then((res) => setRenderUser(res.data.data))
		} catch (error) {
			console.log(error);
		}
	}



	const changeInfo = async () => {
		try {
			const token = JSON.parse(localStorage.getItem('token'));
			const config = {
				headers: {
					Authorization: `Bearer ${token}`
				}
			};
			const response = await axios.patch('http://localhost:8080/profile', changeData, config);
			console.log(response.data);
			window.location.reload()
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser()
	}, []);

	return (
		<section className={s.account_section}>
			<div className={s.account_section_main}>
				<div className={s.account_section_main_about}>
					<img src={renderUser.avatar} alt="user_avatar" />
					<div className={s.account_section_main_about_header}>
						<p>{renderUser.username}</p>
						<p>{renderUser.email}</p>
						<button onClick={() => setModal2Open(true)}>
							Редактировать</button>
					</div>
					<p>{renderUser.email}</p>
					<p>{renderUser.about}</p>
					<Button
						onClick={handleLogout}
						style={{ width: '130px', marginTop: '60px' }} icon={<LogoutOutlined />}>Выйти</Button>
				</div>
				<Modal
					title={false}
					closeIcon={false}
					width={'600px'}
					centered
					open={modal2Open}
					footer={false}
					onOk={false}
					onCancel={false}
					content={false}
				>
					<div className={s.modal}>
						<h3>Редактировать профиль</h3>
						<div className={s.modal_input_first}>
							<BasicInput value={changeData.username} onChange={(e) => (setChangeData({ ...changeData, username: e.target.value }))} title='Имя' style={{ height: '50px' }} />
							<BasicInput value={changeData.email} onChange={(e) => (setChangeData({ ...changeData, email: e.target.value }))} title='E-mail' style={{ height: '50px' }} />
							<BasicInput value={changeData.avatar} onChange={(e) => (setChangeData({ ...changeData, avatar: e.target.value }))} title='Url аватарки' style={{ height: '50px' }} />
							<BasicInput value={changeData.about} onChange={(e) => (setChangeData({ ...changeData, about: e.target.value }))} title='Описание' style={{ whileSpace: 'normal', height: '150px', paddingBottom: '110px' }} />
						</div>
						<button onClick={() => setModal2Open(false)}>Отмена</button>
						<button onClick={changeInfo}>Сохранить</button>
						
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default Account;