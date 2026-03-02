import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, QrCode, Download } from "lucide-react";
import { toPng } from "html-to-image";

// Bank SVG logos
import TeleBirrLogo from "../assets/payment/TeleBirr.svg";
import CBEBirrLogo from "../assets/payment/CBEBirr.svg";
import CBELogo from "../assets/payment/CommercialBankofEthiopia.svg";
import AwashLogo from "../assets/payment/AwashInternationalBank.svg";
import CoopLogo from "../assets/payment/CooperativeBankofOromia.svg";
import AbyssiniaLogo from "../assets/payment/BankOfAbyssinia.svg";

// ── 5 Ethiopian Banks ──
const banks = [
  {
    id: "cbe",
    name: "CBE",
    logo: CBELogo,
    accountName: "Rodeo Restaurant PLC",
    accountNumber: "1000 0089 7734 5521",
    gradient: "linear-gradient(135deg, #8c2d85 0%, #6b1d65 40%, #4a1048 100%)",
    textColor: "#fff",
    accentColor: "#e0a94c",
    chipColor: "rgba(224,169,76,0.2)",
  },
  {
    id: "telebirr",
    name: "TeleBirr",
    logo: TeleBirrLogo,
    accountName: "Rodeo Restaurant PLC",
    accountNumber: "0978 0049 6823",
    gradient: "linear-gradient(135deg, #0172bb 0%, #024f8a 40%, #01365e 100%)",
    textColor: "#fff",
    accentColor: "#4dc9f6",
    chipColor: "rgba(255,255,255,0.15)",
  },
  {
    id: "abyssinia",
    name: "Abyssinia",
    logo: AbyssiniaLogo,
    accountName: "Rodeo Restaurant PLC",
    accountNumber: "1289 9934 0012",
    gradient: "linear-gradient(135deg, #f1ab15 0%, #d99a12 50%, #b37f0f 100%)",
    textColor: "#1a1300",
    accentColor: "#fff2d9",
    chipColor: "rgba(0,0,0,0.1)",
  },
  {
    id: "cbebirr",
    name: "CBE Birr",
    logo: CBEBirrLogo,
    accountName: "Rodeo Restaurant PLC",
    accountNumber: "1000 3445 5678",
    gradient: "linear-gradient(135deg, #8c2d85 0%, #6b1d65 40%, #4a1048 100%)",
    textColor: "#fff",
    accentColor: "#e0a94c",
    chipColor: "rgba(224,169,76,0.2)",
  },
  {
    id: "awash",
    name: "Awash",
    logo: AwashLogo,
    accountName: "Rodeo Restaurant PLC",
    accountNumber: "0911 2233 4456",
    gradient: "linear-gradient(135deg, #c8102e 0%, #8b0a1f 40%, #5e0714 100%)",
    textColor: "#fff",
    accentColor: "#ff6b7a",
    chipColor: "rgba(255,107,122,0.15)",
  },
  {
    id: "coop",
    name: "Coop",
    logo: CoopLogo,
    accountName: "Rodeo Restaurant PLC",
    accountNumber: "5566 7788 9901",
    gradient: "linear-gradient(135deg, #003d6b 0%, #00294a 40%, #001b33 100%)",
    textColor: "#fff",
    accentColor: "#00b4d8",
    chipColor: "rgba(0,180,216,0.15)",
  },
];

// Tip presets (Fixed values)
const tipPresets = [
  { label: "50 ETB", value: 50 },
  { label: "100 ETB", value: 100 },
  { label: "200 ETB", value: 200 },
];

const TAX_RATE = 0.15; // 15% VAT

const Payment = ({ cart = [] }) => {
  const navigate = useNavigate();
  const receiptRef = useRef(null);
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [copied, setCopied] = useState(false);
  const [tipValue, setTipValue] = useState(null);
  const [customTip, setCustomTip] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ── Cart calculations ──
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * TAX_RATE;
  const currentTipAmount = showCustom
    ? parseFloat(customTip) || 0
    : tipValue !== null
    ? tipValue
    : 0;
  const total = subtotal + tax + currentTipAmount;

  // ── Copy to clipboard ──
  const handleCopy = async () => {
    const clean = selectedBank.accountNumber.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(clean);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = clean;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Save Receipt as Image ──
  const handleSaveReceipt = async () => {
    if (cart.length === 0) return;
    setIsSaving(true);
    try {
      const dataUrl = await toPng(receiptRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `Rodeo-Receipt-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      // After success, navigate
      setTimeout(() => navigate("/order-success"), 1000);
    } catch (err) {
      console.error("Oops, something went wrong!", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full h-full bg-[#f2f2f7] flex flex-col font-sans relative overflow-hidden">
      
      {/* 🧾 Hidden Receipt Template for Image Export */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <div 
          ref={receiptRef}
          className="bg-white p-10 flex flex-col items-center"
          style={{ width: "450px", color: "#000", fontFamily: "'Courier New', Courier, monospace" }}
        >
          <h1 className="text-3xl font-black mb-1 uppercase tracking-tighter">RODEO RESTAURANT</h1>
          <p className="text-[14px] uppercase mb-6 font-bold">Addis Ababa, Ethiopia</p>
          
          <div className="w-full border-t border-black border-dashed my-4"></div>
          
          <div className="w-full flex justify-between text-[16px] font-bold mb-4">
            <span>RECEIPT #: {Math.floor(100000 + Math.random() * 900000)}</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>

          <div className="w-full mt-4 flex flex-col gap-3">
            {cart.map((item) => (
              <div key={item.cartId} className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[17px] font-black uppercase">{item.name}</span>
                  <span className="text-[14px] font-medium italic">{item.quantity || 1} x {item.price.toFixed(2)} ETB</span>
                </div>
                <span className="text-[17px] font-black">{(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="w-full border-t border-black border-dashed my-8"></div>

          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between text-[16px]">
              <span className="font-bold">SUBTOTAL</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[16px]">
              <span className="font-bold">VAT (15%)</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            {currentTipAmount > 0 && (
              <div className="flex justify-between text-[16px]">
                <span className="font-bold">TIP</span>
                <span>{currentTipAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="w-full border-t border-black border-dashed my-2"></div>
            <div className="flex justify-between text-[24px] font-black">
              <span>TOTAL</span>
              <span>{total.toFixed(2)} ETB</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=RODEO_${total.toFixed(0)}_ID${Date.now()}`} 
              alt="QR Code"
              className="w-[150px] h-[150px] border-4 border-black p-1"
            />
            <p className="text-[12px] font-black uppercase tracking-widest text-center">
              Scan to Verify Payment<br/>Thank you for dining with us!
            </p>
          </div>
          
          <div className="mt-6 w-full border-b border-black border-dashed"></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">

        {/* ════════════════════════════════════════════════
            SECTION 1 — Bank Selector + ATM Card
        ════════════════════════════════════════════════ */}

        {/* Bank selector row */}
        <div className="px-4 pt-4 pb-10 flex gap-3 overflow-x-auto hide-scrollbar">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => { setSelectedBank(bank); setCopied(false); }}
              style={{
                background: selectedBank.id === bank.id ? (bank.id === 'abyssinia' ? '#f1ab15' : bank.gradient) : 'white',
                borderColor: selectedBank.id === bank.id ? 'transparent' : '#f3f4f6'
              }}
              className={`flex items-center gap-2 px-4 py-4 rounded-[12px] flex-shrink-0 transition-all duration-300 border font-semibold shadow-sm ${
                selectedBank.id === bank.id
                  ? "text-white shadow-md scale-[1.05]"
                  : "text-gray-700 hover:border-gray-300"
              }`}
            >
              <img
                src={bank.logo}
                alt={bank.name}
                className={`w-5 h-5 object-contain transition-all ${
                  selectedBank.id === bank.id ? "brightness-0 invert" : ""
                }`}
              />
              <span className={`text-[14px] whitespace-nowrap ${selectedBank.id === bank.id ? "text-white" : ""}`}
                style={{ color: selectedBank.id === bank.id ? (bank.textColor === '#2d1e00' || bank.textColor === '#1a1300' ? bank.textColor : '#fff') : '' }}
              >
                {bank.name}
              </span>
            </button>
          ))}
        </div>

        {/* ATM Card */}
        <div className="px-5 pt-2 pb-1">
          <div
            className="rounded-[20px] p-6 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
            onClick={handleCopy}
            style={{
              background: selectedBank.gradient,
              aspectRatio: "1.7/1",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.15)",
            }}
          >
            {/* Decorative circles */}
            <div
              className="absolute -top-10 -right-10 w-[160px] h-[160px] rounded-full opacity-[0.08]"
              style={{ background: selectedBank.accentColor }}
            />
            <div
              className="absolute -bottom-16 -left-10 w-[200px] h-[200px] rounded-full opacity-[0.06]"
              style={{ background: selectedBank.accentColor }}
            />

            {/* Card top row: Logo + Bank name */}
            <div className="flex items-center justify-between mb-2 relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
                  style={{ background: selectedBank.chipColor }}
                >
                  <img
                    src={selectedBank.logo}
                    alt={selectedBank.name}
                    className="w-8 h-8 object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[18px] font-bold tracking-tight"
                    style={{ color: selectedBank.textColor }}
                  >
                    {selectedBank.name}
                  </span>
                  <span
                    className="text-[11px] font-medium opacity-60"
                    style={{ color: selectedBank.textColor }}
                  >
                    Business Account
                  </span>
                </div>
              </div>

              {/* Card chip graphic */}
              <div className="w-[36px] h-[28px] rounded-[4px] bg-gradient-to-br from-yellow-100 to-yellow-500 opacity-60 flex flex-col gap-1 p-1">
                <div className="w-full h-[1px] bg-black/20"></div>
                <div className="w-full h-[1px] bg-black/20"></div>
                <div className="w-full h-[1px] bg-black/20"></div>
              </div>
            </div>

            {/* Account Number */}
            <div className="relative z-10 mt-4">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.15em] opacity-50"
                style={{ color: selectedBank.textColor }}
              >
                Account Number
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className="text-[22px] font-bold tracking-[0.12em]"
                  style={{ color: selectedBank.textColor, fontFamily: "monospace, system-ui" }}
                >
                  {selectedBank.accountNumber}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/10"
                >
                  {copied ? (
                    <Check size={14} className="text-green-300" strokeWidth={3} />
                  ) : (
                    <Copy size={14} style={{ color: selectedBank.textColor }} strokeWidth={2} />
                  )}
                </div>
              </div>
            </div>

            {/* Account holder name */}
            <div className="relative z-10 mt-4 flex items-end justify-between">
              <div className="flex flex-col">
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.15em] opacity-50"
                  style={{ color: selectedBank.textColor }}
                >
                  Account Holder
                </span>
                <span
                  className="text-[14px] font-bold tracking-wide mt-0.5"
                  style={{ color: selectedBank.textColor }}
                >
                  {selectedBank.accountName}
                </span>
              </div>
              {/* Contactless icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
                <path d="M8 18C8 18 12 15 12 12C12 9 8 6 8 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 18C12 18 16 15 16 12C16 9 12 6 12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 18C16 18 20 15 20 12C20 9 16 6 16 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Copied toast */}
        {copied && (
          <div className="px-5 pt-2">
            <div className="bg-green-50 text-green-700 text-[13px] font-semibold px-4 py-2 rounded-xl text-center border border-green-100">
              ✓ Account number copied to clipboard
            </div>
          </div>
        )}


        {/* ════════════════════════════════════════════════
            SECTION 2 — Order Total & CTA
        ════════════════════════════════════════════════ */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-gray-500 mb-0.5">
                Order Total
              </span>
              <span className="text-[34px] font-bold text-black leading-tight tracking-tight">
                {total.toFixed(2)}{" "}
                <span className="text-[16px] font-semibold text-gray-400">
                  ETB
                </span>
              </span>
              <span className="text-[13px] text-gray-400 mt-0.5">
                {cart.length} {cart.length === 1 ? "item" : "items"} • incl. VAT
              </span>
            </div>
            {/* Save Receipt button */}
            <button
              onClick={handleSaveReceipt}
              disabled={isSaving || cart.length === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all shadow-lg active:scale-95 ${
                isSaving || cart.length === 0 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-black hover:bg-gray-800 text-white"
              }`}
              style={{ marginBottom: "8px" }}
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Download size={18} />
              )}
              <span className="text-[14px] font-bold">
                {isSaving ? "Saving..." : "Save Receipt"}
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="px-5">
          <div className="h-[0.5px] bg-gray-200" />
        </div>


        {/* ════════════════════════════════════════════════
            SECTION 3 — Tip Card (Fixed values)
        ════════════════════════════════════════════════ */}
        <div className="px-5 py-4">
          <div className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              {/* Tip icon */}
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <span className="text-[20px]">�</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[15px] font-bold text-black">
                  Tip Our Team
                </span>
                <span className="text-[13px] text-gray-400">
                  Select a birr amount to tip
                </span>
              </div>
              {currentTipAmount > 0 && (
                <span className="text-[15px] font-black text-green-600">
                  +{currentTipAmount.toFixed(0)} ETB
                </span>
              )}
            </div>

            {/* Tip preset buttons */}
            <div className="flex gap-2 mb-3">
              {tipPresets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setShowCustom(false);
                    setTipValue(
                      tipValue === preset.value ? null : preset.value
                    );
                  }}
                  className={`flex-1 py-3 rounded-[12px] text-[13px] font-bold transition-all border ${
                    !showCustom && tipValue === preset.value
                      ? "bg-black text-white border-black shadow-md ring-2 ring-black/10"
                      : "bg-[#f8f9fa] text-gray-600 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setShowCustom(!showCustom);
                  setTipValue(null);
                }}
                className={`flex-1 py-3 rounded-[12px] text-[13px] font-bold transition-all border ${
                  showCustom
                    ? "bg-black text-white border-black shadow-md ring-2 ring-black/10"
                    : "bg-[#f8f9fa] text-gray-600 border-gray-100 hover:border-gray-300"
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom tip input */}
            {showCustom && (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex-1 flex items-center bg-[#f2f2f7] rounded-[12px] px-4 py-3 border border-gray-100">
                  <span className="text-[14px] font-bold text-gray-400 mr-2">ETB</span>
                  <input
                    type="number"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    placeholder="Enter amount"
                    className="flex-1 bg-transparent outline-none text-[14px] font-bold text-black"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="px-5">
          <div className="h-[0.5px] bg-gray-200" />
        </div>


        {/* ════════════════════════════════════════════════
            SECTION 4 — Order Summary (Receipt Review)
        ════════════════════════════════════════════════ */}
        <div className="px-5 pt-5 pb-32">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <QrCode size={20} className="text-gray-400" />
              <h2 className="text-[20px] font-bold text-black">Order Summary</h2>
            </div>
            <span className="text-[12px] text-gray-400 font-bold bg-white px-2 py-1 rounded-md border border-gray-100">
              {cart.length} ITEMS
            </span>
          </div>

          {/* Order Items */}
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
              <span className="text-[32px]">🍽️</span>
              <p className="font-bold text-[14px]">Your order is empty</p>
              <button
                onClick={() => navigate("/categories")}
                className="mt-2 text-[13px] font-bold text-blue-500 hover:underline"
              >
                Back to Menu →
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100">
              {/* Items */}
              {cart.map((item, idx) => (
                <div key={item.cartId}>
                  <div className="flex items-center gap-4 px-4 py-4">
                    {/* Thumbnail */}
                    <div className="w-[52px] h-[52px] rounded-[14px] overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100 shadow-inner">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <span className="text-[15px] font-bold text-black truncate tracking-tight">
                        {item.name}
                      </span>
                      <span className="text-[12px] font-medium text-gray-400">
                        {item.quantity || 1} x {item.price.toFixed(0)} ETB
                      </span>
                    </div>
                    {/* Total price for this item */}
                    <span className="text-[15px] font-black text-black flex-shrink-0">
                      {(item.price * (item.quantity || 1)).toFixed(0)}
                    </span>
                  </div>
                  {/* Separator between items */}
                  {idx < cart.length - 1 && (
                    <div className="mx-4">
                      <div className="h-[1px] bg-gray-50" />
                    </div>
                  )}
                </div>
              ))}

              {/* ── Receipt Totals ── */}
              <div className="bg-gray-50/50 p-4 flex flex-col gap-3">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-bold text-gray-400">SUBTOTAL</span>
                  <span className="font-bold text-gray-600">
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                {/* Tax */}
                <div className="flex justify-between items-center text-[13px]">
                  <span className="font-bold text-gray-400">
                    VAT (15%)
                  </span>
                  <span className="font-bold text-gray-600">
                    {tax.toFixed(2)}
                  </span>
                </div>
                {/* Tip */}
                {currentTipAmount > 0 && (
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-bold text-gray-400">TIP</span>
                    <span className="font-bold text-green-600">
                      +{currentTipAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                
                {/* Grand Total */}
                <div className="border-t border-dashed border-gray-200 pt-3 mt-1 flex justify-between items-center">
                  <span className="text-[16px] font-black text-black">TOTAL</span>
                  <span className="text-[20px] font-black text-black">
                    {total.toFixed(2)} ETB
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Hide Scrollbar CSS ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};

export default Payment;
