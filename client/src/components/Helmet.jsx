import React from "react";
import { Helmet } from "react-helmet";

export function LayoutHelmet({ title }) {
  return (
    <Helmet>
      <meta
        name="description"
        content="sola is a chat real-time communication application"
      />
      <title>{title}</title>
    </Helmet>
  );
}
