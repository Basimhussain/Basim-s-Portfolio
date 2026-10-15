import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

// Thin adapter so the ported components keep their react-router style props.
type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  to: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...rest }, ref) => {
    const external = /^(https?:|mailto:|tel:)/.test(to);
    if (external) {
      const {
        prefetch,
        scroll,
        replace,
        shallow,
        locale,
        legacyBehavior,
        passHref,
        ...anchor
      } = rest as Record<string, unknown>;
      return (
        <a
          ref={ref}
          href={to}
          {...(anchor as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <NextLink ref={ref} href={to} {...rest}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";

export const useLocation = () => {
  const { asPath } = useRouter();
  return { pathname: asPath.split(/[?#]/)[0] || "/" };
};

export const useNavigate = () => {
  const router = useRouter();
  return (to: string) => {
    router.push(to);
  };
};
