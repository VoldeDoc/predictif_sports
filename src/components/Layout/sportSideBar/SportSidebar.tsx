// import { useState } from 'react';
// import Tabs from '@/pages/Ui/tab';
// import SearchSection from '@/components/landingPage/Sport/Tools/searchSection';
// import LeaguesList from '@/components/landingPage/Sport/Tools/LeagueList';
// import Football from '@/components/landingPage/Sport/Football/Football';
// import Basketball from '@/components/landingPage/Sport/Basketball/Basketball';
// import NFL from '@/components/landingPage/Sport/NFL/NFL';
// import Rugby from '@/components/landingPage/Sport/Rugby/Rugby';
// import MLB from '@/components/landingPage/Sport/MLB/MLB';
// import Cricket from '@/components/landingPage/Sport/Cricket/cricket';
// import F1 from '@/components/landingPage/Sport/F1/F1';
// import Tennis from '@/components/landingPage/Sport/Tennis/Tennis';


// type Tab = keyof typeof leagues;

// export default function Sports() {
//     const [showSearch, setShowSearch] = useState(false);
//     const tabs: Tab[] = ["Football", "Basketball", "NFL", "Rugby", "MLB", "Cricket", "F1", "Tennis"];
//     const [activeTab, setActiveTab] = useState<Tab>("Football");

//     const renderContent = (activeTab: Tab) => {
//         switch (activeTab) {
//             case "Football":
//                 return <Football />;
//             case "Basketball":
//                 return <Basketball />;
//             case "NFL":
//                 return <NFL />;
//             case "Rugby":
//                 return <Rugby />;
//             case "MLB":
//                 return <MLB />;
//             case "Cricket":
//                 return <Cricket />;
//             case "F1":
//                 return <F1 />;
//             case "Tennis":
//                 return <Tennis />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className='py-20 sm:py-32 px-8 sm:px-16'>
//             {/* Search Toggle for Mobile */}
//             <div className="md:hidden mb-4 flex justify-between items-center">
//                 <div className="text-lg font-bold">Sports</div>
//                 <button
//                     className="p-2 text-gray-600"
//                     onClick={() => setShowSearch(!showSearch)}
//                 >
//                     <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
//                         />
//                     </svg>
//                 </button>
//             </div>
//             {showSearch && (
//                 <div className="md:hidden mt-4 bg-[#0C21C10D] px-4 py-4">
//                     <h1 className='pb-3'>Region</h1>
//                     <SearchSection onChange={(e) => console.log(e.target.value)} />
//                     <LeaguesList sport={activeTab} />
//                 </div>
//             )}
            
//             <div className="flex flex-col md:flex-row space-x-5">
//                 <div className="w-full md:w-1/3 hidden md:block">
//                     <div className='bg-[#0C21C10D] px-4 py-4'>
//                         <h1 className='pb-3'>Region</h1>
//                         <SearchSection onChange={(e) => console.log(e.target.value)} />
//                         <LeaguesList sport={activeTab} />
//                     </div>
//                 </div>
//                 <div className='w-full md:w-2/3'>
//                     <Tabs tabs={tabs} renderContent={renderContent} />
//                 </div>
//             </div>
//         </div>
//     );
// }