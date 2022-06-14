import React from "react";
import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";

export default function C() {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };
  return (
    <Container style={style}>
      <Outlet />
    </Container>
  );
}
