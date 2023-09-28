import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Typography, Layout, Space } from 'antd';
import { Navbar, Exchange, News, CryptoDetails, Cryptocurrencies, Homepage } from './components';


const App = () => {
    return (
        <div className='app'>

            <div className='navbar'>
                <Navbar />
            </div>

            <div className='main'>

                <Layout>
                    <div className='routes'>
                        <Routes>
                            <Route exact path="/" element={<Homepage />}></Route>
                            <Route exact path="/exchanges" element={<Exchange />} />

                            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />

                            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />

                            <Route exact path="/news" element={<News />} />
                        </Routes>
                    </div>

                </Layout>


                <div className='footer'>
                    <Typography.Title level={5} style={{ color: 'White', textAlign: 'center' }}>
                        Crypto ,<br />
                        All rights reversed
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/exchanges">Exchange</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default App