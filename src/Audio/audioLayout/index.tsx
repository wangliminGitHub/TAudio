/*
 * @Author: princemwang
 * @Date: 2022-08-01 15:27:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-03 10:53:36
 */
import React from 'react';
import { AudioBtn } from '../audioBtn';
import { PlayTime } from '../playTime';
import { Progress } from '../progress';
import { Volume } from '../volume';

export const AudioLayout = ({ audioRef }: { audioRef: React.RefObject<HTMLAudioElement> }) => {
  return (
    <div className="t-audio-layout">
      <AudioBtn audioRef={audioRef}></AudioBtn>
      <PlayTime audioRef={audioRef}></PlayTime>
      <Progress audioRef={audioRef}></Progress>
      <Volume audioRef={audioRef}></Volume>
    </div>
  );
};
