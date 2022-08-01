/*
 * @Author: princemwang
 * @Date: 2022-08-01 11:51:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-01 14:55:30
 */
export interface TaudioProps extends React.MediaHTMLAttributes<HTMLAudioElement> {
  /**
   * 音频地址
   */
  src: string;
  crossOriginIsolated?: string;
}
