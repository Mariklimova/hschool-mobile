import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path transform="matrix(0 -1 -1 0 24 24)" fill="#fff" d="M0 0H24V24H0z" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.014 2.767c.365-.877 1.607-.877 1.972 0l1.924 4.618a1 1 0 00.923.615h5.06c.93 0 1.396 1.125.738 1.783l-4.092 4.092a1 1 0 00-.254.982l1.623 5.68c.274.959-.796 1.74-1.626 1.186l-4.727-3.151a1 1 0 00-1.11 0l-4.72 3.146c-.832.555-1.905-.228-1.63-1.19l1.62-5.671a1 1 0 00-.254-.982L2.389 9.803C1.723 9.138 2.194 8 3.135 8h5.032a1 1 0 00.923-.615l1.924-4.618z"
        fill="#323232"
      />
    </Svg>
  )
}

export default SvgComponent
