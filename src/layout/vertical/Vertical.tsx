import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

import BaseLayout from '../base/BaseLayout';

import Logo from '../components/logo/Logo';
import Navbar from '../components/navbar/Navbar';
import LogoSvg from './../../assets/img/logo.svg';

import Menu from '../components/menu/Menu';
import Search from '../components/search/Search';
import NavLoader from '../components/navbar/NavLoader';
import AddPatient from '../components/patients/AddPatient';

import Actions from '../components/actions/Actions';
import { toggleSidebar } from '../../redux/settings/actions';

import { useSearchData } from '../../hooks/useSearchData';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '../../interfaces/app-state';

import './Vertical.scss';
import { AppState } from '../../redux/store';

type Props = {
  children: any;
};

const VerticalLayout = ({ children }: Props) => {
  const dispatch = useDispatch();

  const settings = useSelector((state: IAppState) => state.settings);
  const pageData = useSelector((state: IAppState) => state.pageData);

  const searchData = useSearchData();

  const onSidebarToggle = () => dispatch(toggleSidebar());

  const [menuData, setMenuData] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const user = useSelector((state: AppState) => state.login['user']);

  useEffect(() => {
    if (
      (user && user['role'] === 'Doctor') ||
      (user && user['role'] === 'Nurse') ||
      (user && user['role'] === 'RecordAdmin')
    ) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
    async function fetchMenuData() {
      const result = await axios('/data/menu.json');
      setMenuData(result.data);
    }

    fetchMenuData().catch((err) => console.log('Server Error', err));
  });

  if (!user) {
    return <Redirect to='/public/sign-in' />;
  }

  const nav = (
    <Navbar
      boxed={settings.boxed}
      color={settings.topbarColor}
      background={settings.topbarBg}
      orientation='horizontal'
    >
      <button className='no-style navbar-toggle d-lg-none' onClick={onSidebarToggle}>
        <span />
        <span />
        <span />
      </button>

      {/* <Search layout='vertical' data={searchData} /> */}

      <Actions />

      <NavLoader loaded={pageData.loaded} type={'top-bar'} />
    </Navbar>
  );

  const sideNav = (
    <Navbar
      onClickOutside={onSidebarToggle}
      opened={settings.sidebarOpened}
      color={settings.sidebarColor}
      background={settings.sidebarBg}
      orientation='vertical'
    >
      {/* <Logo src={LogoSvg} /> */}

      <Menu
        onCloseSidebar={onSidebarToggle}
        opened={settings.sidebarOpened}
        orientation='vertical'
        data={menuData}
      />

      {allowed && <AddPatient />}

      <Menu className='assistant-menu' orientation='vertical'>
        <NavLink className='link' to='/vertical/settings' activeClassName='active' replace>
          <span className='link-icon icofont icofont-ui-settings' />

          <span className='link-text'>Settings</span>
        </NavLink>

        <NavLink className='link' to='/vertical/default-dashboard' activeClassName='active' replace>
          <span className='link-icon icofont icofont-question-square' />

          <span className='link-text'>FAQ & Support</span>
        </NavLink>

        {}
      </Menu>

      <NavLoader loaded={pageData.loaded} type={'nav-bar'} />
    </Navbar>
  );

  return (
    <>
      <BaseLayout orientation='vertical' nav={nav} sideNav={sideNav}>
        {children}
      </BaseLayout>
    </>
  );
};

export default VerticalLayout;
