/*
 * @Author: princemwang
 * @Date: 2022-08-01 18:18:13
 * @LastEditors:
 * @LastEditTime: 2022-08-01 18:21:55
 */
import React, { RefObject } from 'react';
import { useTimeUpdate } from '../hooks';

export const PlayTime = ({ audioRef }: { audioRef: RefObject<HTMLAudioElement> }) => {
  const [curTime, durTime] = useTimeUpdate(audioRef);
  return <div className="audio-time">{`${curTime}/${durTime}`}</div>;
};
