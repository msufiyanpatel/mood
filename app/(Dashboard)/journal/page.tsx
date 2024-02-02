import { prisma } from "@/utils/db"
import { getUserByClerkId } from "@/utils/auth"
import NewEntry from "@/app/components/newentry"
import EntryCard from "@/app/components/entrycard"
import Link from "next/link"
import { analyze } from "@/utils/ai"

const getEntries = async () => {
    const user = await getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  
    return entries;
  }
  
  const JournalPage = async () => {
    // Now, you can use await within an async function
    const entries = await getEntries()
    console.log('entries', entries)
    return (
      <div className='p-10 w-full h-full'>
        <h1>Journal Of Sufiyan</h1>
        <div className='grid grid-cols-3 gap-4 h-full w-full'>
            <NewEntry />
            {entries.map((entry) => (
              <Link key={entry.id} href={`journal/${entry.id}`}>
                <EntryCard entry={entry} />
              </Link>
            ))}
        </div>
      </div>
    );
  }
  
  export default JournalPage;
  