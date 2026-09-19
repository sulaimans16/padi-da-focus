type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "h-9 w-9" }: BrandMarkProps) {
  return (
    <img
      src="/favicon.png?v=2"
      alt=""
      aria-hidden="true"
      className={`shrink-0 object-contain ${className}`}
    />
  );
}