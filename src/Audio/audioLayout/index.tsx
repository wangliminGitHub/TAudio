/*
 * @Author: princemwang
 * @Date: 2022-08-01 15:27:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-01 18:22:21
 */
import React from 'react';
import { AudioBtn } from '../audioBtn';
import { PlayTime } from '../playTime';

export const AudioLayout = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  return (
    <div className="t-audio-layout">
      <AudioBtn audioRef={audioRef}></AudioBtn>
      <PlayTime audioRef={audioRef}></PlayTime>
    </div>
  );
};
