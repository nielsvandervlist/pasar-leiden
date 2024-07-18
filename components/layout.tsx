import Footer from './footer'
import Meta from './meta'
import Header from "./header";
import classNames from "classnames";
import TicketButton from "./ticket-button";

interface LayoutProps {
    preview?: string,
    children: any,
    className?: string,
}

export default function Layout({ preview, children, className }: LayoutProps) {
  return (
    <>
      <Meta />
        <Header/>
      <div className={classNames("main-container overflow-x-hidden", className)}>
        <main>{children}</main>
      </div>
        <TicketButton/>
      <Footer />
    </>
  )
}
