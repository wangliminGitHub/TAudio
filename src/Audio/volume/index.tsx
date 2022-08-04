/*
 * @Author: princemwang
 * @Date: 2022-08-03 09:47:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-04 14:22:08
 */
import React, { useCallback, useRef, useMemo, useState, useEffect, useLayoutEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { VolumeProps } from '../types';
import { MuteSvg } from '../svgCom/Mute';
import { MutedSvg } from '../svgCom/Muted';
import { useVolumeState, useClientpostion, useHover } from '../hooks';
import './style.css';

export const Volume = ({
  type = 'vertical',
  layoutSize = 100,
  audioRef,
  muted = false,
  volume = 0.5,
}: VolumeProps) => {
  const [volumeBarWidth, setVolumeBarWidth] = useState('100%');
  const [verticalProgressHeight, setVerticalProgressHeight] = useState('0%');
  const [volumeVDisplay, setVolumeVDisplay] = useState<'none' | 'block'>('none');
  const volumeSizeRef = useRef(1);
  const [volumeState] = useVolumeState(audioRef, muted, volume);
  const volumeVRef = useRef<HTMLDivElement>(null);
  const postion = useClientpostion(volumeVRef, {
    startX: layoutSize * volume,
    startY: layoutSize * volume,
  });
  const volumeIconRef = useRef<HTMLDivElement>(null);
  const isHoverBtn = useHover(volumeIconRef);
  const controlMaskRef = useRef<HTMLDivElement>(null);
  const volumeHorizontalBarRef = useRef<HTMLDivElement>(null);
  const volumeHorizontalBarPostion = useClientpostion(volumeHorizontalBarRef, {
    startX: layoutSize * volume,
    startY: layoutSize * volume,
  });
  const isHoverMask = useHover(controlMaskRef);
  const setVolume = useCallback(() => {
    const audioDom = audioRef.current;
    if (!audioDom) return;
    audioDom.muted = !volumeState.muted;
    if (audioDom.muted) {
      volumeSizeRef.current = audioDom.volume;
      audioDom.volume = 0;
    } else {
      if (volumeSizeRef.current === 0) {
        volumeSizeRef.current = 1;
      }
      audioDom.volume = volumeSizeRef.current;
    }
    const percentage = `${audioDom.volume * 100}%`;
    setVerticalProgressHeight(percentage);
  }, [volumeState.muted, audioRef]);
  const mutedChange = useCallback(
    (event: any) => {
      if (type === 'vertical') {
        if (volumeVDisplay === 'none') {
          setVolumeVDisplay('block');
        } else {
          setVolume();
        }
      } else {
        setVolume();
      }
      if (!isMobile && event.preventDefault) {
        event.preventDefault();
      }
      return false;
    },
    [type, volumeVDisplay, setVolume],
  );
  useEffect(() => {
    if (type === 'vertical') return;
    let width = 0;
    const audioDom = audioRef.current;
    if (!audioDom) return;
    const { muted, volume } = volumeState;
    if (muted) {
      width = 0;
    } else {
      width = volume * 100;
    }
    setVolumeBarWidth(`${width}%`);
  }, [volumeState, type]);

  const progressSize = useMemo(() => {
    return layoutSize && typeof layoutSize === 'number' ? layoutSize : 100;
  }, [layoutSize]);
  useEffect(() => {
    if (type === 'vertical') return;
    const { x } = volumeHorizontalBarPostion;
    let percentage = Number((x / progressSize).toFixed(1));
    const audioDom = audioRef.current;
    if (!audioDom) return;
    if (percentage > 1) {
      percentage = 1;
    }
    audioDom.muted = false;
    if (percentage <= 0) {
      percentage = 0;
      audioDom.muted = true;
    }
    audioDom.volume = percentage;
  }, [volumeHorizontalBarPostion, progressSize, volume]);
  useEffect(() => {
    if (type === 'horizontal') return;
    let y = postion.y;
    if (y < 0) {
      y = 0;
    } else if (y > progressSize) {
      y = progressSize;
    }
    const defference = progressSize - y;
    const percentage = (defference / progressSize) * 100;
    setVerticalProgressHeight(`${percentage}%`);
    const volume = Number((defference / progressSize).toFixed(1));
    const audioDom = audioRef.current;
    if (audioDom) {
      audioDom.volume = volume;
      if (volume === 0) {
        audioDom.muted = true;
      } else {
        audioDom.muted = false;
      }
    }
  }, [postion.y, progressSize, type]);
  useEffect(() => {
    if (isMobile && type === 'horizontal') return;
    const timeOut = setTimeout(() => {
      if (!isHoverBtn && !isHoverMask && volumeVDisplay === 'block') {
        setVolumeVDisplay('none');
      }
      clearTimeout(timeOut);
    });
    return () => {
      clearTimeout(timeOut);
    };
  }, [isHoverBtn, isHoverMask, volumeVDisplay, type]);
  const audioClass = useMemo(() => {
    let className = 'audio-volume';
    if (type === 'horizontal') {
      className = 'audio-volume audio-volume-horizontal';
    } else {
      className = 'audio-volume audio-volume-vertical';
    }
    return className;
  }, [type]);

  return (
    <div className={audioClass}>
      <div className="volmne-icon" onClick={mutedChange} ref={volumeIconRef}>
        {volumeState.volume > 0 ? <MutedSvg></MutedSvg> : <MuteSvg></MuteSvg>}
      </div>
      {type === 'horizontal' && (
        <div
          ref={volumeHorizontalBarRef}
          className="volume-control volume-control-horizontal"
          style={{ width: `${progressSize}px` }}
        >
          <div className="volume-progress" style={{ width: `${progressSize}px` }}>
            <div className="volume-mute-progress" style={{ width: volumeBarWidth }}>
              <span className="volume-bar"></span>
            </div>
          </div>
        </div>
      )}
      {type === 'vertical' && (
        <div
          className="volume-control-mask"
          style={{ display: volumeVDisplay }}
          ref={controlMaskRef}
        >
          <div className="volume-control-vertical">
            <div className="progress-content" ref={volumeVRef}>
              <div className="vertical-progress" style={{ height: `${progressSize}px` }}>
                <div className="vertical-mute-progress" style={{ height: verticalProgressHeight }}>
                  <span className="vertical-mute-bar"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
