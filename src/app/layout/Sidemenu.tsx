import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { MenuData } from '../../models/MenuData';
import menuData from '../../data/menu.json'; // Import the JSON file

const SideMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuData[]>([]);

  useEffect(() => {
    setMenuItems(menuData.data);
  }, []);

  return (
    <Menu vertical>
      {menuItems.map((item, index) => (
        <Menu.Item key={index} as={Link} to={item.url} name={item.title} content={item.title} />
      ))}
    </Menu>
  );
};

export default SideMenu;