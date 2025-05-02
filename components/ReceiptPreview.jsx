import React, { useRef } from "react";
import html2canvas from "html2canvas";

export default function ReceiptPreview() {
  const receiptRef = useRef();

  const downloadImage = () => {
    const input = receiptRef.current;
    html2canvas(input).then((canvas) => {
      const link = document.createElement("a");
      link.download = "receipt.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="p-4 bg-[#f5f3ed] min-h-screen">
      <div ref={receiptRef} className="bg-[#f5f3ed] border border-gray-300 p-4 shadow-md w-[850px] h-[440px] mx-auto rounded-sm text-gray-800 font-sans">
        <div className="flex justify-start items-start mb-4">
          <div className="text-3xl italic font-extrabold text-[#7c0a02] tracking-normal">IndusInd Bank</div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <img src="https://cdn2.iconfinder.com/data/icons/greenline/512/check-1024.png" alt="Green Tick" className="h-12 w-12 mb-2" />
          <div className="text-green-600 font-bold text-2xl">PAYMENT SUCCESSFUL</div>
        </div>
        <hr className="mb-4 border-gray-400" />
        <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-base leading-7 mb-6">
          <div><span className="font-semibold">Beneficiary Name:</span> DVAND RESEARCH AND SOLUTIONS OPC PRIVATE LIMITED</div>
          <div><span className="font-semibold">Account Number:</span> 2402245960025801</div>
          <div><span className="font-semibold">IFSC:</span> AUBL0002459</div>
          <div><span className="font-semibold">Bank:</span> AU Small Finance Bank</div>
          <div><span className="font-semibold">Amount:</span> 5000000.00 INR</div>
          <div><span className="font-semibold">Payment Mode:</span> Payout</div>
          <div><span className="font-semibold">Transaction ID:</span> 512345678901</div>
          <div><span className="font-semibold">Date:</span> 02/05/2025</div>
        </div>
        <div className="mt-12 text-xs text-gray-600 text-right">This is a system generated confirmation and does not require signature.</div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={downloadImage}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 shadow"
        >
          Download Image
        </button>
      </div>
    </div>
  );
}
