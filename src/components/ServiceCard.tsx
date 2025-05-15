import { motion } from 'framer-motion';
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-[#0A0A0A] p-8 border border-[#1a1a1a] hover:border-[#2a2a2a] transition-colors"
    >
      <div className="space-y-6">
        {children}
        <h3 className="text-3xl font-medium text-white mt-4">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};