import { FC } from 'react';
import SocialLogin from 'react-social-login';

type SocialLoginButtonProps = {
  className?: string;
  triggerLogin: () => void;
};

const SocialLoginButton: FC<SocialLoginButtonProps> = ({ children, className, triggerLogin }) => {
  return (
    <button className={className} onClick={triggerLogin}>
      {children}
    </button>
  );
};

export default SocialLogin(SocialLoginButton);
