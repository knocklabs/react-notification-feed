import React from "react";
import "./styles.css";

function extractInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export interface AvatarProps {
  name: string;
  src?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, src }) => {
  return (
    <div className="rnf-avatar">
      {src ? (
        <img src={src} alt={`Image of ${name}`} className="rnf-avatar__image" />
      ) : (
        <span className="rnf-avatar__initials">{extractInitials(name)}</span>
      )}
    </div>
  );
};
