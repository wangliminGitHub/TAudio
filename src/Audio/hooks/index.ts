/*
 * @Author: princemwang
 * @Date: 2022-08-01 15:36:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-02 17:08:39
 */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { setAudioTime, handleType, hoverHandle } from '../utils';

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
export const useClientpostion = (
  progressRef: React.RefObject<HTMLElement>,
  audioRef: AudioRefType,
) => {
  const [postion, setPostion] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const progressDom = progressRef.current;
    if (!progressDom) return;
    let isPlay = true;
    const getClient = (event: any) => {
      const clientX = event.clientX ?? event.touches[0].clientX;
      const clientY = event.clientY ?? event.touches[0].clientY;
      const { x } = progressDom.getBoundingClientRect();
      const postionX = clientX - x;
      setPostion({ x: postionX, y: clientY });
    };
    const handleMove = (event: any) => {
      getClient(event);
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      event.preventDefault();
      return false;
    };
    const handleEnd = (event: any) => {
      if (!isPlay && audioRef.current?.paused) {
        audioRef.current?.play();
        isPlay = true;
      }
      document.removeEventListener(handleType.move, handleMove);
      document.removeEventListener(handleType.end, handleEnd);
      getClient(event);
    };
    const handleStart = (event: any) => {
      getClient(event);
      if (!audioRef.current?.paused) {
        isPlay = false;
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
      console.log('****');
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
