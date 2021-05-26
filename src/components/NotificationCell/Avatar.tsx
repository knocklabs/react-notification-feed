import styled from "@emotion/styled";
import React from "react";

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
  border-radius: ${({ theme }) => theme.spacing[7]};
  width: ${({ theme }) => theme.spacing[7]};
  height: ${({ theme }) => theme.spacing[7]};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.brand[300]};
`;

const Initials = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.common.white};
`;

const Image = styled.img`
  object-fit: cover;
  width: ${({ theme }) => theme.spacing[7]};
  height: ${({ theme }) => theme.spacing[7]};
`;
