import styles from "./BannerDecorations.module.css";

const BULBS = Array.from({ length: 15 }, (_, index) => {
  const position = (index + 1) / 16;

  return {
    left: `${position * 100}%`,
    top: `${((1 + 120 * position * (1 - position)) / 48) * 100}%`,
  };
});

function HangingDiya({ id, className }) {
  return (
    <div className={`${styles.diya} ${className}`}>
      <svg
        className={styles.diyaArt}
        width="64"
        height="128"
        viewBox="0 0 64 128"
        fill="none"
        focusable="false"
      >
        <defs>
          <radialGradient id={`${id}-glow`}>
            <stop stopColor="#FFF0B5" stopOpacity=".65" />
            <stop offset=".38" stopColor="#FFD268" stopOpacity=".3" />
            <stop offset="1" stopColor="#EAB34D" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${id}-bowl`}
            x1="32"
            y1="99"
            x2="32"
            y2="121"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFDA72" />
            <stop offset=".45" stopColor="#DEA02F" />
            <stop offset="1" stopColor="#A65D19" />
          </linearGradient>
          <linearGradient
            id={`${id}-flame`}
            x1="32"
            y1="73"
            x2="32"
            y2="97"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFBE4" />
            <stop offset=".5" stopColor="#FFE99B" />
            <stop offset="1" stopColor="#F0B942" />
          </linearGradient>
        </defs>

        <path
          d="M32 0V74"
          stroke="#E9BB59"
          strokeWidth="1"
          strokeDasharray="2 2.5"
          strokeLinecap="round"
        />
        <ellipse cx="32" cy="102" rx="32" ry="26" fill={`url(#${id}-glow)`} />
        <ellipse cx="32" cy="86" rx="15" ry="22" fill={`url(#${id}-glow)`} />

        <path
          d="M32 73C31 79 25 84 27.5 91C29 95 35 95 36.5 90.5C38.5 84 33 78 32 73Z"
          fill={`url(#${id}-flame)`}
        />
        <path
          d="M32 82C29.5 87 29.5 91 32 92.5C34.5 91 34 87 32 82Z"
          fill="#FFFDEA"
        />
        <path
          d="M32 94L31.5 101"
          stroke="#95601C"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M9 103C12 115 20 121 32 121C44 121 52 115 55 103H9Z"
          fill={`url(#${id}-bowl)`}
          stroke="#FFDC83"
          strokeWidth="1.4"
        />
        <ellipse
          cx="32"
          cy="103"
          rx="23"
          ry="5.5"
          fill="#C78624"
          stroke="#FFE6A0"
          strokeWidth="1.5"
        />
        <path
          d="M15 110C23 117 41 117 49 110"
          stroke="#FFE29B"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M22 118C28 120 36 120 42 118"
          stroke="#F5C76A"
          strokeWidth=".8"
          strokeLinecap="round"
        />
        <path
          d="M18 102C25 100 39 100 46 102"
          stroke="#FFF0B5"
          strokeWidth=".8"
          strokeLinecap="round"
          opacity=".8"
        />
      </svg>
    </div>
  );
}

export default function BannerDecorations() {
  return (
    <div className={styles.decorations} aria-hidden="true">
      <div className={styles.strings}>
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className={styles.garland}>
            <svg
              className={styles.wire}
              viewBox="0 0 200 48"
              preserveAspectRatio="none"
              fill="none"
              focusable="false"
            >
              <path
                d="M0 1Q100 61 200 1"
                stroke="#E3B556"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {BULBS.map((position, bulbIndex) => (
              <span key={bulbIndex} className={styles.bulb} style={position} />
            ))}
          </div>
        ))}
      </div>
      <div className={`${styles.diyaPair} ${styles.leftPair}`}>
        <HangingDiya id="home-banner-left-diya" className={styles.mainDiya} />
        <HangingDiya
          id="home-banner-left-companion"
          className={styles.companionDiya}
        />
      </div>
      <div className={`${styles.diyaPair} ${styles.rightPair}`}>
        <HangingDiya id="home-banner-right-diya" className={styles.mainDiya} />
        <HangingDiya
          id="home-banner-right-companion"
          className={styles.companionDiya}
        />
      </div>
    </div>
  );
}
