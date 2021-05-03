import styled from "@emotion/styled";
import React from "react";
import { fontSizes, palette } from "../../theme";

function extractInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

type Props = {
  name: string;
  src?: string;
};

const Avatar: React.FC<Props> = ({ name, src }) => {
  return (
    <Container>
      {src ? (
        <Image src={src} alt={`Image of ${name}`} />
      ) : (
        <Initials>{extractInitials(name)}</Initials>
      )}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 32px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(233, 87, 68, 0.7);
`;

const Initials = styled.span`
  font-size: ${fontSizes.medium};
  line-height: ${fontSizes.large};
  color: ${palette.common.white};
`;

const Image = styled.img`
  object-fit: contain;
  width: 32px;
  height: 32px;
`;

export default Avatar;
