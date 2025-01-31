import { IoMdCheckmark } from "react-icons/io";

const Popup = ({
  popupOptions,
  setIsMostRecent,
  isMostRecent,
  maxWidth = "auto",
}) => (
  <div
    className={`bg-white text-[13px] border nav-shadow rounded text-black ${`[&>div]:px-5 text-[0.8rem] text-gray-600 [&>div]:gap-1 [&>div]:leading-9 rounded child-flex [&>div]:cursor-pointer hover:[&>div]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100`}`}
    style={{ maxWidth }}
  >
    {popupOptions?.map((item, index) => (
      <div
        onClick={() => {
          // setIsMore(!isMore);
          if (item?.isCheck) {
            setIsMostRecent(item?.name);
          }
          item?.onClick();
        }}
        key={item?.name}
      >
        {item?.svg}
        <div className="flex items-center gap-1 ">
          <div>
            <p className="text-[var(--text-dark)]">{item?.name}</p>
            {item?.subTitle && (
              <p className="text-[var(--text-gen-color)] leading-4 -mt-1.5 pb-2">
                {item?.subTitle}
              </p>
            )}
          </div>
          {item?.isCheck && isMostRecent === item?.name && (
            <IoMdCheckmark size={16} color="#2e69ff" />
          )}
        </div>
      </div>
    ))}
  </div>
);

export default Popup;
6;
