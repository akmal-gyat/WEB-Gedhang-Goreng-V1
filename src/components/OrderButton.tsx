import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Check, MessageSquare, Plus, Minus } from 'lucide-react';

interface OrderButtonProps {
  className?: string;
}

export default function OrderButton({ className = "" }: OrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [boxSize, setBoxSize] = useState<'solo' | 'share' | 'party'>('solo');
  const [chocolateQty, setChocolateQty] = useState(1);
  const [matchaQty, setMatchaQty] = useState(0);
  const [strawberryQty, setStrawberryQty] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  const totalQty = chocolateQty + matchaQty + strawberryQty;
  
  // Package pricing
  const prices = {
    solo: 35000,
    share: 65000,
    party: 95000
  };

  const getPrice = () => {
    return prices[boxSize];
  };

  const increment = (flavor: 'chocolate' | 'matcha' | 'strawberry') => {
    if (flavor === 'chocolate') setChocolateQty(prev => prev + 1);
    if (flavor === 'matcha') setMatchaQty(prev => prev + 1);
    if (flavor === 'strawberry') setStrawberryQty(prev => prev + 1);
  };

  const decrement = (flavor: 'chocolate' | 'matcha' | 'strawberry') => {
    if (flavor === 'chocolate') setChocolateQty(prev => Math.max(0, prev - 1));
    if (flavor === 'matcha') setMatchaQty(prev => Math.max(0, prev - 1));
    if (flavor === 'strawberry') setStrawberryQty(prev => Math.max(0, prev - 1));
  };

  const handleSendOrder = () => {
    const boxLabels = {
      solo: 'The Solo Box (Single Flavor Heavy-Load)',
      share: 'The Share Platter (Split Box Double Pleasure)',
      party: 'The Party Ultimate (Triple Toppings + Extra Crumbles)'
    };

    const toppingsList: string[] = [];
    if (chocolateQty > 0) toppingsList.push(`Belgian Chocolate (${chocolateQty}x)`);
    if (matchaQty > 0) toppingsList.push(`Kyoto Matcha (${matchaQty}x)`);
    if (strawberryQty > 0) toppingsList.push(`Wild Strawberry (${strawberryQty}x)`);

    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(getPrice());

    const message = `Halo Gedhang Goereng YK! %0A%0ASaya ingin memesan Pisang Crispy Melted Premium:%0A%0A` +
      `📦 *Pilihan Box:* ${boxLabels[boxSize]}%0A` +
      `🔥 *Topping:* ${toppingsList.length > 0 ? toppingsList.join(', ') : 'Default Mixed'}%0A` +
      `💰 *Total Harga:* ${formattedPrice}%0A%0A` +
      `👤 *Nama:* ${customerName || 'Pelanggan Setia'}%0A` +
      `📍 *Alamat Kirim:* ${deliveryAddress || 'Ambil di Outlet Yogyakarta'}%0A` +
      `${specialNotes ? `📝 *Catatan:* ${specialNotes}%0A` : ''}%0A` +
      `Terima kasih! Ditunggu konfirmasinya. ✨🍌`;

    const whatsappUrl = `https://wa.me/6281234567890?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <motion.button
        id="btn-order-wa"
        onClick={() => setIsOpen(true)}
        className={`relative px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest text-white shadow-xl overflow-hidden cursor-pointer active:scale-95 group transition-transform ${className}`}
        style={{
          background: 'linear-gradient(135deg, #4A2E1B 0%, #FFC107 50%, #889E73 100%)',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.4), 0 10px 25px rgba(255,193,7,0.2)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <ShoppingBag className="w-4 h-4 animate-bounce" />
          ORDER VIA WA
        </span>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-xl bg-[#16120A] border-2 border-[#FFC107]/40 rounded-[32px] overflow-hidden text-[#F7EFE5] shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase font-black tracking-widest text-[#FFC107]">Artisanal Snack Order</span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase mt-1 tracking-tight hero-heading">Customize Your Glaze Box</h3>
                <p className="text-xs text-[#E6D5B8] mt-1">Freshly fried crispy bananas, dripping with slow-melted pure artisan glazes.</p>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {/* 1. SELECT PACKAGE */}
                <div>
                  <label className="block text-xs uppercase font-black tracking-wider text-[#E6D5B8] mb-3">1. Select Box Size</label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { id: 'solo', name: 'Solo Box', price: 'Rp 35k', desc: '1 Glaze' },
                      { id: 'share', name: 'Share Platter', price: 'Rp 65k', desc: 'Up to 2 Glazes' },
                      { id: 'party', name: 'Party Pack', price: 'Rp 95k', desc: 'All 3 Glazes' }
                    ].map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setBoxSize(pkg.id as 'solo' | 'share' | 'party')}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                          boxSize === pkg.id 
                            ? 'bg-[#FFC107]/10 border-[#FFC107] text-[#FFC107]' 
                            : 'bg-white/5 border-transparent text-[#E6D5B8] hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs font-black uppercase tracking-tight">{pkg.name}</span>
                        <span className="text-sm font-black mt-1">{pkg.price}</span>
                        <span className="text-[10px] opacity-60 font-light">{pkg.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. CHOOSE TOppings QUANTITY */}
                <div>
                  <label className="block text-xs uppercase font-black tracking-wider text-[#E6D5B8] mb-3">2. Topping Glazes</label>
                  <div className="space-y-3">
                    {/* Chocolate */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">🍫 Signature Chocolate</h4>
                        <p className="text-[11px] text-[#E6D5B8] opacity-80">Thick, rich melted Belgian glaze</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => decrement('chocolate')} className="p-1 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#0F0C07] transition-all cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="font-mono font-black text-sm w-4 text-center">{chocolateQty}</span>
                        <button onClick={() => increment('chocolate')} className="p-1 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#0F0C07] transition-all cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    {/* Matcha */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">🍵 Kyoto Matcha</h4>
                        <p className="text-[11px] text-[#E6D5B8] opacity-80">Earthy organic Japanese matcha</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => decrement('matcha')} className="p-1 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#0F0C07] transition-all cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="font-mono font-black text-sm w-4 text-center">{matchaQty}</span>
                        <button onClick={() => increment('matcha')} className="p-1 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#0F0C07] transition-all cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    {/* Strawberry */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">🍓 Wild Strawberry</h4>
                        <p className="text-[11px] text-[#E6D5B8] opacity-80">Sweet, tangy fresh pink berry melt</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => decrement('strawberry')} className="p-1 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#0F0C07] transition-all cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="font-mono font-black text-sm w-4 text-center">{strawberryQty}</span>
                        <button onClick={() => increment('strawberry')} className="p-1 rounded-lg bg-white/10 hover:bg-[#FFC107] hover:text-[#0F0C07] transition-all cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CUSTOMER DETAILS */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase font-black tracking-wider text-[#E6D5B8]">3. Delivery & Details</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name / Nama Anda"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FFC107] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Delivery Address / Alamat Pengiriman (or write 'Ambil di Outlet')"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FFC107] transition-colors text-sm resize-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Special request (e.g., Extra Almond Crumble, Less Sweet)"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FFC107] transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Total & Submit */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] text-[#E6D5B8]/60 uppercase tracking-widest font-bold">Estimated Total</span>
                  <div className="text-2xl font-black text-[#FFC107]">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(getPrice())}
                  </div>
                </div>

                <button
                  onClick={handleSendOrder}
                  className="w-full sm:w-auto px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  Order on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
