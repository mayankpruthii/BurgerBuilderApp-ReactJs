import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../../SideDrawer/DrawerToggle/DrawerToggle'
import Aux from '../../../hoc/Aux'

const toolbar = (props) => (
    <Aux>    
        <header className={'Toolbar'}>
                <DrawerToggle clicked={props.drawerToggleClicked}/>
                <div className={'Logo'}>
                    <Logo  />
                </div>
                <nav className={'DesktopOnly'}>
                    <NavigationItems />
                </nav>
        </header>
    </Aux>
)

export default toolbar;