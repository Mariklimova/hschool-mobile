import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      fill="#000"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.355 511.355"
      xmlSpace="preserve"
      {...props}
    >
      <Path d="M475.074 72.424c-35.157-37.675-74.048-56.768-115.605-56.768-42.197 0-78.976 18.923-103.744 52.139C231 34.579 194.349 15.656 152.28 15.656c-41.344 0-79.083 18.496-115.456 56.576-42.369 44.438-60.78 146.304 14.932 222.016C84.78 327.272 238.935 487.55 240.492 489.15a21.405 21.405 0 0015.381 6.549 21.405 21.405 0 0015.381-6.549c1.557-1.6 155.712-161.877 188.736-194.901 74.988-74.987 56.94-177.025 15.084-221.825z" />
    </Svg>
  )
}

export default SvgComponent
