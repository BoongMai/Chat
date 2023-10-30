'use client'

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;
  return (
    <div className="h-full flex items-center justify-center">
     {children}
    </div>
  );
};

export default AuthLayout;
