import React, { forwardRef } from "react";
import { BsUpload } from "react-icons/bs";

const ImageInputOption = ({ handleImage, setIsImageUrlInput }) => {
  return (
    <div className="flex items-center gap-2 ">
      <label
        htmlFor="imageInput"
        className="p-1 border border-transparent rounded active:border-blue-500 hover:border-inherit"
      >
        <BsUpload cursor={"pointer"} />
        <input
          onChange={handleImage}
          id="imageInput"
          className="hidden"
          type="file"
          accept="image/*"
          multiple
        />
      </label>

      <button
        className="box-border px-1 border border-transparent rounded active:border-blue-500 hover:border-inherit"
        onClick={() => {
          setIsImageUrlInput((prev) => !prev);
        }}
      >
        Links
      </button>
    </div>
  );
};

export default ImageInputOption;
