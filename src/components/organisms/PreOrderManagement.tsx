
import React, { useState } from 'react';
import Button from '../atoms/Button';
import { usePreOrders } from '../../hooks/usePreOrders';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Phone, Mail, MapPin, CreditCard, Package } from 'lucide-react';

const PreOrderManagement = () => {
  const { preOrders, updatePreOrderStatus, deletePreOrder } = usePreOrders();
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState('all');

  const handleStatusUpdate = (id: string, status: string, customerName: string) => {
    updatePreOrderStatus(id, status as any);
    toast({
      title: "Pre-Order Updated",
      description: `Pre-order for ${customerName} marked as ${status}`,
    });
  };

  const handleDelete = (id: string, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete the pre-order for ${customerName}?`)) {
      deletePreOrder(id);
      toast({
        title: "Pre-Order Deleted",
        description: `Pre-order for ${customerName} has been deleted`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'confirmed': return 'bg-blue-500/20 text-blue-400';
      case 'preparing': return 'bg-orange-500/20 text-orange-400';
      case 'ready': return 'bg-purple-500/20 text-purple-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredPreOrders = filterStatus === 'all' 
    ? preOrders 
    : preOrders.filter(order => order.status === filterStatus);

  const statusCounts = preOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif text-white">Pre-Order Management</h2>
        <div className="text-gray-400">
          Total: {preOrders.length} pre-orders
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'].map(status => (
          <Button
            key={status}
            size="sm"
            variant={filterStatus === status ? 'primary' : 'outline'}
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== 'all' && statusCounts[status] && (
              <span className="ml-1 bg-gray-600 text-white px-2 py-1 rounded text-xs">
                {statusCounts[status]}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Pre-Orders List */}
      <div className="space-y-4">
        {filteredPreOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No pre-orders found</p>
            <p>Pre-orders will appear here when customers place them</p>
          </div>
        ) : (
          filteredPreOrders.map((preOrder) => (
            <div key={preOrder.id} className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Pre-Order #{preOrder.id}
                  </h3>
                  <p className="text-gray-400">
                    Placed on {new Date(preOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-400 mb-2">
                    ${preOrder.total.toFixed(2)}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(preOrder.status)}`}>
                    {preOrder.status.charAt(0).toUpperCase() + preOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Customer Information */}
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-white mb-3">Customer Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <User className="w-4 h-4 mr-2" />
                      <span>{preOrder.customerInfo.name}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{preOrder.customerInfo.email}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{preOrder.customerInfo.phone}</span>
                    </div>
                    {preOrder.customerInfo.address && (
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{preOrder.customerInfo.address}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Pickup: {preOrder.customerInfo.pickupDate}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{preOrder.customerInfo.pickupTime}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span>{preOrder.paymentMethod}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-3">Order Items</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {preOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between bg-gray-700 p-3 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{item.name}</p>
                          <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-amber-400 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {preOrder.customerInfo.specialInstructions && (
                <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Special Instructions:</h4>
                  <p className="text-gray-300">{preOrder.customerInfo.specialInstructions}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {preOrder.status === 'pending' && (
                  <>
                    <Button 
                      size="sm" 
                      onClick={() => handleStatusUpdate(preOrder.id!, 'confirmed', preOrder.customerInfo.name)}
                    >
                      Confirm Order
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusUpdate(preOrder.id!, 'cancelled', preOrder.customerInfo.name)}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {preOrder.status === 'confirmed' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusUpdate(preOrder.id!, 'preparing', preOrder.customerInfo.name)}
                  >
                    Start Preparing
                  </Button>
                )}
                {preOrder.status === 'preparing' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusUpdate(preOrder.id!, 'ready', preOrder.customerInfo.name)}
                  >
                    Mark Ready
                  </Button>
                )}
                {preOrder.status === 'ready' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusUpdate(preOrder.id!, 'completed', preOrder.customerInfo.name)}
                  >
                    Mark Completed
                  </Button>
                )}
                {(preOrder.status === 'completed' || preOrder.status === 'cancelled') && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(preOrder.id!, preOrder.customerInfo.name)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PreOrderManagement;
