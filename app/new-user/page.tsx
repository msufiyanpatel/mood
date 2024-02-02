import { prisma } from '@/utils/db'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser();
  console.log(user);

  if (user) {
    const match = await prisma.users.findUnique({
      where: {
        clerkId: user.id as string
      },
    });

    if (!match) {
      await prisma.users.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress, // Use optional chaining here
        },
      });
    }

    redirect('/journal');
  } else {
    // Handle the case where 'user' is null (e.g., show an error message or redirect to a different page)
  }
};

const newUser = async () => {
  await createNewUser();

  return (
    <div>
      <h1>hi</h1>
    </div>
  );
};

export default newUser;
