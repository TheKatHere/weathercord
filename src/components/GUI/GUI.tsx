"use client";

import AccountSettingsModal from "../AccountSettingsModal/AccountSettingsModal";
import { AuthorizedAccountFromAPI } from "@/db/schema";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { ModalType } from "@/lib/modals";
import { Prompt } from "../Prompt/Prompt";
import { setl10nData } from "@/lib/l10n";
import SignUpModal from "../SignUpModal/SignUpModal";
import { useEffect, useState } from "react";
import UserIndicator from "../UserIndicator/UserIndicator";
import { StationList }from "../StationList/StationList";
import { MessageManager }from "../MessageManager/MessageManager";

const GUI = () => {
  const [account, setAccount] = useState<AuthorizedAccountFromAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalType | null>(null);
  const [initialAccountSettingsTab, setInitialAccountSettingsTab] = useState(0);

  useEffect(() => {
    fetch("/whoami")
      .then((res) => {
        if (res.ok) res.json()
          .then((account) => {
            setAccount(account);
            setl10nData(account.lang)
              .then(() => setLoading(false));
          });
        else {
          setl10nData("en-us")
            .then(() => setLoading(false));
        }
      });
  }, [0]);

  useEffect(() => {
    setl10nData(account?.lang ?? "en-us");
  }, [account]);

  if (!account) {
    if (loading) return (
      <LoadingScreen />
    );
    else return (
      <SignUpModal />
    );
  }

  return (
    <>
      <div className="contents" inert={modal !== null}>
        <StationList className="absolute top-1 left-1" style={{
          height: "calc(100vh - 6.7rem)",
          width: "20rem",
            outline: "dashed"
        }}/>
        <MessageManager className="absolute top-1 left-22" style={{
          height: "calc(100vh - 6.7rem)",
          width: "calc(100vw - 23rem)",
          outline: "dashed"
        }}/>
        <UserIndicator className="w-20" canEdit {...account} setModal={setModal} />
        <Prompt className="absolute bottom-1 left-22" style={{
          width: "calc(100vw - 23rem)"
        }} />
      </div>

      {modal === ModalType.AccountSettings &&
        <AccountSettingsModal closeModal={() => setModal(null)} account={account} setAccount={setAccount} startingTab={initialAccountSettingsTab} setInitialAccountSettingsTab={setInitialAccountSettingsTab} />
      }
    </>
  );
};

export default GUI;
