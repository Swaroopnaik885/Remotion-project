import React from "react";
import { Composition } from "remotion";
import { MyComponent } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CinematicTechIntro"
        component={MyComponent}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
