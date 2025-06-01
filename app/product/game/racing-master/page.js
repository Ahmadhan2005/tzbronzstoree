'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

// Data produk Racing Master Membership
const racingMasterMembershipOptions = [
  { label: "Monthly Card", price: "Rp. 33.000" },
  { label: "Deluxe MP", price: "Rp. 70.000" },
  { label: "Growth Fund", price: "Rp. 90.000" },
  { label: "Premium MP", price: "Rp. 142.000" },
  { label: "MP Combo", price: "Rp. 330.000" },
];

// Data produk Racing Master Gems
const racingMasterGemsOptions = [
  { label: "70 + 4 Gems", price: "Rp. 15.000" },
  { label: "350 + 18 Gems", price: "Rp. 72.000" },
  { label: "700 + 35 Gems", price: "Rp. 136.000" },
  { label: "1000 + 50 Gems", price: "Rp. 200.000" },
  { label: "1400 + 70 Gems", price: "Rp. 282.000" },
  { label: "2100 + 105 Gems", price: "Rp. 410.000" },
  { label: "3400 + 170 Gems", price: "Rp. 660.000" },
  { label: "6600 + 330 Gems", price: "Rp. 1.300.000" },
];

// Data info game
const racingMasterGameInfo = {
  name: "Racing Master",
  image: "/RACE MASTER.png",
  desc: "Top up Membership dan Gems Racing Master untuk membeli item, mobil, dan keperluan in-game lainnya dengan harga terbaik dan proses instan di tzbronzstore.id.",
};

// Data metode pembayaran beserta gambar/logo
const paymentOptions = [
  { value: "bsi", label: "BSI", img: "/pembayaran/BANK BSI.png" },
  { value: "dana", label: "DANA", img: "/pembayaran/DANA.png" },
  { value: "gopay", label: "GOPAY", img: "/pembayaran/GOPAY.jpg" },
  { value: "ovo", label: "OVO", img: "/pembayaran/OVO.png" },
  { value: "qris", label: "QRIS", img: "/pembayaran/QRIS.jpg" },
  { value: "shopeepay", label: "ShopeePay", img: "/pembayaran/SHOPEEPAY.jpg" },
];

export default function ProductPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [type, setType] = useState("membership"); // membership | gems
  const [product, setProduct] = useState(racingMasterMembershipOptions[0].label);
  const [payment, setPayment] = useState(paymentOptions[0].value);

  const WA_NUMBER = "6285862064460"; // Ganti dengan nomor WhatsApp penjual

  // Update produk saat tipe berubah
  const handleTypeChange = (newType) => {
    setType(newType);
    setProduct(
      newType === "membership"
        ? racingMasterMembershipOptions[0].label
        : racingMasterGemsOptions[0].label
    );
  };

  const handleCheckout = async () => {
      const pesan =
        `Halo Admin, saya ingin order Racing Master:\n` +
        `• User ID: ${userId}\n` +
        `• Tipe: ${type === "membership" ? "Membership" : "Gems"}\n` +
        `• Paket: ${product}\n` +
        `• Pembayaran: ${paymentOptions.find((p) => p.value === payment)?.label}\n` +
        `Terima kasih.`;
      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
      window.open(waUrl, "_blank");
  };

  // Selaraskan warna dengan navbar (ungu & putih)
  const bgCard = "bg-white";
  const borderCard = "border border-purple-100";
  const labelClass = "block mb-2 font-semibold text-purple-700";
  const inputClass =
    "w-full border border-purple-200 px-4 py-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-purple-700 placeholder-purple-400";
  const buttonClass =
    "w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-purple-700 hover:to-purple-500 transition-all uppercase tracking-widest";

  // Pilihan produk sesuai tipe
  const productOptions = type === "membership" ? racingMasterMembershipOptions : racingMasterGemsOptions;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-2 sm:p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Game Info */}
        <div className={`md:w-1/3 w-full flex flex-col items-center md:items-start ${bgCard} ${borderCard} rounded-xl shadow-lg p-4 animate-fade-in`}>
          <div className="w-36 h-36 mb-4 rounded-xl overflow-hidden shadow-lg border-4 border-purple-400 flex items-center justify-center bg-white">
            <img
              src={racingMasterGameInfo.image}
              alt={racingMasterGameInfo.name}
              className="w-full h-full object-contain"
              style={{ maxHeight: "120px", maxWidth: "120px" }}
            />
          </div>
          <h2 className="text-2xl font-extrabold mb-2 text-purple-700 drop-shadow text-center md:text-left">{racingMasterGameInfo.name}</h2>
          <p className="text-purple-500 text-sm text-center md:text-left">{racingMasterGameInfo.desc}</p>
        </div>

        {/* Main Form */}
        <div className={`flex-1 ${bgCard} ${borderCard} rounded-xl shadow-lg p-4 sm:p-6 animate-fade-in`}>
          {/* Step 1: Masukkan User ID */}
          <div className="mb-6">
            <label className={labelClass}>Masukkan User ID Racing Master</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className={inputClass}
              placeholder="Contoh: 123456789"
            />
          </div>

          {/* Step 2: Pilih Tipe Top Up */}
          <div className="mb-6">
            <label className={labelClass}>Pilih Tipe Top Up</label>
            <div className="flex gap-4 mb-2">
              <button
                type="button"
                onClick={() => handleTypeChange("membership")}
                className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                  type === "membership"
                    ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                    : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                Membership
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("gems")}
                className={`px-4 py-2 rounded-lg font-bold text-sm border-2 transition-all duration-200 ${
                  type === "gems"
                    ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow"
                    : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                Gems
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {productOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setProduct(opt.label)}
                  className={`flex flex-col items-center justify-center border-2 rounded-lg px-2 py-3 font-bold text-sm transition-all duration-200
                    ${
                      product === opt.label
                        ? "border-purple-600 bg-purple-100 text-purple-700 scale-105 shadow-lg"
                        : "border-purple-200 bg-purple-50 text-purple-500 hover:border-purple-400 hover:bg-purple-100 hover:text-purple-700"
                    }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-xs font-semibold mt-1">{opt.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Pilih Pembayaran */}
          <div className="mb-6">
            <label className={labelClass}>Metode Pembayaran</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition
                    ${
                      payment === opt.value
                        ? "border-purple-600 bg-purple-100"
                        : "border-purple-200 bg-purple-50 hover:border-purple-400"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.value}
                    checked={payment === opt.value}
                    onChange={() => setPayment(opt.value)}
                    className="accent-purple-600 w-5 h-5"
                  />
                  <img
                    src={opt.img}
                    alt={opt.label}
                    className="w-14 h-14 object-contain"
                    style={{ maxHeight: "42px", maxWidth: "42px" }}
                  />
                  <span className="font-semibold text-purple-700 text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className={`${buttonClass} animate-pop`}
            disabled={!userId}
          >
            Lanjut ke Checkout
          </button>
        </div>
      </div>

      {/* Animasi CSS */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s;
        }
        .animate-pop {
          animation: popBtn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes popBtn {
          0% { transform: scale(0.95);}
          60% { transform: scale(1.05);}
          100% { transform: scale(1);}
        }
      `}</style>
    </div>
  );
}