/*
 * @Author: princemwang
 * @Date: 2022-08-01 18:18:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-04 11:39:37
 */
import React, { RefObject } from 'react';
import { useTimeUpdate } from '../hooks';
import './style.css';

export const PlayTime = ({ audioRef }: { audioRef: RefObject<HTMLAudioElement> }) => {
  const [curTime, durTime] = useTimeUpdate(audioRef);
  return <div className="audio-time">{`${curTime}/${durTime}`}</div>;
};
