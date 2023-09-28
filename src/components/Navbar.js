import React,{ useEffect , useState} from 'react';
import { Button, Menu, Avatar, Typography } from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';
import MenuItem from 'antd/es/menu/MenuItem';


const MenuList = ({icon,label,link})=>{
    return(
        <MenuItem className='bg' icon={icon}>
            <Link to={link}>{label}</Link>
        </MenuItem>
    );
}

const Navbar = () => {

    const [activeMenu,setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize',handleResize);
        handleResize();

        return () => window.removeEventListener('resize',handleResize);
    },[]);

    useEffect(() => {
        if(screenSize < 768)
        {
            setActiveMenu(false);
        }
        else
        {
            setActiveMenu(true);
        }
    },[screenSize]);


  return (
    <div className='nav-container'>

        <div className='logo-container'>

            <Avatar src={icon} size='large'  />

            <Typography.Title level={2} className='logo'>

                <Link to="/">Crypto</Link>

            </Typography.Title>
            <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)}>
                <MenuOutlined/>
            </Button>
        </div >

        {(activeMenu && (
            <Menu theme="dark">
                <MenuList icon={<HomeOutlined />} label={'Home'} link={'/'} />

                <MenuList icon={<FundOutlined />} label={'Cryptocurriences'} link={'/cryptocurrencies'} />

                <MenuList icon={<MoneyCollectOutlined />} label={'Exchanges'} link={'/exchanges'} />
                
                <MenuList icon={<BulbOutlined />} label={'News'} link={'/news'} />
            </Menu>
        ))
        }


    </div>
  )
}

export default Navbar;