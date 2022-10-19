import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

type LogoProps = {
  size?: number
} & Omit<SvgProps, 'width' | 'height'>

const Logo = ({ size = 60, ...props }: LogoProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    // xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41.656 25.3h-.003l-13.275-.006c1.485-1.462 2.41-3.41 3.257-5.198 1.2-2.53 2.235-4.716 4.442-5.428.441-.14.9-.216 1.362-.228.06-.002.12-.01.177-.021l4.044.006a5.39 5.39 0 0 1 3.833 1.605 5.413 5.413 0 0 1 1.594 3.845 5.432 5.432 0 0 1-5.431 5.425Zm-5.575 17.653c-.002 2.998-2.438 5.442-5.43 5.442h-.004c-2.995 0-5.429-2.45-5.427-5.448l.01-15.432 10.861.01-.01 15.428ZM23.588 25.291l-4.795-.002a5.382 5.382 0 0 1-3.833-1.596 5.421 5.421 0 0 1-1.594-3.85c.002-2.997 2.438-5.452 5.43-5.452h.004l13.715.02c-1.245 1.312-2.066 3.044-2.87 4.74-1.187 2.504-2.308 4.87-4.674 5.794-.445.172-.91.288-1.383.346Zm27.535-16.48C45.473 3.146 37.957 0 29.96 0h-.022c-7.989 0-15.5 3.127-21.154 8.782C3.125 14.44.006 21.975 0 29.983c-.005 8.01 3.104 15.547 8.755 21.214C14.405 56.864 21.921 60 29.918 60h.02c7.99 0 15.502-3.116 21.156-8.77 5.658-5.66 8.777-13.188 8.783-21.196.006-8.009-3.103-15.556-8.754-21.222v-.001Z"
      fill="#E65D7B"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41.698 17.368a2.225 2.225 0 0 0-2.224 2.225c0 1.23.994 2.227 2.222 2.228a2.225 2.225 0 0 0 .002-4.453Z"
      fill="#E65D7B"
    />
  </Svg>
)

export default React.memo(Logo)
