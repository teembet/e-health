import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IMenuItem, IMenuItemSub } from '../../../interfaces/main-menu';

import classNames from '../../../utils/class-names';

import MenuGroupTitle from './GroupTitle';
import ItemWithSub from './ItemWithSub';
import SimpleItem from './SimpleItem';

import './Menu.scss';

type MenuProps = {
  orientation?: 'vertical' | 'horizontal';
  data?: IMenuItem[];
  children?: any;
  opened?: boolean;
  onCloseSidebar?: () => void;
  className?: string;
};

type RouterProps = {
  location: Location;
};

type Props = (RouterProps & MenuProps) | any;

const haveActive = (sub: IMenuItemSub[], route: string) =>
  !!sub.find((item) => item.routing === route);

const Menu = ({
  data,
  orientation,
  location,
  children,
  className,
  onCloseSidebar,
  opened
}: Props) => {
  const [menu, setMenu] = useState<IMenuItem[]>([]);
  const userRole = useSelector((state: any) => state.login.user.role);
  useEffect(() => {
    setMenu(data);
  }, [data]);

  useEffect(() => {
    const currentRoute = location.pathname.split('/')[2];

    const updatedMenu = data
      ? data.map((item) => {
          if (item.sub) {
            return { ...item, active: haveActive(item.sub, currentRoute) };
          }

          return { ...item, active: item.routing === currentRoute };
        })
      : [];

    setMenu(updatedMenu);
  }, [location, data]);

  useEffect(() => {
    onCloseSidebar && opened && onCloseSidebar();
  }, [location]);

  const handleItemClick = (itemTitle: string) => {
    const updateMenu = [...menu];

    for (let item of updateMenu) {
      if (item.title !== itemTitle) {
        continue;
      }

      item.active = !item.active;
      break;
    }

    setMenu(updateMenu);
  };

  const menuClasses = classNames({
    'main-menu': true,
    horizontal: orientation === 'horizontal'
  });

  const menuItems = menu.map((item: IMenuItem, i: number) => {
    if (item.groupTitle) {
      return <MenuGroupTitle key={i} title={item.title} />;
    }

    if (item.sub) {
      return (
        <ItemWithSub
          key={i}
          layout={orientation}
          sub={item.sub}
          title={item.title}
          location={location}
          opened={item.active}
          onClick={handleItemClick}
        />
      );
    }

    return userRole && item?.allowedRoles.some((r) => userRole.includes(r)) ? (
      <SimpleItem
        key={i}
        icon={item.icon}
        layout={orientation}
        title={item.title}
        routing={item.routing}
      />
    ) : null;
  });

  return (
    <div className={`${menuClasses} ${!!className && className}`}>
      {children}
      {!!menuItems.length && (
        <nav className='main-menu-wrap'>
          <ul className='menu-ul'>{menuItems}</ul>
        </nav>
      )}
    </div>
  );
};

export default withRouter(Menu);
