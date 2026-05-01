import { getHost } from "@/lib/getHost";
import { Prompt } from "../Prompt/Prompt";
import UserIndicator from "../UserIndicator/UserIndicator";

const GUI = async () => {
  const account = await (await fetch(getHost() + "/u/raynecloudy")).json();
  return (
    <>
      <UserIndicator className="w-20" avatar={getHost() + "/avatar.png"} splash={getHost() + "/banner.png"} canEdit {...account} />
      <Prompt className="absolute bottom-1 left-22" style={{
        width: "calc(100vw - 23rem)"
      }} />
    </>
  );
};

export default GUI;
