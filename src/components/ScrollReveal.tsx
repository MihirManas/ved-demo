"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 1, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
