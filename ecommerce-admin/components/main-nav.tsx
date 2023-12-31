"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathName === route.href
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
