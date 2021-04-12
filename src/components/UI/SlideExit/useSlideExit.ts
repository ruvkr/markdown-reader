import { useRef, useEffect, useState, useCallback } from 'react';
import { MotionValue, useMotionValue } from 'framer-motion';
import { Pan, PanDirections, PanInterface } from '../../../libs/pan';
import { Spring, SpringInterface } from '../../../libs/spring';
import { useWindowResize } from '../../../hooks/useWindowResize';

export function useSlideExit(configs: {
  containerRef: React.MutableRefObject<HTMLElement | null>;
  startRange?: (width: number) => number;
  onOpen?: () => void;
  onClose?: () => void;
}): {
  motionX: MotionValue<number>;
  progress: MotionValue<number>;
  exit: () => void;
} {
  const { containerRef, onOpen, onClose, startRange } = configs;
  const getStartRange = useRef(startRange);
  const [width, setWidth] = useState(window.innerWidth);
  const openedRef = useRef(false);
  const willOpenRef = useRef(true);
  const panRef = useRef<PanInterface | null>(null);
  const springRef = useRef<SpringInterface | null>(null);
  const motionX = useMotionValue<number>(width);
  const progress = useMotionValue<number>(0);
  const toggleRef = useRef<(() => void) | null>(null);
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);

  // update callbacks
  useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    getStartRange.current = startRange;
  }, [onOpen, onClose, startRange]);

  // initializations
  useEffect(() => {
    if (!containerRef.current) return;
    panRef.current = Pan(containerRef.current).add();
    springRef.current = Spring();
    const timeout = window.setTimeout(springRef.current.start);

    return () => {
      window.clearTimeout(timeout);
      if (!panRef.current || !springRef.current) return;
      springRef.current.stop();
      panRef.current.remove();
    };
  }, [containerRef]);

  // sliding
  useEffect(() => {
    if (!panRef.current || !springRef.current) return;
    const spring = springRef.current;
    const pan = panRef.current;
    let currentValue = motionX.get();
    let clamped = false;

    if (!spring.isAnimating()) {
      currentValue = openedRef.current ? 0 : width;
      motionX.set(currentValue);
      progress.set(openedRef.current ? 1 : 0);
    }

    pan.update({
      panDirection: PanDirections.right,

      // check if pan should start
      onPanStart: info => {
        if (!openedRef.current) return true;
        const startRange = getStartRange.current
          ? getStartRange.current(width)
          : width;
        if (openedRef.current && info.start.sx < startRange) return true;
        return false;
      },

      onPanMove: info => {
        spring.stop();
        const newValue = currentValue + info.delta.dx;
        currentValue = clamp(0, width, newValue);
        clamped = newValue !== currentValue;
        motionX.set(currentValue);
        progress.set(1 - currentValue / width);
      },

      onPanEnd: info => {
        const velocity = clamped ? 0 : info.velocity.vx;
        let change =
          (!willOpenRef.current && info.direction === PanDirections.left) ||
          (willOpenRef.current && info.direction === PanDirections.right);
        snap(change, velocity);
        clamped = false;
      },
    });

    spring.update({
      from: currentValue,
      to: willOpenRef.current ? 0 : width,
      stiffness: 400,
      damping: 40,

      onUpdate: value => {
        currentValue = value;
        motionX.set(currentValue);
        progress.set(1 - currentValue / width);
      },

      onComplete: () => {
        !willOpenRef.current && onCloseRef.current && onCloseRef.current();
        if (willOpenRef.current === openedRef.current) return;
        openedRef.current = willOpenRef.current;
        willOpenRef.current && onOpenRef.current && onOpenRef.current();
      },
    });

    const snap = (change: boolean = false, initialVelocity?: number) => {
      if (change) willOpenRef.current = !willOpenRef.current;
      spring.set({
        from: currentValue,
        to: willOpenRef.current ? 0 : width,
        initialVelocity,
      }) && spring.start();
    };

    toggleRef.current = () => snap(true);
  }, [width, motionX, progress]);

  useWindowResize(() => setWidth(window.innerWidth), 100);

  const exit = useCallback(() => {
    if (!toggleRef.current) return;
    toggleRef.current();
  }, []);

  return { motionX, progress, exit };
}

const clamp = (min: number, max: number, value: number): number => {
  return Math.min(Math.max(value, min), max);
};
