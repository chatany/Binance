import { CircularProgressbarWithChildren } from "react-circular-progressbar";

export const Progressbar = ({ value }) => {
  return (
    <CircularProgressbarWithChildren
      value={value}
      styles={{
        width: 30,
        height: 40,
        // Customize the root svg element
        root: {},
        // Customize the path, i.e. the "completed progress"
        path: {
          // Path color
          stroke: `rgba(46, 189, 133, ${value / 100})`,
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",
          // Customize transition animation
          transition: "stroke-dashoffset 0.5s ease 0s",
          // Rotate the path
        //   transform: "rotate(0.25turn)",
          transformOrigin: "center center",
        },
        // Customize the circle behind the path, i.e. the "total progress"
        trail: {
          // Trail color
          stroke: "#f3f4f6",
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "butt",
          // Rotate the trail
          transform: "rotate(0.25turn)",
          transformOrigin: "center center",
        },
        // Customize the text
        text: {
          // Text color
          fill: "#2EBD85",
          // Text size
          fontSize: "16px",
        },
        // Customize background - only used when the `background` prop is true
        background: {
          fill: "#3e98c7",
        },
      }}
    >
      {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}

      <div style={{ fontSize: 12,color:"#2EBD85" }}>
        <strong>{value}%</strong>
      </div>
    </CircularProgressbarWithChildren>
  );
};
