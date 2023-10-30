import {InitialModal} from "@/components/modals/init-modals";
import { db } from "@/lib/db";
import { ProfileType, initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile: ProfileType = await initialProfile();

  // chekc coi có trong cái server nào chưa
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
