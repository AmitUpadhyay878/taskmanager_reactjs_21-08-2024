import { AppsOutline, GridOutline, HomeOutline, LogOutOutline, ManOutline, NewspaperOutline, NotificationsOutline, PeopleOutline, PieChartOutline } from "react-ionicons"

const Sidebar = () => {


    const navLinks=[
        {title:"Home",icon:<HomeOutline color="#555" width={"22px"} height={"22px"} />, active:false },
        {title:"Boards",icon:<AppsOutline color="#555" width={"22px"} height={"22px"} />, active:true },
        {title:"Projects",icon:<GridOutline color="#555" width={"22px"} height={"22px"} />, active:false },
        {title:"Users List",icon:<ManOutline color="#555" width={"22px"} height={"22px"} />, active:false },
        {title:"Analitics",icon:<PieChartOutline color="#555" width={"22px"} height={"22px"} />, active:false },
        {title:"Workflows",icon:<PeopleOutline color="#555" width={"22px"} height={"22px"} />, active:false },
        {title:"Notifications",icon:<NotificationsOutline color="#555" width={"22px"} height={"22px"} />, active:false },
        {title:"Newsletter",icon:<NewspaperOutline color="#555" width={"22px"} height={"22px"} />, active:false },
    ]

  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px]">
        <div className="w-full flex items-center md:justify-start md:pl-5 h-[70px] bg-white">
           <span className="text-orange-400 font-semibold text-2xl md:block hidden">Task Manager.</span>
           <span className="text-orange-400 font-semibold text-2xl md:hidden block">TM.</span>
        </div>
        <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-white py-5 px-3 relative">
         {
            navLinks.map((link)=>{
                return( 
                    <div key={link?.title} className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${link?.active ?"bg-orange-300" :"bg-transparent"}`}>
                        {link?.icon}
                        <span className="font-medium text-[15px] md:block hidden">{link?.title}</span>
                    </div>
                )
            })
         }

         <div className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200">
            <LogOutOutline />
            <span className="font-medium text-[15px] md:block hidden ">Logout</span>
         </div>
        </div>
    </div>
  )
}

export default Sidebar