import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Editor from "@/app/components/Editor"



const getEntry = async (id) => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
          userId_id: {
            userId: user.id,
            id,
          }
        },
        include: {
            analysis: true,
        },
    })

    return entry
}

const EntryPage = async ({params}) =>{

    const entry = await getEntry(params.id)
    //const { summary, subject, negative, color} = entry?.analysis
    const analysisData = [
        { name: 'Summary', value: '' },
        { name: 'Subject', value: '' },
        { name: 'Mood', value: '' },
        { name: 'Negative', value: 'False' },
    ]
    return(
        <>
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry={entry}/>
            </div>
            <div className="border-l border-black/10">
                <div className="px-6 py-10 bg-slate-200">
                    <h2 className="text-2xl"> Analysis </h2>
                </div>
                <div>
                    <ul>
                    {analysisData.map((item) => (
                <li key={item.name} className="px-2 py-4 flex items-center justify-between">
                    <span className="text-xl font-semibold">{item.name}</span>
                    <span className="text-xl font-semibold">{item.value}</span>
                </li>
            ))}
                    </ul>
                </div>
        </div></div>

        
        </>
    )
}

export default EntryPage