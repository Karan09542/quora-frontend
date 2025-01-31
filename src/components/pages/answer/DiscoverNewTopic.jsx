import React, { useEffect } from "react";
import QuoraBox from "../../../assets/answer/quoraBox.svg?react";
import FollowPlus from "../../../assets/followPlus.svg?react";
import FollowCheck from "../../../assets/followCheck.svg?react";
import CrossButton from "../../buttons-fields/CrossButton";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { formatNumber } from "../../../utils/formateNumber";

function DiscoverNewTopic() {
  const discovers = [
    {
      img: "https://m.media-amazon.com/images/I/6164bYTG-QL._AC_UF1000,1000_QL80_.jpg",
      topic: "Science",
      follow: 0,
      _id: "science",
    },
    {
      img: "https://padmanabhdas.wordpress.com/wp-content/uploads/2012/12/bihariji.jpg",
      topic: "Technology",
      follow: 2500000,
      _id: "technology",
    },
    {
      img: "https://www.jkp.org.in/wp-content/uploads/2024/09/Shri-Radha-Rani-The-Essence-of-Divine-Love-by-Jagadguru-Shri-Kripalu-Ji-Maharaj-Jagadguru-Kripalu-Parishat-1-1024x1024.jpg",
      topic: "History",
      follow: 100,
      _id: "history",
    },
    {
      img: "https://rukminim2.flixcart.com/image/750/900/xif0q/poster/k/u/f/small-maa-durga-navratri-mata-rani-nine-roop-poster-hd-god-original-imagq7gfd35kyt3n.jpeg?q=20&crop=false",
      topic: "Mathematics",
      follow: 950000,
      _id: "mathematics",
    },
    {
      img: "https://5.imimg.com/data5/AK/NQ/MY-43529292/bholenath-marble-statue-500x500.jpg",
      topic: "Art",
      follow: 800000,
      _id: "art",
    },
    {
      img: "https://m.media-amazon.com/images/I/61wq19d8hGL._AC_UF1000,1000_QL80_.jpg",
      topic: "Music",
      follow: 3000000,
      _id: "music",
    },
    {
      img: "https://m.media-amazon.com/images/I/71Sp7BKB0CL._AC_UF1000,1000_QL80_.jpg",
      topic: "Sports",
      follow: 1500000,
      _id: "sports",
    },
  ];
  const discoverIds = Object.fromEntries(
    discovers.map((discover) => [discover._id, false])
  );

  const [isFollowingTo, setIsFollowingTo] = React.useState(discoverIds);
  const numOfFollow = 1;
  const numOfFollowRef = React.useRef(null);

  // useEffect(() => {
  //   const spans = numOfFollowRef?.current?.children;
  //   if (!isFollowingTo && numOfFollow > 0 && spans?.length > 0) {
  //     spans[0].style.top = "0";
  //     spans[1].style.top = "16px";
  //   }
  //   setTimeout(() => {
  //     if (isFollowingTo && numOfFollow > 0 && spans?.length > 0) {
  //       spans[0].style.top = "-16px";
  //       spans[1].style.top = "0";
  //     }
  //   }, 1000 * 0.15);
  // }, [isFollowingTo]);

  function handleFollowNumAnimation(ref, isFollowing) {
    console.log("jaishreeram");
    const spans = ref?.current.children;
    console.log("isFollowing", isFollowing);
    if (!isFollowing) {
      spans[0].style.top = "0";
      spans[1].style.top = "16px";
    }

    if (isFollowing) {
      spans[0].style.top = "-16px";
      spans[1].style.top = "0";
    }
  }

  const discoverDivRef = React.useRef(null);
  const handleLeft = () => {
    discoverDivRef.current.scrollLeft -= 510;
  };
  const handleRight = () => {
    discoverDivRef.current.scrollLeft += 510;
  };
  return (
    <div className="relative pb-4 mt-2 border rounded-lg">
      {/* first */}
      <div className="flex items-center gap-2 px-4 py-2">
        <span className="bg-[var(--text-color)]  rounded aspect-square ">
          <QuoraBox className="[&>path]:fill-white p-1" />
        </span>
        <span>Discover new topics</span>
      </div>
      {/* map */}
      <div className="px-4">
        <div
          ref={discoverDivRef}
          className="relative flex gap-2 overflow-hidden px- scroll-smooth"
        >
          {discovers.map((discover, index) => {
            const following = Number(discover?.follow);
            // ref
            const itemRef = React.useRef(null);
            const isFollowing = isFollowingTo[discover._id];
            return (
              <div
                key={discover?.topic}
                className="relative border min-w-[160px]  max-w-[160px] h-[208px] rounded-lg px-4 py-2 flex flex-col items-center"
              >
                {/* img */}
                <div className="[&>img]:w-[60px] [&>img]:object-contain [&>img]:aspect-square [&>img]:border rounded [&>img]:rounded">
                  <img src={discover?.img} alt={discover?.topic} />
                  <div className="absolute top-0.5 right-0.5">
                    <CrossButton padding="p-[0.7rem]" size={40} />
                  </div>
                </div>
                {/* topic */}
                <div className="font-bold text-[0.95rem] mt-1.5 capitalize text-[#195FAA]">
                  {discover?.topic}
                </div>
                {/* follow button */}
                <div className={`mt-auto ${following > 999 ? "w-full" : ""}`}>
                  <span
                    onClick={() => {
                      handleFollowNumAnimation(
                        itemRef,
                        isFollowingTo?.[discover?._id]
                      );
                      setIsFollowingTo((prev) => ({
                        ...prev,
                        [discover?._id]: !prev[discover?._id],
                      }));
                    }}
                    className={`click-hover-effect  ${
                      !isFollowingTo?.[discover?._id]
                        ? "border-blue-500 [&>span]:text-blue-600 [&>svg>path]:stroke-blue-600"
                        : `bg-gray-200/80 border ${
                            following > 999 ? "w-36 -translate-x-2" : ""
                          }  border-stone-300 hover:brightness-[0.93] relative`
                    }
              flex  px-3 py-[0.2rem]  border rounded-full place-items-center items-center gap-1 text-[0.8rem] font-semibold text-gray-500 `}
                  >
                    {!isFollowingTo?.[discover?._id] && (
                      <FollowPlus className="w-[1.23rem] " />
                    )}
                    {isFollowingTo?.[discover?._id] && (
                      <FollowCheck className="animate-[ubhar_0.15s_ease-in-out] w-[1.23rem] " />
                    )}
                    <span>
                      {!isFollowingTo?.[discover?._id] ? "Follow" : "Following"}
                    </span>{" "}
                    <span
                      ref={itemRef}
                      className={`relative [&>span:last-child]:top-4 overflow-hidden ${
                        following < 10
                          ? "w-2"
                          : following < 1000
                          ? "w-6"
                          : "w-8"
                      } flex flex-col h-5 [&>span]:absolute [&>span]:transition-all [&>span]:duration-[0.2s] mx-0.5 `}
                    >
                      <span>
                        {isFollowingTo?.[discover?._id]
                          ? formatNumber(following + 1)
                          : formatNumber(following)}
                      </span>
                      <span>
                        {isFollowingTo?.[discover?._id]
                          ? formatNumber(following - 1)
                          : formatNumber(following)}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* buttons left right */}

      <button
        onClick={handleRight}
        className="absolute right-2 top-[40%] border border-stone-300 w-[30px] h-[50px]  place-items-center rounded text-gray-400 hover:brightness-90 hover:transition-all hover:duration-[0.2s] bg-[#F7F7F8]"
      >
        <MdArrowForwardIos size={21} />
      </button>

      <button
        onClick={handleLeft}
        className="absolute left-2 top-[40%] border border-stone-300 w-[30px] h-[50px] place-items-center rounded text-gray-400 hover:brightness-90 hover:transition-all hover:duration-[0.2s] bg-[#F7F7F8]"
      >
        <MdArrowBackIosNew />
      </button>
    </div>
  );
}

export default DiscoverNewTopic;
