import { spring } from "remotion";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

// Word animation component
const AnimatedWord: React.FC<{
  word: string;
  wordIndex: number;
  frame: number;
  fontSize: number;
  color: string;
  textShadow: string;
}> = ({ word, wordIndex, frame, fontSize, color, textShadow }) => {
  const wordStartFrame = wordIndex * 8; // Each word starts 8 frames after the previous
  const wordEndFrame = wordStartFrame + 15;

  const opacity = interpolate(
    frame,
    [wordStartFrame, wordStartFrame + 8],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scale = interpolate(frame, [wordStartFrame, wordEndFrame], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const blur = interpolate(
    frame,
    [wordStartFrame, wordStartFrame + 8],
    [8, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "0.15em",
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      <span
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: "800",
          color,
          textShadow,
          display: "inline-block",
        }}
      >
        {word}
      </span>
    </span>
  );
};

export const ieConferenceSchema = z.object({
  mainText: z.string(),
  subText: z.string(),
  backgroundColor: zColor(),
  mainTextColor: zColor(),
  subTextColor: zColor(),
});

export const IEConference: React.FC<z.infer<typeof ieConferenceSchema>> = ({
  mainText,
  subText,
  backgroundColor,
  mainTextColor,
  subTextColor,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in the title
  // (removed - now handled by word-by-word animation)

  // Fade in the subtitle with delay
  const subtitleOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // (title animations removed - now handled by AnimatedWord component)
  // Subtitle slide in from left
  const subtitleTranslateX = interpolate(frame, [50, 80], [-100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle rotation
  const subtitleRotation = interpolate(frame, [50, 80], [-1.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blur effect during entrance
  const subtitleBlur = interpolate(frame, [50, 80], [8, 0] as const, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Rotate and scale animation for accent lines
  const accentOpacity1 = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentOpacity2 = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vertical line animation
  const accentHeightLeft = interpolate(frame, [20, 40], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentHeightRight = interpolate(frame, [30, 50], [0, 120], {
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
            id="gridIE"
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
        <rect width="100%" height="100%" fill="url(#gridIE)" />
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
            left: "-300px",
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
            bottom: "-200px",
            right: "-200px",
            filter: "blur(80px)",
            opacity: 0.12,
          }}
        />

        {/* Left vertical accent line */}
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: `${accentHeightLeft}px`,
            background: `linear-gradient(to bottom, #f97316, #f973160)`,
            opacity: accentOpacity1,
          }}
        />

        {/* Right vertical accent line */}
        <div
          style={{
            position: "absolute",
            right: "15%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "3px",
            height: `${accentHeightRight}px`,
            background: `linear-gradient(to bottom, #06b6d4, #06b6d40)`,
            opacity: accentOpacity2,
          }}
        />

        {/* Main Title */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: `translate(-50%, -50%)`,
            textAlign: "center",
            width: "95%",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: "800",
              color: "#ffffff",
              margin: 0,
              padding: "0 20px",
              lineHeight: "1.15",
              fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
              letterSpacing: "-1px",
              textShadow: `0 0 30px rgba(249, 115, 22, 0.3), 0 2px 20px rgba(0, 0, 0, 0.5)`,
            }}
          >
            {mainText.split(" ").map((word, idx) => (
              <AnimatedWord
                key={idx}
                word={word}
                wordIndex={idx}
                frame={frame}
                fontSize={96}
                color="#ffffff"
                textShadow={`0 0 30px rgba(249, 115, 22, 0.3), 0 2px 20px rgba(0, 0, 0, 0.5)`}
              />
            ))}
          </div>
        </div>

        {/* Top horizontal accent line */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: interpolate(frame, [10, 35], [0, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: "2px",
            background: `linear-gradient(to right, transparent, #f97316, transparent)`,
            boxShadow: `0 0 15px rgba(249, 115, 22, 0.5)`,
            opacity: accentOpacity1,
          }}
        />

        {/* Bottom horizontal accent line */}
        <div
          style={{
            position: "absolute",
            top: "57%",
            left: "50%",
            transform: "translateX(-50%)",
            width: interpolate(frame, [20, 45], [0, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: "2px",
            background: `linear-gradient(to right, transparent, #06b6d4, transparent)`,
            boxShadow: `0 0 15px rgba(6, 182, 212, 0.5)`,
            opacity: accentOpacity2,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            top: "62%",
            left: "50%",
            transform: `translate(calc(-50% + ${subtitleTranslateX}px), -50%) rotateZ(${subtitleRotation}deg)`,
            textAlign: "center",
            width: "90%",
            opacity: subtitleOpacity,
            filter: `blur(${subtitleBlur}px)`,
          }}
        >
          <p
            style={{
              fontSize: "48px",
              fontWeight: "400",
              color: "#e2e8f0",
              margin: 0,
              padding: "0 40px",
              lineHeight: "1.4",
              fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
              letterSpacing: "0.3px",
              textShadow: "0 2px 15px rgba(74, 74, 74, 0.08)",
            }}
          >
            {subText}
          </p>
        </div>

        {/* Bottom decorative bar */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: interpolate(frame, [60, 100], [0, 200], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            height: "4px",
            background: `linear-gradient(to right, transparent, ${mainTextColor}, transparent)`,
            borderRadius: "2px",
            opacity: interpolate(frame, [60, 80], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
