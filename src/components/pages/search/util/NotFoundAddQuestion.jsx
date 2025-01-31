import React from "react";
import Button from "../../../buttons-fields/Button";
import {
  useOpenModelStore,
  useUnderlineToStore,
} from "../../../../../Store/model";

function NotFoundAddQuestion({ lookingFor, isLessResults }) {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);
  return (
    <div className="p-4">
      <p className="text-[15px] text-[var(--text-dark)]">
        We couldn't find any {isLessResults && "more"} results for '{lookingFor}
        '
      </p>
      <div className="px-2 mt-2">
        <Button
          onClick={() => {
            setOpenModel("create post");
            setUnderlineTo("add question");
          }}
          className={`bg-[#1a5aff] text-sm`}
          name={"Add question"}
        />
      </div>
    </div>
  );
}

export default NotFoundAddQuestion;
