"use client";

import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { motion } from "@/lib/framer-motion";
import { ReactNode, useMemo } from "react";
import { cn } from "../../lib/utils";

export default function BarList({
  data,
  maxValue
}: {
  data: {
    icon: ReactNode;
    title: string;
    href?: string;
    value: number;
    linkId?: string;
  }[];
  maxValue: number;
}) {
  // Calculate total sum for percentage calculations
  const totalSum = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const itemProps = data.map((d) => ({
    ...d,
    maxValue,
    totalSum
  }));

  const bars = (
    <NumberFlowGroup>
      <div className="relative grid h-full auto-rows-min grid-cols-1">
        {data.map((_, idx) => (
          <LineItem key={idx} {...itemProps[idx]} />
        ))}
      </div>
    </NumberFlowGroup>
  );

  return bars;
}

export function LineItem({
  icon,
  title,
  value,
  totalSum
}: {
  icon: ReactNode;
  title: string;
  value: number;
  totalSum: number;
}) {
  const lineItem = useMemo(() => {
    return (
      <div className="z-10 flex items-center space-x-4 overflow-hidden px-3">
        {icon}
        <div className="truncate text-sm text-neutral-800 font-medium">{title}</div>
      </div>
    );
  }, [icon, title]);

  // Calculate percentage against total sum and round to 1 decimal
  const percentage = Math.round((value / totalSum) * 1000) / 10;

  return (
    // @ts-ignore - we know if it's a Link it'll get its href
    <div className="block min-w-0 border-l-2 border-transparent px-4 py-1 transition-all">
      <div className={"relative flex items-center justify-between"}>
        <motion.div
          style={{
            width: `${percentage}%`,
            position: "absolute",
            inset: 0
          }}
          className="h-full origin-left rounded-md bg-[#e7eeff]"
          transition={{ ease: "easeOut", duration: 0.3 }}
          initial={{ transform: "scaleX(0)" }}
          animate={{ transform: "scaleX(1)" }}
        />
        <div className="rounded-md relative z-10 flex h-8 w-full min-w-0 max-w-[calc(100%-2rem)] items-center transition-[max-width] duration-300 ease-in-out group-hover:max-w-[calc(100%-5rem)]">
          {lineItem}
        </div>
        <div className="z-10 flex items-center mx-2">
          <NumberFlow
            value={percentage}
            className={cn("z-10 text-sm text-neutral-600 transition-transform duration-300")}
            style={{
              transform: `translateX(var(--tw-translate-x, 0)) translateZ(0)`
            }}
            format={{
              notation: "compact"
            }}
          />
          %
        </div>
      </div>
    </div>
  );
}
