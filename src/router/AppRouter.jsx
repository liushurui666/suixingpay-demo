import React, { Suspense, useState } from 'react';
import { Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import { routeConfig } from './index';
import Home from '../pages/Home/index.tsx';
import { ConfigProvider, Button, theme } from 'antd';
import { Layout } from '../components';
import { getRandomColor } from '../utils';
export default function AppRouter() {
	const [themeColor, setThemeColor] = useState('');
	const renderNode = item => {
		const Comp = item;
		return (
			<Suspense fallback={<div>等待中...</div>}>
				<Comp />
			</Suspense>
		);
	};
	const renderRoute = () => {
		return routeConfig?.map(item => {
			return <Route key={item.path} exact path={item?.path || ''} element={renderNode(item?.component)} />;
		});
	};
	console.log(Home, 'Home');

	const handleTheme = () => {
		let colorData = getRandomColor();
		setThemeColor(colorData);
	};
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: themeColor,
				},
			}}
		>
			<Layout />
			<Button type="primary" onClick={handleTheme}>
				切换主题
			</Button>
			<Routes>
				<Route path="/" element={renderNode(Home)} />
				{renderRoute()}
			</Routes>
		</ConfigProvider>
	);
}
