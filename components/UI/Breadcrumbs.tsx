// components/Breadcrumbs.tsx
import Link from "next/link";
import { useRouter } from "next/router";

interface BreadcrumbsProps {
  separator?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ separator = " > " }) => {
  const router = useRouter();
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "");

  return (
    <div>
      {pathSegments.map((segment, index) => (
        <span key={segment}>
          <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
            <a>{segment}</a>
          </Link>
          {index < pathSegments.length - 1 && <span>{separator}</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
