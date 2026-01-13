import "./index.css";
import { Composition, Sequence } from "remotion";
import { IEConference, ieConferenceSchema } from "./P01_title";
import { ThemePage, themePageSchema } from "./P02_theme";
import { BulletPage, bulletPageSchema } from "./P03_topic";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* IE Network 2027 Conference Opener */}
      <Composition
        id="title"
        component={IEConference}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ieConferenceSchema}
        defaultProps={{
          mainText: "Call for Papers – IE Network 2027",
          subText: "45th Annual Industrial Engineering Network Conference",
          backgroundColor: "#0f172a",
          mainTextColor: "#ffffff",
          subTextColor: "#e2e8f0",
        }}
      />

      {/* Theme Page */}
      <Composition
        id="theme"
        component={ThemePage}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={themePageSchema}
        defaultProps={{
          mainText: "Theme: Engineering Tomorrow",
          subText: "Innovation and Sustainability",
          backgroundColor: "#0f172a",
          mainTextColor: "#ffffff",
          subTextColor: "#e2e8f0",
          accentColor: "#f97316",
        }}
      />

      {/* Bullet Points Page */}
      <Composition
        id="topic"
        component={BulletPage}
        durationInFrames={200}
        fps={30}
        width={1920}
        height={1080}
        schema={bulletPageSchema}
        defaultProps={{
          headerText: "We invite contributions on",
          backgroundColor: "#ffffff",
          textColor: "#1a1a1a",
          accentColor: "#f97316",
        }}
      />
    </>
  );
};
