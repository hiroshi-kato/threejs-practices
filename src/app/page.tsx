import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Three.js Practices</h1>
      <ul className={styles.list}>
        {/* /textへのリンクを作成 */}
        <li>
          <Link href='/3d-text' prefetch={false}>
            3D-Text
          </Link>
        </li>
      </ul>
    </main>
  );
}
