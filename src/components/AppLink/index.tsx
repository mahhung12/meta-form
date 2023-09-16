import type { FC, PropsWithChildren } from 'react';
import Link from 'next/link';

type AppLinkProps = {
  href: string;
  target?: string | undefined;
  rel?: string | undefined;
  onClick?: () => void;
  className?: string;
};

const AppLink: FC<PropsWithChildren<AppLinkProps>> = ({
  href,
  children,
  target = undefined,
  rel = undefined,
  onClick,
  className,
  ...props
}) => {
  return (
    <Link href={href} {...props} target={target} onClick={onClick} rel={rel} className={className}>
      {children}
    </Link>
  );
};

export default AppLink;
