'use client';

import { MemberRole } from '@prisma/client';
import { ServerWithMembersWithProfiles } from '@/types';

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerHeader = ({ role, server }: ServerHeaderProps) => {
  return <div>server-header</div>;
};

export default ServerHeader;
