import type { PropsWithChildren, ReactNode } from "react";

export interface Props extends PropsWithChildren {
  title: string;
  description: string;
  footer?: ReactNode;
}

const Layout = ({ children, title, description, footer }: Props) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
      {footer && <footer>{footer}</footer>}
    </>
  );
};

export default Layout;
