"use client";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

interface TimeAgoProps {
  timestamp: string;
  className?: string;
}
export const TimeAgo = ({ timestamp, className }: TimeAgoProps) => {
  const relativeTime = dayjs.tz(timestamp, "UTC").fromNow();
  return (
    <span className={cn("text-sm text-muted-foreground", className)}>
      {relativeTime}
    </span>
  );
};

export { dayjs };
