/*
 * @Author: princemwang
 * @Date: 2022-07-06 18:21:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-03 19:28:06
 */
import React from 'react';

export const MutedSvg = ({ click }: { click?: () => void }) => {
  return (
    <svg
      className="muted-icon"
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={click}
    >
      <path
        d="M5.62192 5.08477L11.4739 0.387762C11.8687 0.0708409 12.4457 0.133972 12.7626 0.528766C12.8933 0.691539 12.9644 0.894033 12.9644 1.10276V18.5891V18.589C12.9643 19.0953 12.5537 19.5054 12.0474 19.5054C11.8397 19.5054 11.6382 19.4347 11.4758 19.3051L5.46248 14.5054H0.916668H0.916668C0.410406 14.5054 0 14.095 0 13.5887V6.00148C0 5.49522 0.410406 5.08481 0.916668 5.08481H5.62192L5.62192 5.08477ZM17.3819 15.499C17.0154 15.8483 16.4352 15.8344 16.0859 15.468C15.7438 15.1092 15.749 14.5434 16.0976 14.1909C17.2784 13.035 17.9427 11.4515 17.9401 9.79919V9.79918C17.9429 8.26877 17.3729 6.79271 16.3423 5.66134C15.9974 5.29079 16.0181 4.71076 16.3887 4.3658C16.7592 4.02085 17.3393 4.0416 17.6842 4.41215C17.6892 4.41752 17.6941 4.42294 17.699 4.42842C19.0363 5.8972 19.7762 7.81281 19.7734 9.79918V9.79934C19.7759 11.9437 18.9137 13.9986 17.3817 15.4991L17.3819 15.499ZM21.7397 19.4737C21.3905 19.8403 20.8103 19.8543 20.4437 19.5051C20.0772 19.1559 20.0631 18.5757 20.4123 18.2091C20.4165 18.2047 20.4208 18.2003 20.4252 18.1959H20.4252C22.6148 15.9498 23.8381 12.9359 23.8334 9.79919C23.8334 6.68527 22.6481 3.75927 20.5554 1.53818C20.2121 1.16606 20.2355 0.586126 20.6076 0.242874C20.9744 -0.0953968 21.5443 -0.0782609 21.89 0.281432C24.3009 2.83893 25.6667 6.21227 25.6667 9.79919C25.6667 13.4613 24.2413 16.9006 21.7397 19.4737L21.7397 19.4737Z"
        fill="black"
      />
    </svg>
  );
};
