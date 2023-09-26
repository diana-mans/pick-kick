import { useCallback, useEffect, useRef, useState } from 'react';
import cls from './Scrollbar.module.scss';

export const Scrollbar = ({ children, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startDragY, setStartDragY] = useState<number>(0);
  const [startScrollTop, setStartScrollTop] = useState<number>(0);
  const [thumbPosition, setThumbPosition] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const VISIBLE_HEIGHT = 430;
  const THUMB_HEIGHT = 42;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (thumbRef.current && thumbRef.current.contains(event.target as Node)) {
      setIsDragging(true);
      setStartDragY(event.clientY);
      setStartScrollTop(containerRef.current!.scrollTop);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const deltaY = event.clientY - startDragY;
      const scrollableHeight = containerRef.current.scrollHeight - VISIBLE_HEIGHT;
      const maxThumbPosition = VISIBLE_HEIGHT - THUMB_HEIGHT;
      const newThumbPosition = Math.min(maxThumbPosition, Math.max(0, thumbPosition + deltaY));

      const scrollRatio = scrollableHeight / maxThumbPosition;
      const newScrollTop = newThumbPosition * scrollRatio;

      containerRef.current.scrollTop = newScrollTop;
      setThumbPosition(newThumbPosition);
      setStartDragY(event.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleContainerScroll = () => {
      if (containerRef.current) {
        const scrollableHeight = containerRef.current.scrollHeight - VISIBLE_HEIGHT;
        const maxThumbPosition = VISIBLE_HEIGHT - THUMB_HEIGHT;
        const newThumbPosition =
          (containerRef.current.scrollTop / scrollableHeight) * maxThumbPosition;

        setThumbPosition(newThumbPosition);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleContainerScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleContainerScroll);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, thumbPosition]);

  return (
    <div className={cls.customScrollbarsContainer}>
      <div className={cls.customScrollbarsContent} {...props} ref={containerRef}>
        {children}
      </div>
      <div className={cls.customScrollbarsScrollbar}>
        <div className={cls.customScrollbarsTrackAndThumb}>
          <div className={cls.customScrollbarsTrack}></div>
          <div
            className={cls.customScrollbarsThumb}
            onMouseDown={(ev) => handleMouseDown(ev)}
            style={{ height: `${THUMB_HEIGHT}px`, top: `${thumbPosition}px` }}
            ref={thumbRef}></div>
        </div>
      </div>
    </div>
  );
};
