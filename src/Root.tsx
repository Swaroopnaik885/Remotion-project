import React from "react";
import { MyComposition } from "./Composition";
import { ArchivesDocumentaryComposition } from "./ArchivesDocumentary";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <ArchivesDocumentaryComposition />
    </>
  );
};
