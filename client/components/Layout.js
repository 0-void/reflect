import { useState } from "react";

import Navigation from "./Navigation";
import ContentIndex from "../components/ContentIndex";

export default function Layout({ children, title, data, type }) {
  const [isContentIndexOpen, setIsContentIndexOpen] = useState(false);
  return (
    <div className="container">
      <Navigation openIndex={() => setIsContentIndexOpen(true)} />
      {isContentIndexOpen && (
        <ContentIndex
          closeMenu={() => setIsContentIndexOpen(false)}
          title={title}
          data={data}
          type={type}
        />
      )}
      {children}
      <style jsx>{`
        .container {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}
