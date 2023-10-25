import { db } from '@/lib/db'
import { currentUser, redirectToSignIn } from "@clerk/nextjs";


export type ProfileType =  {
    id: string;
    userId: string;
    name: string;
    imagesUrl: string;
    email: string;
    createAt: Date;
    updateAt: Date;
}

export const initialProfile = async () => {
    const user = await currentUser()

    if(!user) {
        return redirectToSignIn()
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })

    if(profile) {
        console.log('profile: ', profile);
        return profile
    }

    const newProfile: ProfileType = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imagesUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    })

    console.log('new profile: ' ,newProfile);
    

    return newProfile
}