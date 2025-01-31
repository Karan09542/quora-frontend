import React from "react";
import Heading from "./Heading";
import Scholar from "../../../assets/subscription/scholar.svg?react";
import QuoraSubscription from "../../../assets/subscription/quoraSubscription.svg?react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
function Subscriptions() {
  const blockList = [
    {
      heading: "Space subscription",
      subheading: "You are not currently a member of any Spaces.",
    },
    {
      heading: "Payment methods",
      subheading: "You have no saved payment methods",
    },
    {
      heading: "Billing history",
      subheading: "You have no billing history",
    },
  ];
  return (
    <div className="[&>div]:border [&>div]:rounded-lg [&>div]:mb-2 mt-2 mb-10">
      {/* intro */}
      <div>
        <Heading
          heading={"Quora+ subscription"}
          isHr={false}
          className={"px-4 py-2"}
          component={
            <div className="flex items-center gap-0.5 text-[15px] text-[var(--text-dark)]">
              <Scholar /> <span>Free trial</span>
            </div>
          }
        />
        <hr />

        <div className="flex items-center text-[13px] text-[var(--text-color-93)] px-4 py-2">
          <QuoraSubscription className="w-10 h-10 aspect-square" />{" "}
          <span>You are not currently a member of Quora+.</span>
        </div>
        <hr />
      </div>

      {blockList.map((item, index) => (
        <div key={item?.heading}>
          <Heading
            heading={item?.heading}
            isHr={false}
            className={"px-4 py-2"}
          />
          <hr />
          <Heading
            subheading={item?.subheading}
            isHr={false}
            className={"px-4 py-2 [&>p]:text-[13px]"}
          />
          <hr />
        </div>
      ))}
      <div>
        <Heading
          heading={"Information and resources"}
          isHr={false}
          className={"px-4 py-2"}
        />
        <hr />
        <Heading
          heading={
            <Link to="/help/quora+" target="_blank">
              Help center
            </Link>
          }
          isHr={false}
          className={
            "px-4 py-2 [&>h1]:font-normal [&>h1]:cursor-pointer hover:[&>h1]:underline [&>h1]:text-[#195FAA]"
          }
          component={
            <Link to="/help/quora+" target="_blank">
              <LiaExternalLinkAltSolid
                onClick={() => {}}
                cursor={"pointer"}
                size={24}
                color="#666"
              />
            </Link>
          }
        />
        <hr />
      </div>
    </div>
  );
}

export default Subscriptions;
