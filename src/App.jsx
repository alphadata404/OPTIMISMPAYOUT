import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function ReceiptPreview() {
  const receiptContainerRef = useRef();

  const [rawInput, setRawInput] = useState("");
  const [forms, setForms] = useState([]);

  const ifscToBank = (ifsc) => {
    if (ifsc.startsWith("KKBK")) return "Kotak Mahindra Bank";
    if (ifsc.startsWith("SBIN")) return "State Bank of India";
    if (ifsc.startsWith("HDFC")) return "HDFC Bank";
    if (ifsc.startsWith("ICIC")) return "ICICI Bank";
    if (ifsc.startsWith("PUNB")) return "Punjab National Bank";
    if (ifsc.startsWith("AUBL")) return "AU Small Finance Bank";
    return "Unknown Bank";
  };

  const parseRawInput = () => {
    const blocks = rawInput.trim().split(/\n\n+/);
    const parsed = blocks.map((block) => {
      const lines = block.split("\n").map(line => line.trim());

      const name = lines[0] || "";
      const accountMatch = lines.find(line => /A\/C[:\s]*([0-9]+)/i.test(line));
      const account = accountMatch ? accountMatch.match(/A\/C[:\s]*([0-9]+)/i)[1] : "";

      const ifscMatch = lines.find(line => /IFSC[:\s]*([A-Z0-9]{11})/i.test(line));
      const ifsc = ifscMatch ? ifscMatch.match(/IFSC[:\s]*([A-Z0-9]{11})/i)[1] : "";
      const bank = ifscToBank(ifsc);

      const amountMatch = lines.find(line => /Amount[:\s]*₹?([\d,]+\.?\d*)/i.test(line));
      const amount = amountMatch ? amountMatch.match(/Amount[:\s]*₹?([\d,]+\.?\d*)/i)[1].replace(/,/g, "") : "";

      return {
        name,
        account,
        ifsc,
        bank,
        amount,
        txn: "5" + Math.floor(10000000000 + Math.random() * 89999999999),
        date: new Date().toLocaleDateString("en-GB")
      };
    });
    setForms(parsed);
  };

  const downloadSingleImage = (el, i) => {
    html2canvas(el).then((canvas) => {
      const link = document.createElement("a");
      link.download = `receipt_${i + 1}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-white min-h-screen text-gray-800 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl text-[#7c0a02] font-bold uppercase" style={{ fontFamily: 'Tagesschrift, sans-serif' }}>OPTIMISMPAY</h1>
        <p className="text-[#a23c4a] text-sm mt-1">Instant Payouts WorldWide</p>
      </header>

      <div className="mb-10 max-w-3xl mx-auto bg-white border border-gray-200 p-6 rounded-xl shadow-lg">
        <textarea
          rows="6"
          placeholder="SUBMIT YOUR BANK DETAILS"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#a23c4a]"
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
        ></textarea>
        <button
          onClick={parseRawInput}
          className="bg-gradient-to-r from-[#a23c4a] to-[#7c0a02] text-white px-5 py-2 rounded-lg shadow hover:from-[#8f2b34] hover:to-[#600707]"
        >
          Submit Bank Details
        </button>
      </div>

      <div ref={receiptContainerRef} className="max-w-5xl mx-auto space-y-8">
        {forms.map((form, i) => (
          <div key={i} className="flex justify-between items-start bg-white border border-gray-200 rounded-xl p-4 shadow-md">
            <div className="space-y-1">
              <div><span className="font-semibold">Beneficiary Name:</span> {form.name || "-"}</div>
              <div><span className="font-semibold">Account Number:</span> {form.account || "-"}</div>
              <div><span className="font-semibold">IFSC:</span> {form.ifsc || "-"}</div>
              <div><span className="font-semibold">Bank:</span> {form.bank || "-"}</div>
              <div><span className="font-semibold">Amount:</span> {form.amount ? `${parseFloat(form.amount).toFixed(2)} INR` : "-"}</div>
              <div><span className="font-semibold">Payment Mode:</span> Payout</div>
              <div><span className="font-semibold">Transaction ID:</span> {form.txn}</div>
              <div><span className="font-semibold">Date:</span> {form.date}</div>
            </div>
            <button
              className="ml-4 bg-[#7c0a02] text-white px-4 py-1 rounded hover:bg-[#600707]"
              onClick={() => {
                const cards = receiptContainerRef.current.querySelectorAll('.receipt-card');
                downloadSingleImage(cards[i], i);
              }}
            >
              Download Receipt
            </button>
            <div className="hidden receipt-card">
              <div className="bg-white border border-gray-300 p-6 w-[600px] rounded">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl italic font-bold text-[#7c0a02]">OptimismPay</div>
                  <img src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-1024.png" alt="Green Tick" className="h-8 w-8" />
                </div>
                <div className="text-green-600 font-semibold text-xl text-center mb-4">PAYMENT SUCCESSFUL</div>
                <hr className="mb-4 border-gray-300" />
                <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm leading-6">
                  <div><span className="font-semibold">Beneficiary Name:</span> {form.name || "-"}</div>
                  <div><span className="font-semibold">Account Number:</span> {form.account || "-"}</div>
                  <div><span className="font-semibold">IFSC:</span> {form.ifsc || "-"}</div>
                  <div><span className="font-semibold">Bank:</span> {form.bank || "-"}</div>
                  <div><span className="font-semibold">Amount:</span> {form.amount ? `${parseFloat(form.amount).toFixed(2)} INR` : "-"}</div>
                  <div><span className="font-semibold">Payment Mode:</span> Payout</div>
                  <div><span className="font-semibold">Transaction ID:</span> {form.txn}</div>
                  <div><span className="font-semibold">Date:</span> {form.date}</div>
                </div>
                <div className="mt-6 text-xs text-gray-500 text-right">This is a system generated confirmation and does not require signature.</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
