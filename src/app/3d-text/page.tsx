'use client';

import { useEffect } from 'react';
import styles from './page.module.css';

export default function Text() {
  const script = import('./script.js');
  useEffect(() => {
    // script.jsを読み込む
    const script = document.createElement('script');
    script.src = String(script);
    script.async = true;
    script.defer = true;
    // script.jsを読み込んだら、script.jsの中で定義された関数を実行する
    script.onload = () => {
      document.body.appendChild(script);
    };
  }, []);
  return (
    <canvas className={styles.webgl} id='webgl'>
      Text
    </canvas>
  );
}
