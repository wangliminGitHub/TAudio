/*
 * @Author: princemwang
 * @Date: 2022-08-01 15:36:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-04 14:20:34
 */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { setAudioTime, handleType, hoverHandle } from '../utils';
import { HandleOptions } from '../types';

type AudioRefType = React.RefObject<HTMLAudioElement>;

export const useTimeUpdate = (audioRef: AudioRefType) => {
  const [currentTime, setCurrentTime] = useState('0:00');
  const [audioTotalDuration, setAudioTotalDuration] = useState('0:00');
  useLayoutEffect(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    const timeupdate = () => {
      const curentText = setAudioTime(audioDom.currentTime);
      setCurrentTime(curentText);
    };
    const durationchange = () => {
      let hour = '';
      // 可以显示播放时长了
      const minutes = parseInt(String(audioDom.duration / 60), 10);
      const durationText = setAudioTime(audioDom.duration);
      if (minutes > 60) {
        hour = String(parseInt(String(minutes / 60), 10));
      }
      const curentText = hour ? '00:00:00' : '00:00';
      setCurrentTime(curentText);
      setAudioTotalDuration(durationText);
    };
    audioDom.addEventListener('durationchange', durationchange, { once: true });
    audioDom.addEventListener('timeupdate', timeupdate);
    return () => {
      audioDom.removeEventListener('timeupdate', timeupdate);
    };
  }, [audioRef]);
  return [currentTime, audioTotalDuration];
};
export const useAudioState = (audioRef: AudioRefType) => {
  const [state, setState] = useState<'loading' | 'play' | 'pause'>('loading');
  useLayoutEffect(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    const play = () => {
      setState('play');
    };
    const pause = () => {
      setState('pause');
    };
    const canplay = () => {
      setState('pause');
    };
    audioDom.addEventListener('canplay', canplay, { once: true });
    audioDom.addEventListener('play', play);
    audioDom.addEventListener('pause', pause);
    // audioDom.addEventListener('durationchange', canplay);
    return () => {
      audioDom.removeEventListener('play', play);
      audioDom.removeEventListener('pause', pause);
      audioDom.removeEventListener('canplay', canplay);
    };
  }, [audioRef]);
  return [state, setState];
};
export const useClickMoveUp = (
  targetRef: React.RefObject<HTMLDivElement>,
  handleOptions: HandleOptions,
) => {
  useLayoutEffect(() => {
    const progressDom = targetRef.current;
    if (!progressDom) return;
    const handleMove = (event: any) => {
      handleOptions?.move?.(event);
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (!isMobile && event.preventDefault) {
        event.preventDefault();
      }
      return false;
    };
    const handleEnd = (event: any) => {
      handleOptions?.end?.(event);
      document.removeEventListener(handleType.move, handleMove);
      document.removeEventListener(handleType.end, handleEnd);
    };
    const handleStart = (event: any) => {
      handleOptions?.start?.(event);
      document.addEventListener(handleType.move, handleMove);
      document.addEventListener(handleType.end, handleEnd);
    };
    progressDom.addEventListener(handleType.start, handleStart);
    return () => {
      progressDom.removeEventListener(handleType.start, handleStart);
      document.removeEventListener(handleType.end, handleEnd);
      document.removeEventListener(handleType.move, handleMove);
    };
  }, [targetRef, handleOptions]);
};
interface StartPostion {
  startX: number;
  startY: number;
}
export const useClientpostion = (
  progressRef: React.RefObject<HTMLElement>,
  startPostion?: StartPostion,
) => {
  const [postion, setPostion] = useState({
    x: startPostion?.startX || 0,
    y: startPostion?.startY || 0,
  });
  useLayoutEffect(() => {
    const progressDom = progressRef.current;
    if (!progressDom) return;
    let left = 0;
    let top = 0;

    const getClient = (event: any) => {
      const clientX = event.clientX ?? event.touches[0].clientX;
      const clientY = event.clientY ?? event.touches[0].clientY;
      let postionX = clientX - left;
      let postionY = clientY - top;
      if (postionY < 0) {
        postionY = 0;
      }
      if (postionX < 0) {
        postionX = 0;
      }
      const postion = { x: postionX, y: postionY };
      setPostion(postion);
    };
    const handleMove = (event: any) => {
      getClient(event);
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      if (!isMobile && event.preventDefault) {
        event.preventDefault();
      }
      return false;
    };
    const handleEnd = () => {
      document.removeEventListener(handleType.move, handleMove);
      document.removeEventListener(handleType.end, handleEnd);
    };
    const handleStart = (event: any) => {
      const { x, y } = progressDom.getBoundingClientRect();
      left = x;
      top = y;
      getClient(event);
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
  return postion;
};
export const useHover = (targetRef: React.RefObject<HTMLElement>) => {
  const [isHover, setIsHover] = useState(false);
  useLayoutEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    const handleEnter = () => {
      setIsHover(true);
    };
    const handleLeave = () => {
      setIsHover(false);
    };
    target.addEventListener(hoverHandle.enter, handleEnter);
    target.addEventListener(hoverHandle.leave, handleLeave);
    return () => {
      target.removeEventListener(hoverHandle.enter, handleEnter);
      target.removeEventListener(hoverHandle.leave, handleLeave);
    };
  }, [targetRef]);
  return isHover;
};
export const usePlayWidth = (
  progressRef: React.RefObject<HTMLElement>,
  audioRef: AudioRefType,
  x: number,
) => {
  const [playedW, setPlayW] = useState('0%');
  useEffect(() => {
    const progressDom = progressRef.current;
    if (!progressDom) return;
    const w = progressDom.clientWidth;
    let percentage = x / w;
    let fiexdOne = Number(percentage.toFixed(4)) * 100;
    if (fiexdOne > 100) {
      fiexdOne = 100;
    }
    if (fiexdOne < 0) {
      fiexdOne = 0;
    }
    const progessWidth = `${fiexdOne}%`;
    if (audioRef.current) {
      if (percentage === 0) {
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.currentTime = audioRef.current.duration * percentage;
      }
    }
    setPlayW(progessWidth);
  }, [x, progressRef, audioRef]);
  useLayoutEffect(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    const timeupdate = () => {
      const curentTime = parseInt(String(audioDom.currentTime), 10);
      const totalTime = parseInt(String(audioDom.duration), 10);
      const percentage = curentTime / totalTime;
      const progess = Number(percentage.toFixed(4)) * 100;
      setPlayW(`${progess}%`);
    };
    audioDom.addEventListener('timeupdate', timeupdate);
    return () => {
      audioDom.removeEventListener('timeupdate', timeupdate);
    };
  }, [audioRef]);
  return playedW;
};
export const useLoadedWidth = (audioRef: AudioRefType) => {
  const [width, setWidth] = useState('0%');
  useLayoutEffect(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    const canplay = () => {
      const percentage = audioDom.buffered.length
        ? audioDom.buffered.end(audioDom.buffered.length - 1) / audioDom.duration
        : 0;
      setWidth(`${percentage}%`);
    };
    audioDom.addEventListener('canplay', canplay);
    const progress = () => {
      const percentage = audioDom.buffered.length
        ? audioDom.buffered.end(audioDom.buffered.length - 1) / audioDom.duration
        : 0;
      setWidth(`${percentage}%`);
    };
    audioDom.addEventListener('progress', progress);
    return () => {
      audioDom.removeEventListener('progress', progress);
      audioDom.removeEventListener('canplay', canplay);
    };
  }, [audioRef]);
  return width;
};
export const useVolumeState = (
  audioRef: AudioRefType,
  muted: boolean,
  volume: number,
): [s: { muted: boolean; volume: number }, d: any] => {
  const [volumeState, setVolumeState] = useState<{ muted: boolean; volume: number }>({
    muted,
    volume: muted ? 0 : volume,
  });
  useLayoutEffect(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    if (muted) {
      audioDom.volume = 0;
    } else {
      audioDom.volume = volume;
    }
    audioDom.muted = muted;
    const volumechange = () => {
      const { muted, volume } = audioDom;
      setVolumeState({ muted, volume });
    };
    audioDom.addEventListener('volumechange', volumechange);
    return () => {
      audioDom.removeEventListener('volumechange', volumechange);
    };
  }, [audioRef, muted, volume]);
  return [volumeState, setVolumeState];
};
