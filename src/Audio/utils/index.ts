/*
 * @Author: princemwang
 * @Date: 2022-08-01 12:23:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-12 17:27:25
 */
import React from 'react';
import { isMobile } from 'react-device-detect';

export const judgeChildren = (children: any): boolean => {
  const types = ['null', 'undefined', 'string', 'number', 'boolean'];
  let isElement = true;
  React.Children.forEach(children, (child) => {
    console.log(child, 'child');
    if (types.includes(typeof child)) {
      isElement = false;
    }
  });
  if (!isElement) return isElement;
  if (children && React.Children.count(children) === 1 && typeof children === 'function')
    return true;
  return false;
};
export const renderChildren = (children: React.ReactElement) => {
  return React.Children.map(children.props.children, (child) => {
    return React.cloneElement(child, {}, child.props.children);
  });
};
export const setAudioTime = (time: number) => {
  let hourText = '';
  let minuteText = '';
  let secondText = '';
  const hours = time / 3600;
  if (hours > 1) {
    const hour = parseInt(String(hours), 10);
    if (hour < 10) {
      hourText = `0${String(hour)}`;
    } else {
      hourText = String(hour);
    }
  }
  if (time > 60) {
    const minutes = time / 60;
    const residue = parseInt(String(minutes % 60), 10);
    if (residue < 10) {
      minuteText = `0${String(residue)}`;
    } else {
      minuteText = String(residue);
    }
  } else {
    minuteText = '00';
  }
  const seconds = time % 60;
  if (seconds < 10) {
    secondText = `0${parseInt(String(seconds), 10)}`;
  } else {
    secondText = String(parseInt(String(seconds), 10));
  }
  const timeText = hourText
    ? `${hourText}:${minuteText}:${secondText}`
    : `${minuteText}:${secondText}`;
  return timeText;
};
export const handleType = {
  start: isMobile ? 'touchstart' : 'mousedown',
  move: isMobile ? 'touchmove' : 'mousemove',
  end: isMobile ? 'touchend' : 'mouseup',
};
export const hoverHandle = {
  enter: isMobile ? 'touchstart' : 'mouseenter',
  leave: isMobile ? 'touchend' : 'mouseleave',
};
