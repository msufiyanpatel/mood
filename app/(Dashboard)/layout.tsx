import { UserButton } from "@clerk/nextjs";
import { ReactNode } from 'react'; // Import ReactNode


const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return(
        <div className='h-screen w-screen relative'>
            <aside className='w-[200px] absolute h-full left-0 top-0 border-r border-black/10'>
                Mood
            </aside>
            <div className='ml-[200px]'>
                <header className='h-[60px] border-b border-black/10 '>
                    Header
                    <div className='h-full w-full px-6 flex items-center justify-end'>
                        <UserButton />
                    </div>
                </header>
                <div>
                    {children}
                </div>
            </div>
            

        </div>
    )
  }
  
  export default DashboardLayout;