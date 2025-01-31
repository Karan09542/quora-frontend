import React from "react";
import { RxCross2 } from "react-icons/rx";

function MediaComponent({ blockProps, contentState, block, alt }) {
  const entity = contentState?.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const blockKey = block.getKey();
  const GetMediaTag = () => {
    const mediaType = entity?.type;
    switch (mediaType) {
      case "VIDEO": {
        return (
          <video
            src={src}
            title="Embedded Video"
            controls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        );
      }
      case "IMAGE": {
        return (
          <img
            src={src}
            alt={"image"}
            style={{ width: "100%", height: "100%" }}
          />
        );
      }
      case "IFRAME": {
        return (
          <iframe
            src={src}
            title="Embedded Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        );
      }
      case "AUDIO": {
        return (
          <audio src={src} title="Embedded Audio" controls>
            <source
              src={src}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </audio>
        );
      }
      default:
        null;
    }
  };
  return (
    <div
      className={`relative transition-all ${entity?.type?.toLowerCase()}-container`}
      style={
        ["IFRAME", "VIDEO"].includes(entity?.type)
          ? {
              position: "relative",
              paddingBottom: "56.25%",
            }
          : { width: "100%", height: "100%" }
      }
    >
      <GetMediaTag />
      <RxCross2
        onMouseDown={(e) => {
          e.stopPropagation();
          blockProps.onRemove(blockKey);
        }}
        cursor={"pointer"}
        size={24}
        className="absolute top-0 right-0 text-white bg-black rounded-full"
      />
    </div>
  );
}

export default MediaComponent;
