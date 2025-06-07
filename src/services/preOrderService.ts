
type PreOrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type PreOrder = {
  id?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions: string;
  };
  items: PreOrderItem[];
  total: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
};

type PreOrderSubscriber = (preOrders: PreOrder[]) => void;

class PreOrderService {
  private preOrders: PreOrder[] = [];
  private subscribers: PreOrderSubscriber[] = [];
  private readonly STORAGE_KEY = 'restaurant_pre_orders';

  constructor() {
    this.loadPreOrders();
  }

  private loadPreOrders() {
    try {
      const storedOrders = localStorage.getItem(this.STORAGE_KEY);
      if (storedOrders) {
        this.preOrders = JSON.parse(storedOrders);
        console.log('PreOrderService: Loaded pre-orders from localStorage:', this.preOrders.length);
      } else {
        this.preOrders = [];
        console.log('PreOrderService: Initialized with empty pre-orders array');
      }
    } catch (error) {
      console.error('PreOrderService: Error loading pre-orders from localStorage:', error);
      this.preOrders = [];
    }
  }

  private savePreOrders() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.preOrders));
      console.log('PreOrderService: Saved pre-orders to localStorage:', this.preOrders.length);
    } catch (error) {
      console.error('PreOrderService: Error saving pre-orders to localStorage:', error);
    }
  }

  subscribe(callback: PreOrderSubscriber) {
    console.log('PreOrderService: New subscriber added');
    this.subscribers.push(callback);
    callback([...this.preOrders]);
    
    return () => {
      console.log('PreOrderService: Subscriber removed');
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notifySubscribers() {
    console.log('PreOrderService: Notifying subscribers, total:', this.subscribers.length);
    console.log('PreOrderService: Current pre-orders count:', this.preOrders.length);
    this.subscribers.forEach(callback => callback([...this.preOrders]));
  }

  getPreOrders(): PreOrder[] {
    return [...this.preOrders];
  }

  addPreOrder(preOrder: Omit<PreOrder, 'id'>) {
    const newPreOrder = {
      ...preOrder,
      id: Date.now().toString()
    };
    console.log('PreOrderService: Adding new pre-order:', newPreOrder);
    this.preOrders.unshift(newPreOrder); // Add to beginning for newest first
    this.savePreOrders();
    this.notifySubscribers();
    return newPreOrder;
  }

  updatePreOrderStatus(id: string, status: PreOrder['status']) {
    const index = this.preOrders.findIndex(order => order.id === id);
    if (index !== -1) {
      this.preOrders[index] = { ...this.preOrders[index], status };
      console.log('PreOrderService: Updated pre-order status:', this.preOrders[index]);
      this.savePreOrders();
      this.notifySubscribers();
      return this.preOrders[index];
    }
    return null;
  }

  deletePreOrder(id: string) {
    const beforeLength = this.preOrders.length;
    this.preOrders = this.preOrders.filter(order => order.id !== id);
    console.log('PreOrderService: Deleted pre-order, orders before:', beforeLength, 'after:', this.preOrders.length);
    this.savePreOrders();
    this.notifySubscribers();
  }
}

export const preOrderService = new PreOrderService();
export type { PreOrder, PreOrderItem };
