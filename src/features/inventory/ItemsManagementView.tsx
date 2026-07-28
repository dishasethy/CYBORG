import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, Cpu, Wrench, Zap, Search, Plus, RotateCcw, CheckCircle2, 
  AlertTriangle, User, Calendar, Tag, MapPin, Activity, Layers, 
  Clock, ArrowRight, X, ShieldAlert, Check, Layers2, FileText
} from 'lucide-react';
import { CyborgItem, initialCyborgItems } from '../../config/ItemsView';
import { UserSession } from '../../types';

interface ItemsManagementViewProps {
  session: UserSession;
  onLoginClick?: () => void;
}

export default function ItemsManagementView({ session, onLoginClick }: ItemsManagementViewProps) {
  const [items, setItems] = useState<CyborgItem[]>(initialCyborgItems);
  const [activeSubsystem, setActiveSubsystem] = useState<string>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItemForCheckout, setSelectedItemForCheckout] = useState<CyborgItem | null>(null);
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);
  const [showDeploymentsLog, setShowDeploymentsLog] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  // Checkout Modal state
  const [checkoutQty, setCheckoutQty] = useState<number>(1);
  const [projectPurpose, setProjectPurpose] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('2026-08-10');

  // Add Item Modal state
  const [newItemName, setNewItemName] = useState('');
  const [newItemSubsystem, setNewItemSubsystem] = useState<'mechanical' | 'electronics' | 'autonomous' | 'power' | 'pneumatics'>('electronics');
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);
  const [newItemSpec, setNewItemSpec] = useState('');
  const [newItemLocation, setNewItemLocation] = useState('');

  const triggerToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter items logic
  const filteredItems = items.filter(item => {
    const matchesSubsystem = activeSubsystem === 'all' || item.subsystem === activeSubsystem;
    const matchesStatus = 
      activeStatusFilter === 'all' ||
      (activeStatusFilter === 'available' && item.quantityAvailable > 0) ||
      (activeStatusFilter === 'in_use' && item.status === 'in_use') ||
      (activeStatusFilter === 'maintenance' && item.status === 'maintenance');
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.specification.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesSubsystem && matchesStatus && matchesSearch;
  });

  // Calculate metrics
  const totalItemsCount = items.reduce((acc, curr) => acc + curr.quantityTotal, 0);
  const availableItemsCount = items.reduce((acc, curr) => acc + curr.quantityAvailable, 0);
  const checkedOutItemsCount = totalItemsCount - availableItemsCount;

  // Checkout Handler
  const handleConfirmCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForCheckout) return;

    if (!session.isLoggedIn) {
      triggerToast('AUTHENTICATION REQUIRED: Please sign in to check out items.', 'error');
      if (onLoginClick) onLoginClick();
      return;
    }

    if (checkoutQty <= 0 || checkoutQty > selectedItemForCheckout.quantityAvailable) {
      triggerToast(`INVALID QUANTITY: Max available is ${selectedItemForCheckout.quantityAvailable}`, 'error');
      return;
    }

    if (!projectPurpose.trim()) {
      triggerToast('REQUIRED FIELD: State project purpose for tracking.', 'error');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    const updatedItems = items.map(item => {
      if (item.id === selectedItemForCheckout.id) {
        const newAvailable = item.quantityAvailable - checkoutQty;
        const newCheckedOutRecord = {
          operatorName: session.name || 'Anonymous Operator',
          operatorRoll: session.rollNumber || 'UNKNOWN',
          quantity: checkoutQty,
          projectPurpose,
          checkedOutAt: todayStr,
          expectedReturnAt: returnDate || '2026-08-15'
        };

        return {
          ...item,
          quantityAvailable: newAvailable,
          status: newAvailable === 0 ? ('in_use' as const) : ('available' as const),
          checkedOutBy: [...(item.checkedOutBy || []), newCheckedOutRecord]
        };
      }
      return item;
    });

    setItems(updatedItems);
    triggerToast(`SUCCESS: Checkout of ${checkoutQty}x ${selectedItemForCheckout.name} confirmed.`, 'success');
    setSelectedItemForCheckout(null);
    setProjectPurpose('');
    setCheckoutQty(1);
  };

  // Return Item Handler
  const handleReturnItem = (itemId: string, checkoutIndex: number) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId && item.checkedOutBy) {
        const recordToReturn = item.checkedOutBy[checkoutIndex];
        const restoredQty = recordToReturn ? recordToReturn.quantity : 1;
        const updatedCheckedOutList = item.checkedOutBy.filter((_, idx) => idx !== checkoutIndex);
        const newAvailable = item.quantityAvailable + restoredQty;

        return {
          ...item,
          quantityAvailable: Math.min(item.quantityTotal, newAvailable),
          status: (newAvailable > 0 ? 'available' : 'in_use') as 'available' | 'in_use',
          checkedOutBy: updatedCheckedOutList
        };
      }
      return item;
    });

    setItems(updatedItems);
    triggerToast('SUCCESS: Item successfully returned to inventory.', 'info');
  };

  // Add Item Handler
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemCategory.trim() || !newItemLocation.trim()) {
      triggerToast('MISSING METADATA: Fill in name, category, and location bin.', 'error');
      return;
    }

    const newItem: CyborgItem = {
      id: `ITEM-CUSTOM-${Date.now().toString().slice(-4)}`,
      name: newItemName,
      subsystem: newItemSubsystem,
      category: newItemCategory,
      quantityTotal: Number(newItemQty),
      quantityAvailable: Number(newItemQty),
      status: 'available',
      location: newItemLocation,
      specification: newItemSpec || 'Standard Cyborg Component Specification',
      checkedOutBy: []
    };

    setItems([newItem, ...items]);
    setShowAddItemModal(false);
    triggerToast(`NEW COMPONENT LOGGED: ${newItemName} added to ${newItemSubsystem.toUpperCase()} rack.`, 'success');

    // Reset
    setNewItemName('');
    setNewItemCategory('');
    setNewItemSpec('');
    setNewItemLocation('');
    setNewItemQty(1);
  };

  return (
    <div className="space-y-10">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 max-w-md"
          >
            <div className={`p-4 rounded-2xl neo-card flex items-center gap-3 border shadow-2xl backdrop-blur-xl ${
              toastMessage.type === 'success' ? 'border-[#00F2FF]/60 bg-[#00F2FF]/10 text-[#00F2FF]' :
              toastMessage.type === 'info' ? 'border-emerald-500/60 bg-emerald-950/80 text-emerald-300' :
              'border-rose-500/60 bg-rose-950/80 text-rose-300'
            }`}>
              <Activity className="w-5 h-5 shrink-0 animate-pulse" />
              <span className="font-mono text-xs uppercase font-semibold">{toastMessage.text}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header & Metrics Banner */}
      <section id="inventory-header-panel" className="neo-card rounded-3xl p-6 md:p-8 border border-[#00F2FF]/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-[#494551]/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Box className="w-5 h-5 text-[#00F2FF]" />
              <span className="font-mono text-[10px] text-[#00F2FF] tracking-widest uppercase font-bold">
                TEAM CYBORG HARDWARE INVENTORY & TELEMETRY
              </span>
            </div>
            <h2 className="font-cyber text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
              Subsystem Items Management
            </h2>
            <p className="font-mono text-xs text-[#cac4d2] mt-1">
              Live component tracking across Mechanical, Electronics, Autonomous, Power & Pneumatics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Deployments Log Button */}
            <button
              onClick={() => setShowDeploymentsLog(!showDeploymentsLog)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase transition-all flex items-center gap-2 neo-btn ${
                showDeploymentsLog ? 'neo-tab-active font-bold' : 'text-[#cac4d2] hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-[#00F2FF]" />
              <span>Active Deployments Log</span>
            </button>

            {/* Log New Item (When Signed in) */}
            {session.isLoggedIn ? (
              <button
                onClick={() => setShowAddItemModal(true)}
                className="px-5 py-2.5 rounded-xl font-mono text-xs text-white bg-[#00F2FF]/20 border border-[#00F2FF]/50 hover:bg-[#00F2FF]/30 transition-all flex items-center gap-2 neo-btn font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#00F2FF]" />
                <span>Log New Component</span>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2.5 rounded-xl font-mono text-xs text-[#00F2FF] border border-[#00F2FF]/40 hover:bg-[#00F2FF]/10 transition-all neo-btn flex items-center gap-2 font-bold cursor-pointer"
              >
                <User className="w-4 h-4 text-[#00F2FF]" />
                <span>Login as a CYB Member</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Metrics Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="neo-inset p-4 rounded-2xl">
            <span className="font-mono text-[10px] text-[#948e9c] uppercase block">TOTAL UNITS</span>
            <p className="font-cyber font-black text-xl text-white mt-1">{totalItemsCount}</p>
          </div>
          <div className="neo-inset p-4 rounded-2xl">
            <span className="font-mono text-[10px] text-emerald-400 uppercase block">AVAILABLE IN RACK</span>
            <p className="font-cyber font-black text-xl text-emerald-400 mt-1">{availableItemsCount}</p>
          </div>
          <div className="neo-inset p-4 rounded-2xl">
            <span className="font-mono text-[10px] text-[#00F2FF] uppercase block font-semibold">DEPLOYED / IN USE</span>
            <p className="font-cyber font-black text-xl text-[#00F2FF] mt-1">{checkedOutItemsCount}</p>
          </div>
          <div className="neo-inset p-4 rounded-2xl">
            <span className="font-mono text-[10px] text-[#cfbdff] uppercase block">SYSTEM HEALTH</span>
            <p className="font-cyber font-bold text-sm text-[#cfbdff] mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 status-ping" />
              100% OPERATIONAL
            </p>
          </div>
        </div>
      </section>

      {/* Subsystem Tabs Navigation */}
      <section id="subsystem-filter-tabs" className="flex flex-wrap items-center justify-between gap-4 border-b border-[#494551]/20 pb-4">
        {/* Subsystem category buttons */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Subsystems', icon: Layers },
            { id: 'mechanical', label: 'Mechanical', icon: Wrench },
            { id: 'electronics', label: 'Electronics', icon: Cpu },
            { id: 'autonomous', label: 'Autonomous & AI', icon: Activity },
            { id: 'power', label: 'Power & LiPo', icon: Zap },
            { id: 'pneumatics', label: 'Pneumatics', icon: Box }
          ].map((sub) => {
            const Icon = sub.icon;
            const isActive = activeSubsystem === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubsystem(sub.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 neo-btn ${
                  isActive ? 'neo-tab-active font-bold text-[#00F2FF]' : 'text-[#cac4d2] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00F2FF]' : 'text-[#948e9c]'}`} />
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input & Status Filter */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="w-4 h-4 text-[#948e9c] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components, specs, bins..."
              className="w-full neo-inset pl-9 pr-4 py-2 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
            />
          </div>

          <select
            value={activeStatusFilter}
            onChange={(e) => setActiveStatusFilter(e.target.value)}
            className="neo-inset px-3 py-2 rounded-xl font-mono text-xs text-[#cac4d2] bg-[#0b0a11] focus:outline-none focus:border-[#00F2FF]/60 border border-[#494551]/20"
          >
            <option value="all">All Statuses</option>
            <option value="available">Available Only</option>
            <option value="in_use">In Use Only</option>
          </select>
        </div>
      </section>

      {/* Active Deployments Drawer / Panel if toggled */}
      <AnimatePresence>
        {showDeploymentsLog && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="neo-card p-6 rounded-2xl border border-[#00F2FF]/30 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#494551]/20 pb-3">
              <h3 className="font-cyber font-bold text-base text-white uppercase flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00F2FF]" />
                CURRENTLY DEPLOYED EQUIPMENT LOG
              </h3>
              <span className="font-mono text-xs text-[#00F2FF]">
                {items.filter(i => i.checkedOutBy && i.checkedOutBy.length > 0).length} Items Active in Field
              </span>
            </div>

            <div className="space-y-3">
              {items.flatMap(item => 
                (item.checkedOutBy || []).map((out, idx) => ({
                  itemId: item.id,
                  itemName: item.name,
                  itemSubsystem: item.subsystem,
                  itemLocation: item.location,
                  checkoutIndex: idx,
                  ...out
                }))
              ).length === 0 ? (
                <p className="font-mono text-xs text-[#948e9c] py-4 text-center">No active hardware deployments. All components in rack.</p>
              ) : (
                items.flatMap(item => 
                  (item.checkedOutBy || []).map((out, idx) => ({
                    itemId: item.id,
                    itemName: item.name,
                    itemSubsystem: item.subsystem,
                    itemLocation: item.location,
                    checkoutIndex: idx,
                    ...out
                  }))
                ).map((dep, depIdx) => (
                  <div key={`${dep.itemId}-${depIdx}`} className="neo-inset p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-[#00F2FF] uppercase font-bold px-2 py-0.5 rounded neo-btn">
                          {dep.itemSubsystem.toUpperCase()}
                        </span>
                        <h4 className="font-cyber font-bold text-xs text-white">{dep.itemName}</h4>
                        <span className="font-mono text-xs text-[#cfbdff]">({dep.quantity} unit)</span>
                      </div>
                      <p className="font-mono text-[11px] text-[#cac4d2]">
                        <strong className="text-white">PURPOSE:</strong> {dep.projectPurpose}
                      </p>
                      <div className="flex items-center gap-4 font-mono text-[10px] text-[#948e9c]">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-[#00F2FF]" />
                          {dep.operatorName} ({dep.operatorRoll})
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#cfbdff]" />
                          Return Due: {dep.expectedReturnAt}
                        </span>
                      </div>
                    </div>

                    {session.isLoggedIn && (
                      <button
                        onClick={() => handleReturnItem(dep.itemId, dep.checkoutIndex)}
                        className="px-3 py-1.5 rounded-lg neo-btn font-mono text-[10px] text-emerald-400 hover:text-white border border-emerald-500/30 flex items-center gap-1.5 shrink-0"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>MARK RETURNED</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Grid of Subsystem Component Cards */}
      <section id="grid-subsystem-items" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isAvailable = item.quantityAvailable > 0;
            const checkedOutCount = item.quantityTotal - item.quantityAvailable;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className={`neo-card rounded-2xl p-6 border flex flex-col justify-between space-y-5 transition-all group ${
                  item.subsystem === 'electronics' ? 'hover:border-[#00F2FF]/60' :
                  item.subsystem === 'mechanical' ? 'hover:border-[#cfbdff]/60' : 'hover:border-[#00F2FF]/50'
                }`}
              >
                <div className="space-y-3">
                  {/* Category Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-lg neo-btn font-bold flex items-center gap-1.5 ${
                      item.subsystem === 'electronics' ? 'text-[#00F2FF] border border-[#00F2FF]/30' :
                      item.subsystem === 'mechanical' ? 'text-[#cfbdff] border border-[#cfbdff]/30' :
                      'text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.subsystem === 'electronics' && <Cpu className="w-3 h-3" />}
                      {item.subsystem === 'mechanical' && <Wrench className="w-3 h-3" />}
                      {item.subsystem === 'autonomous' && <Activity className="w-3 h-3" />}
                      {item.subsystem === 'power' && <Zap className="w-3 h-3" />}
                      {item.subsystem === 'pneumatics' && <Box className="w-3 h-3" />}
                      <span>{item.subsystem.toUpperCase()} // {item.category}</span>
                    </span>

                    {/* Status Pill */}
                    <div className="flex items-center gap-1.5 font-mono text-[9px]">
                      {isAvailable ? (
                        <span className="neo-btn bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-md text-emerald-400 flex items-center gap-1 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-ping" />
                          AVAILABLE
                        </span>
                      ) : (
                        <span className="neo-btn bg-cyan-950/80 border border-[#00F2FF]/40 px-2.5 py-1 rounded-md text-[#00F2FF] flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3" />
                          IN USE ({checkedOutCount}/{item.quantityTotal})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Component Title & Specs */}
                  <div>
                    <h3 className="font-cyber font-bold text-base text-white group-hover:text-[#00F2FF] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    {!session.isLoggedIn ? (
                      <div className="mt-3 neo-inset p-3.5 rounded-xl border border-[#00F2FF]/30 text-center space-y-2">
                        <div className="flex items-center justify-center gap-1.5 text-[#00F2FF] font-mono text-xs font-bold uppercase">
                          <ShieldAlert className="w-4 h-4" />
                          <span>RESTRICTED TELEMETRY</span>
                        </div>
                        <p className="font-mono text-[11px] text-[#cac4d2]/90">
                          Hardware specifications and lab bin locations are hidden for non-members.
                        </p>
                        <button
                          onClick={onLoginClick}
                          className="w-full py-2 px-3 rounded-lg neo-btn font-cyber font-bold text-[10px] text-[#00F2FF] hover:text-white border border-[#00F2FF]/40 hover:border-[#00F2FF] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-1"
                        >
                          <User className="w-3.5 h-3.5 text-[#00F2FF]" />
                          <span>LOGIN AS A CYB MEMBER FOR DETAILS</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="font-mono text-xs text-[#cac4d2] mt-1 leading-relaxed">
                          {item.specification}
                        </p>

                        {/* Location Tag */}
                        <div className="neo-inset p-3 rounded-xl flex items-center justify-between font-mono text-[10px] text-[#948e9c] mt-3">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#00F2FF]" />
                            <span>{item.location}</span>
                          </span>
                          <span className="text-[#cfbdff]">{item.id}</span>
                        </div>

                        {/* Checked-out Operator Info if currently taken */}
                        {item.checkedOutBy && item.checkedOutBy.length > 0 && (
                          <div className="neo-inset p-3 rounded-xl border border-cyan-500/20 space-y-1.5 mt-3">
                            <span className="font-mono text-[9px] text-[#00F2FF] font-bold uppercase block">
                              ACTIVE FIELD DEPLOYMENT:
                            </span>
                            {item.checkedOutBy.map((c, cIdx) => (
                              <div key={cIdx} className="font-mono text-[10px] text-[#cac4d2] flex justify-between items-center">
                                <span>👤 {c.operatorName} ({c.quantity} unit)</span>
                                <span className="text-[#948e9c]">Due: {c.expectedReturnAt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#494551]/15 space-y-3">
                  {/* Quantity Indicator Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between font-mono text-[10px] text-[#948e9c]">
                      <span>STOCK RATIO</span>
                      <span className={isAvailable ? 'text-emerald-400 font-bold' : 'text-[#00F2FF]'}>
                        {item.quantityAvailable} of {item.quantityTotal} UNITS READY
                      </span>
                    </div>
                    <div className="w-full h-1.5 neo-inset rounded-full overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isAvailable ? 'bg-[#00F2FF]' : 'bg-[#948e9c]'
                        }`}
                        style={{ width: `${(item.quantityAvailable / item.quantityTotal) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Take / Checkout Button */}
                  <div className="flex gap-2">
                    {!session.isLoggedIn ? (
                      <button
                        onClick={onLoginClick}
                        className="w-full py-2.5 rounded-xl neo-btn font-mono text-xs text-[#00F2FF] hover:text-white border border-[#00F2FF]/40 hover:border-[#00F2FF] transition-all flex items-center justify-center gap-2 group-hover:bg-[#00F2FF]/10 font-bold cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>LOGIN AS A CYB MEMBER FOR DETAILS</span>
                      </button>
                    ) : isAvailable ? (
                      <button
                        onClick={() => {
                          setSelectedItemForCheckout(item);
                          setCheckoutQty(1);
                        }}
                        className="w-full py-2.5 rounded-xl neo-btn font-mono text-xs text-[#00F2FF] hover:text-white border border-[#00F2FF]/40 hover:border-[#00F2FF] transition-all flex items-center justify-center gap-2 group-hover:bg-[#00F2FF]/10 font-bold cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>TAKE / CHECKOUT ITEM</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl neo-btn font-mono text-xs text-[#948e9c] border border-[#494551]/20 cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>ALL UNITS IN USE</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* Modal: Item Checkout Form */}
      <AnimatePresence>
        {selectedItemForCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="neo-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#00F2FF]/40 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#494551]/30 pb-4">
                <div>
                  <span className="font-mono text-[9px] text-[#00F2FF] uppercase font-bold tracking-widest block">
                    EQUIPMENT CHECKOUT PROTOCOL
                  </span>
                  <h3 className="font-cyber font-bold text-lg text-white uppercase mt-0.5">
                    {selectedItemForCheckout.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedItemForCheckout(null)}
                  className="p-2 rounded-xl neo-btn text-[#948e9c] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!session.isLoggedIn ? (
                <div className="text-center space-y-4 py-4">
                  <AlertTriangle className="w-10 h-10 text-[#00F2FF] mx-auto animate-bounce" />
                  <p className="font-mono text-xs text-[#cac4d2]">
                    OPERATOR UNVERIFIED: You must be signed into the Cyborg Mainframe to take items from the lab inventory.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedItemForCheckout(null);
                      if (onLoginClick) onLoginClick();
                    }}
                    className="w-full py-3 rounded-xl neo-btn font-cyber font-bold text-xs text-[#00F2FF] border border-[#00F2FF]/40"
                  >
                    PROCEED TO OPERATOR SIGN IN
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmCheckout} className="space-y-5">
                  <div className="neo-inset p-4 rounded-2xl space-y-1">
                    <span className="font-mono text-[10px] text-[#948e9c] uppercase block">CHECKOUT OPERATOR</span>
                    <p className="font-cyber font-bold text-sm text-white">{session.name} ({session.rollNumber})</p>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[#cfbdff] uppercase block">
                      Quantity to Take (Max: {selectedItemForCheckout.quantityAvailable})
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={selectedItemForCheckout.quantityAvailable}
                      value={checkoutQty}
                      onChange={(e) => setCheckoutQty(Number(e.target.value))}
                      className="w-full neo-inset px-4 py-3 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-[#00F2FF]/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[#cfbdff] uppercase block">
                      Project Purpose / Sub-system Testing
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ABU Robocon Pneumatic Valve Testing..."
                      value={projectPurpose}
                      onChange={(e) => setProjectPurpose(e.target.value)}
                      className="w-full neo-inset px-4 py-3 rounded-xl font-mono text-xs text-white placeholder-[#605a6e] focus:outline-none focus:border-[#00F2FF]/60"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-[#cfbdff] uppercase block">
                      Expected Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full neo-inset px-4 py-3 rounded-xl font-mono text-xs text-white bg-[#0b0a11] focus:outline-none focus:border-[#00F2FF]/60"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl neo-btn font-cyber font-bold text-sm text-[#00F2FF] hover:text-white uppercase tracking-wider border border-[#00F2FF]/40 hover:border-[#00F2FF] transition-all"
                  >
                    CONFIRM & LOG CHECKOUT
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Log New Component */}
      <AnimatePresence>
        {showAddItemModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="neo-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#00F2FF]/40 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#494551]/30 pb-4">
                <div>
                  <span className="font-mono text-[9px] text-[#00F2FF] uppercase font-bold tracking-widest block">
                    INVENTORY REGISTRATION
                  </span>
                  <h3 className="font-cyber font-bold text-lg text-white uppercase mt-0.5">
                    Log New Cyborg Component
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddItemModal(false)}
                  className="p-2 rounded-xl neo-btn text-[#948e9c] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNewItem} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase block">Item Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Maxon 24V BLDC Motor 100W"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#cfbdff] uppercase block">Subsystem</label>
                    <select
                      value={newItemSubsystem}
                      onChange={(e: any) => setNewItemSubsystem(e.target.value)}
                      className="w-full neo-inset px-3 py-2.5 rounded-xl font-mono text-xs text-white bg-[#0b0a11] border border-[#494551]/30"
                    >
                      <option value="electronics">Electronics</option>
                      <option value="mechanical">Mechanical</option>
                      <option value="autonomous">Autonomous & AI</option>
                      <option value="power">Power</option>
                      <option value="pneumatics">Pneumatics</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#cfbdff] uppercase block">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(Number(e.target.value))}
                      className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-[#00F2FF]/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase block">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Microcontrollers, Actuators..."
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase block">Specification</label>
                  <input
                    type="text"
                    placeholder="e.g. 24V 100A peak, CAN interface..."
                    value={newItemSpec}
                    onChange={(e) => setNewItemSpec(e.target.value)}
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#cfbdff] uppercase block">Lab Storage Location Bin</label>
                  <input
                    type="text"
                    placeholder="e.g. Rack E-03 // Bin 2"
                    value={newItemLocation}
                    onChange={(e) => setNewItemLocation(e.target.value)}
                    className="w-full neo-inset px-4 py-2.5 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-[#00F2FF]/60"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl neo-btn font-cyber font-bold text-xs text-[#00F2FF] uppercase tracking-wider border border-[#00F2FF]/40 hover:border-[#00F2FF]"
                >
                  ADD TO CYBORG INVENTORY
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
