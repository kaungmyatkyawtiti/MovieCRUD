import React from "react";

interface LayoutProp {
  children: React.ReactNode,
  analytics: React.ReactNode,
  team: React.ReactNode,
}

export default function Layout({
  children,
  analytics,
  team,
}: LayoutProp
) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
