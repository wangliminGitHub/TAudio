/*
 * @Author: princemwang
 * @Date: 2022-08-01 18:39:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-04 14:16:57
 */
import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useClientpostion, useHover, usePlayWidth } from '../hooks';
import { handleType } from '../utils';
import './style.css';

export const Progress = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const isPlay = useRef(true);
  useLayoutEffect(() => {
    const progressDom = progressRef.current;
    if (!progressDom) return;
    const handleMove = (event: any) => {
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (!isMobile && event.preventDefault) {
        event.preventDefault();
      }
      return false;
    };
    const handleEnd = () => {
      if (!isPlay.current && audioRef.current?.paused) {
        audioRef.current?.play();
        isPlay.current = true;
      }
      document.removeEventListener(handleType.move, handleMove);
      document.removeEventListener(handleType.end, handleEnd);
    };
    const handleStart = () => {
      if (!audioRef.current?.paused) {
        isPlay.current = false;
        audioRef.current?.pause();
      }
      document.addEventListener(handleType.move, handleMove);
      document.addEventListener(handleType.end, handleEnd);
    };
    progressDom.addEventListener(handleType.start, handleStart);
    return () => {
      progressDom.removeEventListener(handleType.start, handleStart);
      document.removeEventListener(handleType.end, handleEnd);
      document.removeEventListener(handleType.move, handleMove);
    };
  }, [progressRef]);
  const postion = useClientpostion(progressRef);
  const isHover = useHover(progressRef);
  const playedW = usePlayWidth(progressRef, audioRef, postion.x);
  const progressName = useMemo(() => {
    let className = 'progress';
    if (isHover) {
      className = 'progress progress-hover';
    } else {
      className = 'progress';
    }
    return className;
  }, [isHover]);
  return (
    <div className={progressName} ref={progressRef}>
      <div className="progress-bar">
        {/* <div className="progress-loaded" style={{ width: loadedW }}></div> */}
        <div className="progress-played" style={{ width: playedW }}>
          <span className="progress-played-bar"></span>
        </div>
      </div>
    </div>
  );
};
