import React from "react";
import { useNavigate } from "react-router-dom";

function FinanceAdmin() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51]"
        onClick={() => navigate("/payments")}
      >
        Admin Payment History
      </button>
      <button
        className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51]"
        onClick={() => navigate("/transactions")}
      >
        Admin Internal Transactions
      </button>
    </div>
  );
}

export default FinanceAdmin;
