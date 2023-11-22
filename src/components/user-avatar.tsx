import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
interface UserAvatarProps {
  src?: string;
  className?: string;
}
export const UserAvatar = ({ className, src }: UserAvatarProps) => {
  return (
    <Avatar className={cn('h-7 w-7 md:w-10 md:h-10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
