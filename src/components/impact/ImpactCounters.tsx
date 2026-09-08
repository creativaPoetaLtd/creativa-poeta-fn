import { useEffect, useRef, useState } from "react";

export type ImpactCounterItem = {
  value: number;
  suffix?: string;
  label: string;
};

type ImpactCountersProps = {
  items: ImpactCounterItem[];
  locale: string;
};

const AnimatedValue = ({ active, item, locale }: { active: boolean; item: ImpactCounterItem; locale: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(item.value);
      return;
    }

    let animationFrame = 0;
    const duration = 1450;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(item.value * easedProgress));
      if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [active, item.value]);

  return (
    <span className="impact-counter__value" aria-hidden="true">
      {new Intl.NumberFormat(locale).format(displayValue)}{item.suffix}
    </span>
  );
};

const ImpactCounters = ({ items, locale }: ImpactCountersProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={containerRef} className={`impact-counters${isVisible ? " is-visible" : ""}`}>
      {items.map((item) => {
        const finalValue = `${new Intl.NumberFormat(locale).format(item.value)}${item.suffix ?? ""}`;
        return (
          <article className="impact-counter" key={item.label} aria-label={`${finalValue} ${item.label}`}>
            <AnimatedValue active={isVisible} item={item} locale={locale} />
            <span className="impact-counter__label" aria-hidden="true">{item.label}</span>
          </article>
        );
      })}
    </div>
  );
};

export default ImpactCounters;
