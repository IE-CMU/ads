import {
  AbsoluteFill,
  interpolate,
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
          fontWeight: "900",
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

export const themePageSchema = z.object({
  mainText: z.string(),
  subText: z.string(),
  backgroundColor: zColor(),
  mainTextColor: zColor(),
  subTextColor: zColor(),
  accentColor: zColor(),
});

export const ThemePage: React.FC<z.infer<typeof themePageSchema>> = ({
  mainText,
  subText,
  backgroundColor,
  mainTextColor,
  subTextColor,
  accentColor,
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
  // Subtitle slide in from right (opposite direction)
  const subtitleTranslateX = interpolate(frame, [50, 80], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle rotation
  const subtitleRotation = interpolate(frame, [50, 80], [1.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blur effect during entrance
  const subtitleBlur = interpolate(frame, [50, 80], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent elements animation
  const accentOpacity1 = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentOpacity2 = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Horizontal line animations
  const accentWidthLeft = interpolate(frame, [10, 35], [0, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const accentWidthRight = interpolate(frame, [20, 45], [0, 280], {
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
            id="gridTheme"
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
        <rect width="100%" height="100%" fill="url(#gridTheme)" />
      </svg>

      <AbsoluteFill style={{ opacity: fadeOut }}>
        {/* Tech accent orbs with industrial colors */}
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
            bottom: "-250px",
            right: "-250px",
            filter: "blur(80px)",
            opacity: 0.12,
          }}
        />

        {/* Left circuit pattern lines */}
        <div
          style={{
            position: "absolute",
            left: "4%",
            top: "30%",
            width: "120px",
            height: "250px",
            border: "2px solid #f97316",
            borderRight: "none",
            borderBottom: "none",
            opacity: interpolate(frame, [10, 35], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "20px",
              height: "2px",
              backgroundColor: "#f97316",
              top: "60px",
              left: "-20px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "20px",
              height: "2px",
              backgroundColor: "#f97316",
              bottom: "40px",
              left: "-20px",
            }}
          />
        </div>

        {/* Right circuit pattern lines */}
        <div
          style={{
            position: "absolute",
            right: "4%",
            top: "30%",
            width: "120px",
            height: "250px",
            border: "2px solid #06b6d4",
            borderLeft: "none",
            borderBottom: "none",
            opacity: interpolate(frame, [15, 40], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "20px",
              height: "2px",
              backgroundColor: "#06b6d4",
              top: "80px",
              right: "-20px",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "20px",
              height: "2px",
              backgroundColor: "#06b6d4",
              bottom: "60px",
              right: "-20px",
            }}
          />
        </div>

        {/* Top tech line with gradient */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${accentWidthLeft}px`,
            height: "3px",
            background: `linear-gradient(to right, transparent, #f97316, transparent)`,
            opacity: accentOpacity1,
            boxShadow: `0 0 15px rgba(249, 115, 22, 0.5)`,
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
              fontSize: "120px",
              fontWeight: "900",
              color: "#ffffff",
              margin: 0,
              padding: "0 20px",
              lineHeight: "1.15",
              fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
              letterSpacing: "-1.5px",
              textShadow: `0 0 30px rgba(249, 115, 22, 0.3), 0 2px 20px rgba(0, 0, 0, 0.5)`,
            }}
          >
            {mainText.split(" ").map((word, idx) => (
              <AnimatedWord
                key={idx}
                word={word}
                wordIndex={idx}
                frame={frame}
                fontSize={120}
                color="#ffffff"
                textShadow={`0 0 30px rgba(249, 115, 22, 0.3), 0 2px 20px rgba(0, 0, 0, 0.5)`}
              />
            ))}
          </div>
        </div>

        {/* Bottom tech line with gradient */}
        <div
          style={{
            position: "absolute",
            top: "58%",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${accentWidthRight}px`,
            height: "3px",
            background: `linear-gradient(to right, transparent, #06b6d4, transparent)`,
            opacity: accentOpacity2,
            boxShadow: `0 0 15px rgba(6, 182, 212, 0.5)`,
          }}
        />

        {/* Center vertical divider line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "25%",
            transform: "translateX(-50%)",
            width: "2px",
            height: "50%",
            background: `linear-gradient(to bottom, #f97316, #06b6d4)`,
            opacity: interpolate(frame, [20, 50], [0, 0.5], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: `0 0 20px rgba(249, 115, 22, 0.6)`,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            top: "68%",
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
              fontSize: "44px",
              fontWeight: "500",
              color: "#e2e8f0",
              margin: 0,
              padding: "0 40px",
              lineHeight: "1.4",
              fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
              letterSpacing: "0.2px",
              textShadow: "0 2px 15px rgba(0, 0, 0, 0.4)",
            }}
          >
            {subText}
          </p>
        </div>

        {/* Bottom corner tech elements */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "8%",
            width: "100px",
            height: "100px",
            border: `3px solid #f97316`,
            opacity: interpolate(frame, [60, 90], [0, 0.7], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: `inset 0 0 20px rgba(249, 115, 22, 0.2)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              border: `2px solid #f97316`,
              top: "-15px",
              left: "-15px",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "8%",
            right: "8%",
            width: "100px",
            height: "100px",
            border: `3px solid #06b6d4`,
            opacity: interpolate(frame, [70, 100], [0, 0.7], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            boxShadow: `inset 0 0 20px rgba(6, 182, 212, 0.2)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "30px",
              height: "30px",
              border: `2px solid #06b6d4`,
              bottom: "-15px",
              right: "-15px",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
