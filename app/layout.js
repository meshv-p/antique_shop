export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// Regular layout (app/dashboard/layout.js)
// - Applies to route segments in app/dashboard/*
//   export default function DashboardLayout({ children }) {
//     return (
//       <>
//         <DashboardSidebar />
//         {children}
//       </>
//     )
//   }

//   // Page Component (app/dashboard/analytics/page.js)
//   // - The UI for the `app/dashboard/analytics` segment
//   // - Matches the `acme.com/dashboard/analytics` URL path
//   export default function AnalyticsPage() {
//     return (
//       <main>...</main>
//     )
//   }
