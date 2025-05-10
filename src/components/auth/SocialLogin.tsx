import React from 'react';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react';

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  isLoading?: boolean;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({
  onGoogleLogin,
  onGithubLogin,
  isLoading = false
}) => {
  return (
    <motion.div
      className="w-full space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Button
        variant="outline"
        fullWidth
        onClick={onGoogleLogin}
        disabled={isLoading}
        leftIcon={<IconBrandGoogle size={18} className="text-red-500" />}
        className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
      >
        Continue with Google
      </Button>

      {onGithubLogin && (
        <Button
          variant="outline"
          fullWidth
          onClick={onGithubLogin}
          disabled={isLoading}
          leftIcon={<IconBrandGithub size={18} />}
          className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          Continue with GitHub
        </Button>
      )}
    </motion.div>
  );
};

export default SocialLogin;
