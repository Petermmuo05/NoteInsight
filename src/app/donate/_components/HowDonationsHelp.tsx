import React from 'react';
import { FaServer, FaTools, FaUsers, FaChartLine } from 'react-icons/fa';

const HowDonationsHelp = () => {
  const benefits = [
    {
      icon: <FaServer className="text-3xl text-[#d8f999]" />,
      title: "Server Costs",
      description: "Keep our servers running smoothly to ensure 24/7 access for all users"
    },
    {
      icon: <FaTools className="text-3xl text-[#d8f999]" />,
      title: "Feature Development",
      description: "Fund new features and improvements based on user feedback"
    },
    {
      icon: <FaUsers className="text-3xl text-[#d8f999]" />,
      title: "User Support",
      description: "Maintain our help resources and support team to assist users"
    },
    {
      icon: <FaChartLine className="text-3xl text-[#d8f999]" />,
      title: "Growth & Scaling",
      description: "Prepare for increased traffic as more people discover NoteInsight"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {benefits.map((benefit, index) => (
        <div 
          key={index} 
          className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-[#d8f999] transition-all"
        >
          <div className="mb-4">{benefit.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HowDonationsHelp;