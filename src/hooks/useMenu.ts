
import { useState, useEffect } from 'react';
import { menuService, MenuItem } from '../services/menuService';

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const unsubscribe = menuService.subscribe(setMenuItems);
    return unsubscribe;
  }, []);

  return {
    menuItems,
    addMenuItem: menuService.addMenuItem.bind(menuService),
    updateMenuItem: menuService.updateMenuItem.bind(menuService),
    deleteMenuItem: menuService.deleteMenuItem.bind(menuService)
  };
};
