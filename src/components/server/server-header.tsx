'use client';

import { MemberRole } from '@prisma/client';
import { ServerWithMembersWithProfiles } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ role, server }: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200
    dark:border-neutral-800 border-b-2 hover:border-zinc-700/10 dark:bg-zinc-700/50 transition'
      >
        {server.name}
        <ChevronDown className='h-5 w-5 ml-auto' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        {isModerator && (
          <DropdownMenuItem className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'>
            Invite People
            <UserPlus className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Server Setting
            <Settings className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className='px-3 py-2 text-sm cursor-pointer'>
            Create Channel
            <PlusCircle className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className='text-rose-500 px-3 py-2 text-sm cursor-pointer'>
            Delete Server
            <Trash className='w-4 h-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;