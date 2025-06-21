"use client";
import React, { useState } from "react";
import { Session } from "next-auth";
import { updateUser, verify } from "../_lib/actions/dashboard/action";
import Image from "next/image";
import logo from "../../../public/paystack.svg";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Props {
  session: Session;
}
interface Tnx {
  id: string;
  reference: string;
  message: string;
  redirecturl: string;
  status: "success";
  trans: string;
  transaction: string;
  trxref: string;
}

const CURRENCIES = [
  { code: "USD", symbol: "$", min: 5, suggested: [5, 10, 20, 50, 100] },
  { code: "EUR", symbol: "€", min: 5, suggested: [5, 10, 20, 50, 100] },
  {
    code: "NGN",
    symbol: "₦",
    min: 1000,
    suggested: [1000, 2000, 5000, 10000, 20000],
  },
];

export function PayButton({ session }: Props) {
  const [currency, setCurrency] = useState(CURRENCIES[0].code);
  const [amount, setAmount] = useState(CURRENCIES[0].suggested[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const { update } = useSession();

  const currencyObj = CURRENCIES.find((c) => c.code === currency)!;
  const currencySymbol = currencyObj.symbol;
  const minAmount = currencyObj.min;
  const suggestedAmounts = currencyObj.suggested;

  // Handle currency change: reset amount and custom mode
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    const newCurrencyObj = CURRENCIES.find((c) => c.code === newCurrency)!;
    setCurrency(newCurrency);
    setAmount(newCurrencyObj.suggested[0]);
    setCustomMode(false);
    setCustomInput("");
  };

  // Handle suggested amount click
  const handleSuggestedClick = (amt: number) => {
    setAmount(amt);
    setCustomMode(false);
    setCustomInput("");
  };

  // Handle custom mode activation
  const handleCustomMode = () => {
    setCustomMode(true);
    setCustomInput(amount.toString());
  };

  // Handle custom input change
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInput(val);
    const num = Number(val);
    if (!isNaN(num) && num >= minAmount) {
      setAmount(num);
    }
  };

  // Ensure amount is always valid for the selected currency
  React.useEffect(() => {
    if (amount < minAmount) {
      setAmount(minAmount);
    }
  }, [currency, minAmount]);

  const handleClick = async () => {
    setIsLoading(true);
    const email = session?.user?.email;
    if (!email) {
      alert("Please log in to make a donation");
      setIsLoading(false);
      return;
    }

    const handleSessionUpdate = async (noPromptTill: string) => {
      try {
        // toast.loading("Updating user...");
        const data = await updateUser(session?.accessToken, {
          token: session?.accessToken,
          name: session?.user?.username || "",
          email,
          noPromptTill,
        });
        console.log(data, "data after update");

        const newSession = await update({
          user: {
            id: data.id,
            username: data.firstName,
            image: data.image,
            email: data.email,
            noPromptTill: data.noPromptTill,
          },
          accessToken: data.token,
        });
        console.log(newSession, "new session after update");
        // toast.dismiss();
        toast.success("User updated successfully");
      } catch (error) {
        // toast.dismiss();
        console.error("Error updating user:", error);
        toast.error("Failed to update user");
      }
    };

    const { default: PaystackPop } = await import("@paystack/inline-js");
    const pop = new PaystackPop();

    pop.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email,
      amount: amount * 100, // Convert to kobo if NGN, cents if USD
      currency,
      onSuccess: async (txn: Tnx) => {
        const verification = await verify(txn.reference, session?.accessToken);
        if (verification.status) {
          //update user session with noPromptTill
          handleSessionUpdate(verification.noPromptTill);
        }
        setIsLoading(false);
      },
      onCancel: () => {
        alert("Payment cancelled");
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Make a Donation</h2>
        <p className="text-gray-600 mt-2">
          Select an amount to support NoteInsight🥺
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <div className="grid grid-cols-3 gap-3">
          {suggestedAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleSuggestedClick(amt)}
              className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all
                ${
                  !customMode && amount === amt
                    ? "bg-[#d8f999] border-[#c0e880] text-gray-900 shadow-inner"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {currencySymbol}
              {amt}
            </button>
          ))}
          <button
            type="button"
            onClick={handleCustomMode}
            className={`py-3 px-4 rounded-lg border text-sm font-medium col-span-3
              ${
                customMode
                  ? "bg-[#d8f999] border-[#c0e880] text-gray-900 shadow-inner"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            Custom Amount
          </button>
        </div>
      </div>

      {customMode && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Custom Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              {currencySymbol}
            </span>
            <input
              type="number"
              min={minAmount}
              value={customInput}
              onChange={handleCustomInputChange}
              className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d8f999] focus:border-[#c0e880]"
              placeholder={`Minimum ${currencySymbol}${minAmount}`}
            />
          </div>
          {customInput && Number(customInput) < minAmount && (
            <p className="text-red-500 text-xs mt-1">
              Minimum amount is {currencySymbol}
              {minAmount}
            </p>
          )}
        </div>
      )}

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Currency
        </label>
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d8f999] focus:border-[#c0e880]"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} ({c.symbol})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleClick}
        disabled={isLoading || amount < minAmount}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all
          ${
            isLoading || amount < minAmount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#1b140e] to-[#3a332d] hover:from-[#3a332d] hover:to-[#1b140e] shadow-lg hover:shadow-xl"
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          `Donate ${currencySymbol}${amount}`
        )}
      </button>

      <p className="text-center text-gray-500 text-sm mt-4 items-center justify-center gap-2 flex">
        Secure payment powered by{" "}
        <a
          href="https://paystack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Image src={logo} alt="paystack_logo" className="w-4" />
          Paystack
        </a>
      </p>
    </div>
  );
}
