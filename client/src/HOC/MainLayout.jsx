import React from "react";
import { LayoutHelmet } from "../components/Helmet";
// high order component
export function MainLayout(props) {
  return (
    <React.Fragment>
      <LayoutHelmet title={props.title} />
      <main>{props.children}</main>
    </React.Fragment>
  );
}
