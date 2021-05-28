import styled from "@emotion/styled";
import React from "react";
import * as theme from "../../theme";

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
  border-radius: ${theme.spacing[7]};
  width: ${theme.spacing[7]};
  height: ${theme.spacing[7]};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${theme.colors.brand[300]};
`;

const Initials = styled.span`
  font-size: ${theme.fontSizes.md};
  line-height: ${theme.fontSizes.lg};
  color: ${theme.colors.common.white};
`;

const Image = styled.img`
  object-fit: cover;
  width: ${theme.spacing[7]};
  height: ${theme.spacing[7]};
`;
