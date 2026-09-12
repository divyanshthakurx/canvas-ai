import { auth } from '@clerk/nextjs/server';
import { redirect} from 'next/navigation';

const page = async () => {

  const { userId } = await auth.protect();

  // Now you can use `userId` to query your database (e.g., Prisma, Supabase, MongoDB)
  console.log('Logged in user ID:', userId);

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div>hello there</div>
  )
}

export default page