import { getHost } from "@/lib/getHost";
import SignUpModal from "../SignUpModal/SignUpModal";
import UserIndicator from "../UserIndicator/UserIndicator";

const GUI = async () => {
  const account = await (await fetch(getHost() + "/u/raynecloudy")).json();
  return (
    <>
      <UserIndicator className="w-20" avatar={getHost() + "/avatar.png"} splash={getHost() + "/banner.png"} canEdit {...account} />
    </>
  );
};

export default GUI;
