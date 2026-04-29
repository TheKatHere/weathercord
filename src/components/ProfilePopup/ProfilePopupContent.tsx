import type { PublicAccount } from "@/db/schema";
import { Cake, Shield } from "lucide-react";
import UsernameIDSwitcher from "./UsernameIDSwitcher";
import { Vibrant } from "node-vibrant/node";

const ProfilePopupContent = async (props: Record<string, any> & PublicAccount & {
  avatar: string,
  canEdit: boolean,
  splash?: string
}) => {
  const accent = await Vibrant.from(props.avatar).getPalette();

  return (
    <div className="text-left" style={props.style}>
      <div className="h-7 w-full" aria-hidden style={{
        backgroundImage: props.splash ? `url(${props.splash})` : `linear-gradient(${accent.LightVibrant?.hex}, ${accent.LightVibrant?.hex})`,
        backgroundSize: "cover"
      }} />
      <div className="p-1 flex flex-col gap-1">
        <div className="flex gap-1">
          <img className="rounded-full w-6 h-6" src={props.avatar} alt={props.displayName + "'s avatar"} />
          <div>
            <div className="text-2xl font-bold" style={{
              fontFamily: props.nameFont
            }}>{props.displayName}</div>
            <sub><UsernameIDSwitcher id={props.id} username={props.username} /></sub><br />
            <sub>{props.pronouns}</sub>
          </div>
        </div>
        {props.bio &&
          <div className="whitespace-pre-line">{props.bio}</div>
        }
        {props.admin &&
          <sub><Shield />Administrator</sub>
        }
        <sub><Cake />Joined {new Date(props.joined).toLocaleDateString()}</sub>
      </div>
    </div>
  );
};

export default ProfilePopupContent;
