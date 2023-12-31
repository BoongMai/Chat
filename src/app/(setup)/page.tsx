import { db } from "@/lib/db";
import { ProfileType, initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile: ProfileType = await initialProfile();
  
  //chekc coi có trong cái server nào chưa
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  console.log("server: ", server);

  if(server) {
    return redirect(`/servers/${server.id}`)
  }

  return <div>Setup server pageee!!</div>;
};

export default SetupPage;
