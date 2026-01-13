import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const bulletPageSchema = z.object({
  headerText: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
});

type BulletItem = {
  title: string;
  icon: string; // SVG icon or emoji
};

const BULLETS: BulletItem[] = [
  { title: "Smart manufacturing and Industry 4.0", icon: "⚙️" },
  { title: "Operations research and optimization", icon: "📊" },
  { title: "Logistics and supply chain", icon: "🚚" },
  { title: "Quality, reliability, and safety", icon: "🛡️" },
  { title: "Data analytics and AI in IE", icon: "🤖" },
];

// Animated bullet item component
const BulletItem: React.FC<{
  title: string;
  icon: string;
  index: number;
  frame: number;
}> = ({ title, icon, index, frame }) => {
  const bulletStartFrame = 80 + index * 12; // Bullets start at frame 80, each 12 frames apart
  const bulletEndFrame = bulletStartFrame + 20;

  const opacity = interpolate(
    frame,
    [bulletStartFrame, bulletStartFrame + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateX = interpolate(
    frame,
    [bulletStartFrame, bulletEndFrame],
    [-80, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(
    frame,
    [bulletStartFrame, bulletEndFrame],
    [0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "32px",
        opacity,
        transform: `translateX(${translateX}px) scale(${scale})`,
        transformOrigin: "left center",
        marginBottom: "32px",
        padding: "20px 24px",
        borderRadius: "12px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(249, 115, 22, 0.2)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Icon container - professional styling */}
      <div
        style={{
          fontSize: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          height: "80px",
          border: "2px solid #f97316",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(249, 115, 22, 0.05))",
          flexShrink: 0,
          boxShadow: "0 8px 24px rgba(249, 115, 22, 0.15)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <p
        style={{
          fontSize: "40px",
          fontWeight: "600",
          color: "#f1f5f9",
          margin: 0,
          lineHeight: "1.3",
          fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
          letterSpacing: "-0.3px",
          flex: 1,
        }}
      >
        {title}
      </p>
    </div>
  );
};

export const BulletPage: React.FC<z.infer<typeof bulletPageSchema>> = ({
  headerText,
  backgroundColor,
  textColor,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Header animation
  const headerOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerTranslateY = interpolate(frame, [0, 30], [-50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerBlur = interpolate(frame, [0, 30], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative line animation
  const lineWidth = interpolate(frame, [15, 40], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 40, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Grid background pattern */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.05,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <AbsoluteFill style={{ opacity: fadeOut }}>
        {/* Animated background gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            background: `radial-gradient(circle, #f97316 0%, transparent 70%)`,
            borderRadius: "50%",
            top: "-300px",
            right: "-300px",
            filter: "blur(80px)",
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: `radial-gradient(circle, #06b6d4 0%, transparent 70%)`,
            borderRadius: "50%",
            bottom: "-250px",
            left: "-250px",
            filter: "blur(80px)",
            opacity: 0.12,
          }}
        />

        {/* Header section */}
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: "0",
            right: "0",
            padding: "40px 80px",
            borderBottom: "1px solid rgba(249, 115, 22, 0.2)",
          }}
        >
          <div
            style={{
              opacity: headerOpacity,
              transform: `translateY(${headerTranslateY}px)`,
              filter: `blur(${headerBlur}px)`,
            }}
          >
            <h2
              style={{
                fontSize: "60px",
                fontWeight: "700",
                color: "#f1f5f9",
                margin: "0 0 16px 0",
                fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
                letterSpacing: "-0.8px",
                textShadow: `0 0 30px rgba(249, 115, 22, 0.2), 0 2px 15px rgba(0, 0, 0, 0.4)`,
              }}
            >
              {headerText}
            </h2>

            {/* Decorative line under header */}
            <div
              style={{
                width: `${lineWidth}px`,
                height: "2px",
                background: `linear-gradient(to right, #f97316, #06b6d4, transparent)`,
                borderRadius: "1px",
                marginTop: "10px",
                boxShadow: `0 0 12px rgba(249, 115, 22, 0.4)`,
              }}
            />
          </div>
        </div>

        {/* Bullets container */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "80px",
            right: "80px",
            height: "62%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingRight: "100px",
          }}
        >
          {BULLETS.map((bullet, idx) => (
            <BulletItem
              key={idx}
              title={bullet.title}
              icon={bullet.icon}
              index={idx}
              frame={frame}
            />
          ))}
        </div>

        {/* Corner accent elements - more refined */}
        <div
          style={{
            position: "absolute",
            bottom: "50px",
            right: "60px",
            width: "100px",
            height: "100px",
            border: `2px solid #06b6d4`,
            borderRadius: "8px",
            opacity: interpolate(frame, [150, 200], [0, 0.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)",
          }}
        />

        {/* Right side accent bar */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "60px",
            width: "4px",
            height: "250px",
            background: `linear-gradient(to bottom, #f97316, #06b6d4, transparent)`,
            borderRadius: "2px",
            opacity: interpolate(frame, [40, 90], [0, 0.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: `0 0 25px rgba(249, 115, 22, 0.3)`,
          }}
        />

        {/* Left side accent line */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "80px",
            width: "3px",
            height: "180px",
            background: `linear-gradient(to bottom, #f97316, rgba(249, 115, 22, 0))`,
            opacity: interpolate(frame, [30, 70], [0, 0.4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
