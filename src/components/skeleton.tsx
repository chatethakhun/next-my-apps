import { type ComponentProps } from "react";

type SkeletonProps = ComponentProps<"div">;

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`skeleton rounded-md ${className}`.trim()}
      aria-hidden
      {...props}
    />
  );
}
