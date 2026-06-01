'use client';
import { useRef, useCallback } from 'react';

export function useVideoHover() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.ended) {
      video.pause();
    }
  }, []);

  const handleMouseEnterModal = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return { videoRef, handleMouseEnter, handleMouseLeave, handleMouseEnterModal };
}
