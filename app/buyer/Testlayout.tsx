// "use client";
// import { useUser } from "@/context/user";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const contextUser = useUser();

//   if (!contextUser?.user) {
//     return (
//       <div>
//         <h1>Redirecting...</h1>
//       </div>
//     );
//   }

//   return <div>{children}</div>;
// }
