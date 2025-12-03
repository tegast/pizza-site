import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Star, X, Plus, Minus, ChevronRight, Flame, Leaf, 
  Search, Clock, Phone, Info, MapPin, Gift, FileText, Shield, 
  Moon, Sun, CreditCard, Banknote, Smartphone, CheckCircle, Truck, Package 
} from 'lucide-react';

// --- Данные (Mock Data) ---
const CATEGORIES = [
  { id: 'all', name: 'Все' },
  { id: 'meat', name: 'Мясные' },
  { id: 'cheese', name: 'Сырные' },
  { id: 'veggie', name: 'Вегетарианские' },
  { id: 'spicy', name: 'Острые' },
  { id: 'snacks', name: 'Закуски' },
  { id: 'drinks', name: 'Напитки' },
  { id: 'desserts', name: 'Десерты' },
];

const PRODUCTS = [
  // ПИЦЦЫ
  {
    id: 1,
    name: 'Пепперони Фреш',
    description: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус.',
    price: 490,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    category: 'meat',
    rating: 4.8,
    tags: ['hit'],
    calories: '280 ккал',
    type: 'pizza'
  },
  {
    id: 2,
    name: 'Сырный Цыпленок',
    description: 'Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    category: 'meat',
    rating: 4.7,
    tags: [],
    calories: '260 ккал',
    type: 'pizza'
  },
  {
    id: 3,
    name: 'Четыре Сыра',
    description: 'Сыр блю чиз, смесь сыров чеддер и пармезан, моцарелла и фирменный соус альфредо.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    category: 'cheese',
    rating: 4.9,
    tags: ['new'],
    calories: '310 ккал',
    type: 'pizza'
  },
  {
    id: 4,
    name: 'Овощная Микс',
    description: 'Сладкий перец, шампиньоны, красный лук, томаты, брынза, моцарелла, итальянские травы.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    category: 'veggie',
    rating: 4.6,
    tags: ['vegan'],
    calories: '210 ккал',
    type: 'pizza'
  },
  {
    id: 5,
    name: 'Дьябло',
    description: 'Острая чоризо, халапеньо, соус барбекю, митболы из говядины, томаты, моцарелла, чили перец.',
    price: 590,
    image: 'https://bonapizza.ru/wp-content/uploads/2023/07/16001200-1.jpg', 
    category: 'spicy',
    rating: 4.9,
    tags: ['hot'],
    calories: '295 ккал',
    type: 'pizza'
  },
  {
    id: 6,
    name: 'Маргарита Гурмэ',
    description: 'Увеличенная порция моцареллы, томаты, итальянские травы, фирменный томатный соус.',
    price: 390,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    category: 'cheese',
    rating: 4.5,
    tags: [],
    calories: '230 ккал',
    type: 'pizza'
  },
  // ЗАКУСКИ
  {
    id: 7,
    name: 'Куриные Крылышки',
    description: 'Сочные куриные крылышки в панировке со специями. Подаются с соусом барбекю.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    category: 'snacks',
    rating: 4.8,
    tags: ['hit'],
    calories: '320 ккал',
    type: 'snack'
  },
  {
    id: 8,
    name: 'Картофель Фри',
    description: 'Золотистый картофель фри, обжаренный до хрустящей корочки. Идеальная закуска.',
    price: 190,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80',
    category: 'snacks',
    rating: 4.6,
    tags: [],
    calories: '280 ккал',
    type: 'snack'
  },
  // НАПИТКИ
  {
    id: 9,
    name: 'Кола Классик',
    description: 'Освежающий газированный напиток. Классический вкус, знакомый каждому.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
    rating: 4.9,
    tags: [],
    calories: '42 ккал',
    type: 'drink'
  },
  {
    id: 10,
    name: 'Лимонад Домашний',
    description: 'Натуральный лимонад из свежих лимонов с добавлением мяты и льда.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category: 'drinks',
    rating: 4.7,
    tags: ['new'],
    calories: '45 ккал',
    type: 'drink'
  },
  // ДЕСЕРТЫ
  {
    id: 11,
    name: 'Чизкейк Нью-Йорк',
    description: 'Классический чизкейк с нежной текстурой и сливочным вкусом на песочной основе.',
    price: 290,
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
    rating: 4.9,
    tags: ['hit'],
    calories: '350 ккал',
    type: 'dessert'
  },
  {
    id: 12,
    name: 'Шоколадный Брауни',
    description: 'Насыщенный шоколадный десерт с грецким орехом и влажной текстурой.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
    rating: 4.8,
    tags: ['vegan'],
    calories: '380 ккал',
    type: 'dessert'
  },
];

const PIZZA_SIZES = [
  { id: 'small', name: '25 см', priceMod: 0 },
  { id: 'medium', name: '30 см', priceMod: 150 },
  { id: 'large', name: '35 см', priceMod: 300 },
];

const PIZZA_DOUGHS = [
  { id: 'traditional', name: 'Традиционное' },
  { id: 'thin', name: 'Тонкое' },
];

const STANDARD_SIZE = { id: 'std', name: 'Стандарт', priceMod: 0 };
const STANDARD_DOUGH = { id: 'std', name: 'Стандарт' };

// --- Компоненты ---

const TagBadge = ({ type }) => {
  const styles = {
    hit: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    new: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    hot: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    vegan: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  };
  
  const labels = {
    hit: 'ХИТ',
    new: 'НОВИНКА',
    hot: 'ОСТРОЕ',
    vegan: 'VEGAN',
  };

  const icons = {
    hit: <Flame size={12} className="mr-1" />,
    new: <Star size={12} className="mr-1" />,
    hot: <Flame size={12} className="mr-1" />,
    vegan: <Leaf size={12} className="mr-1" />,
  };

  if (!styles[type]) return null;

  return (
    <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-sm ${styles[type]}`}>
      {icons[type]} {labels[type]}
    </span>
  );
};

// Модальное окно с информацией
const InfoModal = ({ isOpen, onClose, title, icon: Icon, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 relative z-10 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <X size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            {Icon ? <Icon size={20} /> : <Info size={20} />}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="text-gray-600 dark:text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          {children}
        </div>
        <button onClick={onClose} className="w-full mt-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-bold transition-colors">
          Понятно
        </button>
      </div>
    </div>
  );
};

// Форма оплаты
const PaymentForm = ({ total, onPay, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      onPay();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Оформление заказа</h2>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6 overflow-y-auto px-1">
        
        {/* Данные клиента */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Адрес доставки</h3>
          <input required placeholder="Улица, дом, квартира" className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          <div className="grid grid-cols-2 gap-4">
             <input required placeholder="Подъезд" className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
             <input required placeholder="Этаж" className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          </div>
          <input required placeholder="Телефон" type="tel" className="w-full p-4 bg-gray-50 dark:bg-gray-700 border-none rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
        </div>

        {/* Способ оплаты */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Способ оплаты</h3>
          <div className="grid grid-cols-3 gap-2">
            <button 
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'border-transparent bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
            >
              <CreditCard size={24} />
              <span className="text-xs font-bold">Картой</span>
            </button>
            <button 
              type="button"
              onClick={() => setPaymentMethod('apple')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'apple' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'border-transparent bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
            >
              <Smartphone size={24} />
              <span className="text-xs font-bold">Pay</span>
            </button>
            <button 
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'border-transparent bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
            >
              <Banknote size={24} />
              <span className="text-xs font-bold">Наличные</span>
            </button>
          </div>
        </div>

        {/* Инфо о карте (если выбрана) */}
        {paymentMethod === 'card' && (
           <div className="animate-[fadeIn_0.3s_ease-out] bg-gray-50 dark:bg-gray-700 p-4 rounded-xl space-y-3">
              <input required placeholder="Номер карты" className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="MM/YY" className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white outline-none" />
                <input required placeholder="CVC" type="password" maxLength="3" className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white outline-none" />
              </div>
           </div>
        )}

        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
             <span className="text-lg font-bold text-gray-900 dark:text-white">К оплате</span>
             <span className="text-2xl font-extrabold text-orange-500">{total} ₽</span>
          </div>
          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-200 dark:hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Обработка...' : `Оплатить заказ`}
          </button>
        </div>
      </form>
    </div>
  );
};

// Трекер заказа
const OrderTracker = ({ onClose }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Симуляция прогресса
    const timers = [
      setTimeout(() => setStep(2), 2000), // Готовим
      setTimeout(() => setStep(3), 6000), // Курьер
      setTimeout(() => setStep(4), 10000), // Доставлено
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { id: 1, label: 'Заказ принят', icon: FileText, desc: 'Мы получили ваш заказ' },
    { id: 2, label: 'Готовим', icon: Flame, desc: 'Шеф раскатывает тесто' },
    { id: 3, label: 'В пути', icon: Truck, desc: 'Курьер спешит к вам' },
    { id: 4, label: 'Доставлено', icon: CheckCircle, desc: 'Приятного аппетита!' },
  ];

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center">
      <div className="text-center mb-8 animate-[fadeIn_0.5s]">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
           <Package size={40} />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Заказ №394</h2>
        <p className="text-gray-500 dark:text-gray-400">Привезем примерно через 35 минут</p>
      </div>

      <div className="w-full max-w-sm space-y-6">
        {steps.map((s, idx) => {
          const isActive = step >= s.id;
          const isCurrent = step === s.id;
          
          return (
            <div key={s.id} className={`flex gap-4 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className="relative flex flex-col items-center">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${isActive ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
                    <s.icon size={20} />
                 </div>
                 {idx !== steps.length - 1 && (
                   <div className={`absolute top-10 w-0.5 h-10 -mb-4 transition-colors duration-500 ${step > s.id ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                 )}
              </div>
              <div className="pt-1">
                <h4 className={`font-bold text-lg leading-none mb-1 transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{s.label}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-500">{s.desc}</p>
                {isCurrent && s.id !== 4 && <span className="text-xs text-orange-500 font-bold animate-pulse">В процессе...</span>}
              </div>
            </div>
          )
        })}
      </div>

      {step === 4 && (
        <button 
          onClick={onClose}
          className="mt-12 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          Сделать новый заказ
        </button>
      )}
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeInfoModal, setActiveInfoModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Состояния оформления заказа
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, payment, tracker

  const [currentSize, setCurrentSize] = useState(PIZZA_SIZES[1]); 
  const [currentDough, setCurrentDough] = useState(PIZZA_DOUGHS[0]);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Логика ---

  const openProductModal = (product) => {
    setSelectedProduct(product);
    if (product.type === 'pizza') {
      setCurrentSize(PIZZA_SIZES[1]);
      setCurrentDough(PIZZA_DOUGHS[0]);
    } else {
      setCurrentSize(STANDARD_SIZE);
      setCurrentDough(STANDARD_DOUGH);
    }
  };

  const closeProductModal = () => setSelectedProduct(null);

  const addToCart = () => {
    if (!selectedProduct) return;
    const finalPrice = selectedProduct.price + currentSize.priceMod;
    const newItem = {
      id: `${selectedProduct.id}-${currentSize.id}-${currentDough.id}`,
      product: selectedProduct,
      size: currentSize,
      dough: currentDough,
      price: finalPrice,
      totalPrice: finalPrice,
      quantity: 1
    };

    setCart(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price } : item);
      }
      return [...prev, newItem];
    });
    closeProductModal();
    setCheckoutStep('cart');
    setIsCartOpen(true); 
  };

  const updateCartQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty, totalPrice: newQty * item.price };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaymentSuccess = () => {
    setCart([]); // Очистка корзины
    setCheckoutStep('tracker');
  };

  const closeCartDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => setCheckoutStep('cart'), 500); // Сброс состояния после закрытия
  };

  // --- UI ---

  return (
    // Обертка для темной темы
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans selection:bg-orange-200 dark:selection:bg-orange-900 transition-colors duration-300">
        
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveCategory('all')}>
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/30">C</div>
                <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Crostini</span>
              </div>

              <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                <button onClick={() => setActiveInfoModal('promo')} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Акции</button>
                <button onClick={() => setActiveInfoModal('about')} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">О нас</button>
                <button onClick={scrollToFooter} className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Контакты</button>
              </nav>

              <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Cart Trigger */}
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative group bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white text-gray-600 dark:text-gray-300 transition-all duration-300 p-2.5 rounded-full"
                >
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-gray-50 dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 flex flex-col justify-center h-full pt-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
              <main className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Идеальная пицца</span>{' '}
                    <span className="block text-orange-500 xl:inline">уже в пути</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Мы используем только итальянскую муку, свежую моцареллу и сочные томаты. Доставка за 45 минут или пицца бесплатно.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a href="#menu" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-orange-500/30">
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-50 dark:bg-gray-900">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80"
              alt="Pizza"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/50 to-transparent lg:via-gray-50/20 dark:from-gray-900 dark:via-gray-900/50 dark:to-transparent"></div>
          </div>
        </section>

        {/* CATEGORY NAV */}
        <div id="menu" className="sticky top-16 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 py-4 shadow-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 transform ${
                    activeCategory === cat.id
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MENU GRID */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            {CATEGORIES.find(c => c.id === activeCategory)?.name}
            <span className="text-gray-400 dark:text-gray-500 text-sm font-normal ml-2">{filteredProducts.length} позиций</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-black/30 transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700 flex flex-col"
                onClick={() => openProductModal(product)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                     {product.tags.map(tag => <TagBadge key={tag} type={tag} />)}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center shadow-sm text-gray-900 dark:text-white">
                    <Star size={12} className="text-orange-400 fill-orange-400 mr-1" />
                    {product.rating}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-gray-700">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">от {product.price} ₽</div>
                    <button 
                      className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* FOOTER */}
        <footer id="footer" className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20 pb-10 pt-16 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                  <span className="font-bold text-xl text-gray-900 dark:text-white">Crostini</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Вкусно. Быстро. С любовью.<br/>Доставляем счастье в коробках.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Меню</h4>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><button onClick={() => { setActiveCategory('all'); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-orange-500 dark:hover:text-orange-400">Все меню</button></li>
                  <li><button onClick={() => { setActiveCategory('snacks'); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-orange-500 dark:hover:text-orange-400">Закуски</button></li>
                  <li><button onClick={() => { setActiveCategory('drinks'); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-orange-500 dark:hover:text-orange-400">Напитки</button></li>
                  <li><button onClick={() => { setActiveCategory('desserts'); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }} className="hover:text-orange-500 dark:hover:text-orange-400">Десерты</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Помощь</h4>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><button onClick={() => setActiveInfoModal('delivery')} className="hover:text-orange-500 dark:hover:text-orange-400">Зоны доставки</button></li>
                  <li><button onClick={() => setActiveInfoModal('promo')} className="hover:text-orange-500 dark:hover:text-orange-400">Акции</button></li>
                  <li><button onClick={() => setActiveInfoModal('about')} className="hover:text-orange-500 dark:hover:text-orange-400">О компании</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Контакты</h4>
                <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <li className="flex items-center gap-2"><Phone size={16}/> 8 (800) 555-35-35</li>
                  <li className="flex items-center gap-2"><Clock size={16}/> Ежедневно: 10:00 - 23:00</li>
                  <li className="flex items-center gap-2"><MapPin size={16}/> ул. Вкусная, д. 1</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-500">
              <p>© 2024 Crostini Pizza. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button onClick={() => setActiveInfoModal('policy')} className="hover:text-gray-600 dark:hover:text-gray-300">Политика конфиденциальности</button>
                <button onClick={() => setActiveInfoModal('terms')} className="hover:text-gray-600 dark:hover:text-gray-300">Условия</button>
              </div>
            </div>
          </div>
        </footer>

        {/* --- MODALS & DRAWERS --- */}

        {/* Info Modals */}
        <InfoModal 
          isOpen={activeInfoModal === 'promo'} 
          onClose={() => setActiveInfoModal(null)} 
          title="Акции и Скидки"
          icon={Gift}
        >
          <p className="mb-4">🔥 <strong>2+1 на все пиццы!</strong><br/>Закажите две большие пиццы и получите третью (Маргариту) в подарок. Действует по будням с 12:00 до 16:00.</p>
          <p className="mb-4">🎂 <strong>Скидка именинникам 20%</strong><br/>Действует за 3 дня до и 3 дня после дня рождения при предъявлении документа курьеру.</p>
          <p>🥤 <strong>Напиток в подарок</strong><br/>При заказе от 1500 рублей - 1л Колы в подарок!</p>
        </InfoModal>

        <InfoModal 
          isOpen={activeInfoModal === 'about'} 
          onClose={() => setActiveInfoModal(null)} 
          title="О компании Crostini"
          icon={Info}
        >
          <p className="mb-4">Мы готовим пиццу с 2010 года. Наш секрет прост: тесто, которое созревает 72 часа, настоящая моцарелла и любовь к своему делу.</p>
          <p>Наша миссия — доставлять горячую пиццу быстрее, чем вы успеете проголодаться. Мы используем только свежие продукты от проверенных поставщиков.</p>
        </InfoModal>

        <InfoModal 
          isOpen={activeInfoModal === 'delivery'} 
          onClose={() => setActiveInfoModal(null)} 
          title="Зоны доставки"
          icon={MapPin}
        >
          <div className="space-y-3">
            <div className="flex justify-between border-b dark:border-gray-700 pb-2">
              <span className="font-bold">Зеленая зона</span>
              <span>до 30 мин (бесплатно)</span>
            </div>
            <div className="flex justify-between border-b dark:border-gray-700 pb-2">
              <span className="font-bold">Желтая зона</span>
              <span>до 60 мин (бесплатно от 800₽)</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Красная зона</span>
              <span>до 90 мин (доставка 200₽)</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Точное время доставки рассчитывается оператором при подтверждении заказа.</p>
        </InfoModal>

        <InfoModal 
          isOpen={activeInfoModal === 'policy'} 
          onClose={() => setActiveInfoModal(null)} 
          title="Политика конфиденциальности"
          icon={Shield}
        >
          <p className="text-sm">Мы серьезно относимся к защите ваших персональных данных. Собираем только необходимую информацию для выполнения заказа (имя, телефон, адрес).</p>
          <p className="mt-2 text-sm">Мы не передаем ваши данные третьим лицам, за исключением случаев, предусмотренных законом, и служб доставки, непосредственно выполняющих заказ.</p>
        </InfoModal>

        <InfoModal 
          isOpen={activeInfoModal === 'terms'} 
          onClose={() => setActiveInfoModal(null)} 
          title="Условия использования"
          icon={FileText}
        >
          <p className="text-sm">Оформляя заказ на сайте, вы соглашаетесь с публичной офертой. Фотографии блюд могут незначительно отличаться от реального вида продукта.</p>
          <p className="mt-2 text-sm">Возврат денежных средств за некачественный товар осуществляется в течение 10 рабочих дней после проведения экспертизы.</p>
        </InfoModal>

        {/* Product Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
              onClick={closeProductModal}
            ></div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
              <button 
                onClick={closeProductModal}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-gray-700/80 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <X size={24} className="text-gray-500 dark:text-gray-300" />
              </button>
              
              {/* Image Side */}
              <div className="w-full md:w-3/5 h-64 md:h-auto bg-gray-50 dark:bg-gray-900 relative flex items-center justify-center p-8 transition-colors">
                 <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className={`max-w-full max-h-full object-contain drop-shadow-2xl ${selectedProduct.type === 'pizza' ? 'animate-[spinSlow_60s_linear_infinite]' : ''}`}
                 />
                 <div className="absolute bottom-4 left-4">
                   {selectedProduct.tags.map(tag => <div key={tag} className="mb-2"><TagBadge type={tag} /></div>)}
                 </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col h-full bg-white dark:bg-gray-800 transition-colors">
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <span>{selectedProduct.calories}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-orange-500 font-medium">
                      <Star size={14} fill="currentColor" /> {selectedProduct.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">{selectedProduct.description}</p>
                  
                  {/* Selectors - Only show for Pizza */}
                  {selectedProduct.type === 'pizza' && (
                    <>
                      <div className="mb-4">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">Размер</label>
                        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex">
                          {PIZZA_SIZES.map(size => (
                            <button
                              key={size.id}
                              onClick={() => setCurrentSize(size)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                currentSize.id === size.id ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                              }`}
                            >
                              {size.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">Тесто</label>
                        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl flex">
                          {PIZZA_DOUGHS.map(dough => (
                            <button
                              key={dough.id}
                              onClick={() => setCurrentDough(dough)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                currentDough.id === dough.id ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                              }`}
                            >
                              {dough.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action */}
                <button 
                  onClick={addToCart}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-200 dark:hover:shadow-none transition-all transform active:scale-95 flex items-center justify-between px-6"
                >
                  <span>В корзину</span>
                  <span>{selectedProduct.price + currentSize.priceMod} ₽</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart & Checkout Drawer */}
        <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
          <div 
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeCartDrawer}
          ></div>

          <div className={`relative w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl flex flex-col h-full transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            {/* Conditional Rendering for Drawer Content */}
            {checkoutStep === 'cart' && (
              <>
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between z-10">
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                    Корзина <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-2 py-1 rounded-full">{cartCount}</span>
                  </h2>
                  <button onClick={closeCartDrawer} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400 dark:text-gray-500">
                      <ShoppingBag size={64} className="opacity-20" />
                      <p className="text-lg font-medium">Ваша корзина пуста</p>
                      <button onClick={closeCartDrawer} className="mt-4 text-orange-500 font-bold hover:underline">Перейти в меню</button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex gap-4 animate-[fadeInRight_0.3s_ease-out]">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100 dark:bg-gray-700" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.product.name}</h4>
                            <p className="font-bold text-gray-900 dark:text-white text-sm">{item.totalPrice} ₽</p>
                          </div>
                          {item.product.type === 'pizza' && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                              {item.size.name}, {item.dough.name.toLowerCase()} тесто
                            </p>
                          )}
                          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 w-max rounded-lg p-1">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors shadow-sm text-gray-600 dark:text-gray-300">
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded-md transition-colors shadow-sm text-gray-600 dark:text-gray-300">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex justify-between items-center mb-4 text-gray-500 dark:text-gray-400 text-sm">
                      <span>Доставка</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">Бесплатно</span>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Итого</span>
                      <span className="text-2xl font-extrabold text-orange-500">{cartTotal} ₽</span>
                    </div>
                    <button 
                      onClick={() => setCheckoutStep('payment')}
                      className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-200 dark:hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      Оформить заказ <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'payment' && (
              <PaymentForm 
                total={cartTotal} 
                onPay={handlePaymentSuccess} 
                onCancel={() => setCheckoutStep('cart')} 
              />
            )}

            {checkoutStep === 'tracker' && (
              <OrderTracker onClose={closeCartDrawer} />
            )}

          </div>
        </div>
        
        <style>{`
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}