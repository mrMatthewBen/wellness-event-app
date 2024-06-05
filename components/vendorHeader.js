"use client";

import styled from "styled-components";
import Link from "next/link";
import LogoutButton from "./logoutButton";

const Header = styled.div`
  display: flex;
  padding: 30px 50px;

  a {
    &:not(:last-child) {
      margin-right: 15px;
    }

    color: black;
    text-decoration: none;
  }
`;

const adminHeader = () => {
  return (
    <Header>
      <Link href="/dashboard/vendor/events">Home</Link>
      <LogoutButton />
    </Header>
  );
};

export default adminHeader;
