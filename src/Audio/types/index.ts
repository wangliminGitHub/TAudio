import React from 'react';

/*
 * @Author: princemwang
 * @Date: 2022-08-01 11:51:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-03 17:32:45
 */
export interface TaudioProps extends React.MediaHTMLAttributes<HTMLAudioElement> {
  /**
   * 音频地址
   */
  src: string;
  crossOriginIsolated?: string;
}
export interface VolumeProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  /**
   * 音频控件的展示方向，默认横向展示（horizontal）
   */
  type?: 'vertical' | 'horizontal';
  /**
   * 音频控件进度条的宽度或者高度，默认值100px
   */
  layoutSize?: number;
  /**
   * 默认的音量大小，大小范围0～1，默认最大音量1
   */
  volume?: number;
  /**
   * 是否静音，默认不静音
   */
  muted?: false;
}
export interface HandleOptions {
  /**
   * pc（mousedown）mobile (touchstart)
   */
  start?: (event: any) => void;
  /**
   * pc (mousemove) mobile (touchmove)
   */
  move?: (event: any) => void;
  /**
   * pc (mouseup) mobile (touchend)
   */
  end?: (event: any) => void;
}
