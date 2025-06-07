
import { useState, useEffect } from 'react';
import { preOrderService, PreOrder } from '../services/preOrderService';

export const usePreOrders = () => {
  const [preOrders, setPreOrders] = useState<PreOrder[]>([]);

  useEffect(() => {
    console.log('usePreOrders: Setting up subscription');
    const unsubscribe = preOrderService.subscribe((orders) => {
      console.log('usePreOrders: Received pre-orders update:', orders.length);
      setPreOrders(orders);
    });
    return unsubscribe;
  }, []);

  return {
    preOrders,
    updatePreOrderStatus: (id: string, status: PreOrder['status']) => {
      console.log('usePreOrders: Updating pre-order status via hook');
      return preOrderService.updatePreOrderStatus(id, status);
    },
    deletePreOrder: (id: string) => {
      console.log('usePreOrders: Deleting pre-order via hook');
      return preOrderService.deletePreOrder(id);
    }
  };
};
