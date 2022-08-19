import './App.scss';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from './pages/mainPage';
import CartPage from './pages/cartPage';
import ItemPage from './pages/itemPage';

export default class App extends React.Component {
    render() {
        return (
            <Routes>
                <Route path={'/'} element={<MainPage />}>
                    <Route path={'/cart'} element={<CartPage />} />
                    <Route path={'item'} element={<ItemPage />}>
                        <Route path={':itemId'} element={<ItemPage />} />
                    </Route>
                </Route>
            </Routes>
        );
    }
}
