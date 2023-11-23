"use client";

import { Helmet, HelmetProvider } from "react-helmet-async";

export default function PageContainer({ title, description, children }) {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        {children}
      </div>
    </HelmetProvider>
  );
}
