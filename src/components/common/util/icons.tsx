import { cn } from '@/lib/utils';
import { AiFillHome } from 'react-icons/ai';

export type IconProps = {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  dimension?: number;
  onClick?: () => void;
};

function extractDimensions({
  dimension,
  width,
  height,
}: IconProps): [number?, number?] {
  if (dimension) return [dimension, dimension];
  return [width, height];
}

export function AppleIcon({ className, ...props }: IconProps) {
  const [w, h] = extractDimensions(props);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" fill="url(#pattern0_9_56)" />
      <defs>
        <pattern
          id="pattern0_9_56"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_9_56" transform="scale(0.0208333)" />
        </pattern>
        <image
          id="image0_9_56"
          width="48"
          height="48"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACmklEQVR4AeXBMWhcZQAA4O/+d4PIU0IJNkiHDBULOlSQEvQGKWJDaDFDsW+oEBGkg4ODgptIFQsW2kVxKaZQIZUeXKcroqhb0VQUHDKcq0Q5odRDTjmDQwdp8/6791Ly3kG/r6E+Kc7hKG7iAs4qKVGPFF0sI8UsXsBvWFdCUL0UXbRsd0pJQbVSdNGSr6mkoDopumiJW1NSUI0UXbTEtXFGSUE1LqElro0MIyUFu28WL4prI8PIDgS7rymujQwjOxTsvk18Zbs2Mozcg0Q1vsBjOIABPsTrGLnfJe5dikcxwJbiZvEIZtw2tAMN5T2ADCewgBn/6+M62riCgTs9jVexiHl32sA1XMDPCmooZwUfYM5kfbyPS5jDaSybbIRVvIWbJmgoJsWnOK46PRzDhjESk6XoYlG19uA4LuOWiMRkF7GkHimewUVsyRGMlyFTrwWcFBHENXHadBiJaIrLsF+92jiL6yKa4k6pzwCv4IoJmvLtw7Pq8zI6CgjyLarPZ+goKMh3UH3OKyHI96R6/IF1JQT55tWjp6RgujSVFEyXx9FUQpBvqB4pnldCkK+nPu8oIZHvEBbUYx8a+EYBiXz7saQ+z2EWX2NkjES+B7GiXodwEg/hL/yOLXdJ5NvE2wjqNYPDeA1P4HN3CfIN8a3pMi9HENcxXTpyBHFrGJoea3IEcX1cNR1uoCdHMN4Z0+E9EcF4P+Kyev2EjohgsjcxUJ83jJGY7Bb+xJLqfYSPjZEo5js8hQOqs4ET+McYieKuYRmzdl8fR/CrCRLFDXEVL+FhxfTxPf7FHsUMcAw/KKChvDms4oi4Id7FeQzdluEc5sT9ggzrCmrYuRZW0MJe/I0evsQn2LRdihUcxUHsxQA3sIZVDJXwHyU8hASRLKkuAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}

export function GoogleIcon({ className, ...props }: IconProps) {
  const [w, h] = extractDimensions(props);

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8_36)">
        <path
          d="M23.5151 12.7611C23.5151 11.795 23.4367 11.09 23.267 10.3589H12.2351V14.7194H18.7106C18.5801 15.8031 17.8751 17.435 16.3084 18.5316L16.2864 18.6776L19.7745 21.3798L20.0162 21.4039C22.2356 19.3542 23.5151 16.3383 23.5151 12.7611Z"
          fill="#4285F4"
        />
        <path
          d="M12.235 24.25C15.4074 24.25 18.0707 23.2055 20.0161 21.4039L16.3083 18.5316C15.3161 19.2236 13.9844 19.7066 12.235 19.7066C9.12777 19.7066 6.49058 17.657 5.55048 14.8239L5.4127 14.8356L1.78571 17.6425L1.73828 17.7744C3.67048 21.6127 7.63937 24.25 12.235 24.25Z"
          fill="#34A853"
        />
        <path
          d="M5.55062 14.8239C5.30255 14.0928 5.159 13.3094 5.159 12.5C5.159 11.6905 5.30257 10.9072 5.53757 10.1761L5.531 10.0204L1.85856 7.16835L1.73841 7.2255C0.942057 8.8183 0.485107 10.607 0.485107 12.5C0.485107 14.393 0.942057 16.1816 1.73841 17.7744L5.55062 14.8239Z"
          fill="#FBBC05"
        />
        <path
          d="M12.235 5.2933C14.4413 5.2933 15.9296 6.24635 16.7783 7.0428L20.0944 3.805C18.0578 1.91195 15.4074 0.75 12.235 0.75C7.63937 0.75 3.67048 3.3872 1.73828 7.2255L5.53743 10.1761C6.49058 7.34305 9.12777 5.2933 12.235 5.2933Z"
          fill="#EB4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_8_36">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FacebookIcon({ className, ...props }: IconProps) {
  const [w, h] = extractDimensions(props);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('', className)}
    >
      <path
        d="M23.75 12.5C23.75 6.01065 18.4893 0.75 12 0.75C5.51065 0.75 0.25 6.01065 0.25 12.5C0.25 18.3648 4.5468 23.2258 10.1641 24.1073V15.8965H7.18068V12.5H10.1641V9.91133C10.1641 6.96648 11.9182 5.33985 14.6022 5.33985C15.8877 5.33985 17.2324 5.56932 17.2324 5.56932V8.46095H15.7508C14.2911 8.46095 13.8359 9.36668 13.8359 10.2959V12.5H17.0947L16.5738 15.8965H13.8359V24.1073C19.4532 23.2258 23.75 18.3648 23.75 12.5Z"
        fill="#1877F2"
      />
    </svg>
  );
}

// export function HouseIcon({className, stroke, ...props}: IconProps) {
//     const [w, h] = extractDimensions(props);
//     return (
//         <svg viewBox="0 0 28 28"
//              height={h} width={w} fill={"white"} strokeWidth={2} stroke={"black"}>
//             <path
//                 d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
//         </svg>
//     )
// }
