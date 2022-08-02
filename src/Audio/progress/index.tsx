/*
 * @Author: princemwang
 * @Date: 2022-08-01 18:39:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-02 17:29:36
 */
import React, { useRef, useMemo } from 'react';
import { useClientpostion, useHover, usePlayWidth, useLoadedWidth } from '../hooks';
import './style.css';

export const Progress = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const postion = useClientpostion(progressRef, audioRef);
  const loadedW = useLoadedWidth(audioRef);
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
