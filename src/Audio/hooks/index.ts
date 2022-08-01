/*
 * @Author: princemwang
 * @Date: 2022-08-01 15:36:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-01 18:20:47
 */
import React, { useState, useLayoutEffect } from 'react';
import { setAudioTime } from '../utils';

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
    audioDom.addEventListener('canplay', canplay);
    audioDom.addEventListener('play', play);
    audioDom.addEventListener('pause', pause);
  }, [audioRef]);
  return [state, setState];
};
