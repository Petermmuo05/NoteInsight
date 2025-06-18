"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why does NoteInsight need donations?",
      answer:
        "NoteInsight is completely free to use with no ads. Donations help cover server costs, development expenses, and allow us to continue improving the app for everyone.",
    },
    {
      question: "Is my donation secure?",
      answer:
        "Yes! We use Paystack, a secure payment processor, to handle all transactions. We never store your payment information.",
    },
    {
      question: "Can I donate monthly?",
      answer:
        "Currently we only support one-time donations, but we're working on adding recurring donation options in the future.",
    },
    {
      question: "Will donating give me access to premium features?",
      answer:
        "NoteInsight will always remain completely free with all features available to everyone. Donations are purely voluntary to support the project.",
    },
    {
      question: "How else can I support NoteInsight?",
      answer:
        "Sharing NoteInsight with friends, giving us feedback, and contributing to our open-source projects are all great ways to support us!",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about supporting NoteInsight🙋
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left font-medium hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{faq.question}</span>
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {activeIndex === index && (
                <div className="p-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
