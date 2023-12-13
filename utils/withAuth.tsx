import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuth = (props: Record<string, unknown>) => {
    const Router = useRouter();
    const { loggedInUser } = useAuth();

    useEffect(() => {
      if (!loggedInUser && Router.pathname !== "/login") {
        Router.push("/login");
      }
    }, [loggedInUser, Router]);

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;

// import withAuth from '../hocs/withAuth';

// const ProtectedPage = () => {
//   // This is a protected page
//   return <div>Protected content</div>;
// };

// export default withAuth(ProtectedPage);
