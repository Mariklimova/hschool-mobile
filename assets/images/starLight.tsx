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
      <Path
        d="M20.924 9.076l-.03.03-4.062 4.062a2 2 0 00-.509 1.964l1.623 5.68a.072.072 0 01-.109.08l-.018-.013-4.71-3.14a2 2 0 00-2.218 0l-4.72 3.147a.075.075 0 01-.115-.083l.008-.027 1.613-5.644a2 2 0 00-.51-1.964L3.136 9.135l-.04-.04A.056.056 0 013.136 9h5.032a2 2 0 001.846-1.23l1.924-4.619a.068.068 0 01.126 0l1.924 4.618A2 2 0 0015.833 9h5.06c.04 0 .06.048.031.076z"
        stroke="#323232"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
