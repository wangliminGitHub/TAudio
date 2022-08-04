/*
 * @Author: princemwang
 * @Date: 2022-08-01 18:39:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-03 16:47:50
 */
import React, { useRef, useMemo } from 'react';
import { useClientpostion, useHover, usePlayWidth, useClickMoveUp } from '../hooks';
import './style.css';

export const Progress = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const postion = useClientpostion(progressRef);
  const isPlay = useRef(true);
  useClickMoveUp(progressRef, {
    start: () => {
      if (!audioRef.current?.paused) {
        isPlay.current = false;
        audioRef.current?.pause();
      }
    },
    end: () => {
      if (!isPlay.current && audioRef.current?.paused) {
        audioRef.current?.play();
        isPlay.current = true;
      }
    },
  });
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
