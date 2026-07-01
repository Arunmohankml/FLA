"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { stats } from "@/lib/constants";
import {
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineStar,
  HiOutlineCalendar,
} from "react-icons/hi";

const iconMap = {
  users: HiOutlineUserGroup,
  book: HiOutlineBookOpen,
  star: HiOutlineStar,
  calendar: HiOutlineCalendar,
};

export function TrustSection() {
  return (
    <section className="relative z-10 -mt-16 px-6 pb-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="rounded-3xl border border-black/5 bg-white px-6 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
            {stats.map((stat, i) => {
              const Icon = iconMap[stat.icon];
              return (
                <div
                  key={stat.label}
                  className={`flex items-start gap-4 ${
                    i < stats.length - 1
                      ? "md:border-r md:border-black/8 md:pr-8"
                      : ""
                  } ${i > 0 ? "border-t border-black/8 pt-6 md:border-t-0 md:pt-0" : ""}`}
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/40">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                      <Counter
                        end={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix || ""}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    </div>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
