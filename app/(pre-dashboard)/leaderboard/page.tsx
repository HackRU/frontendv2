'use client'
import React, { useEffect,useState } from 'react';
import { getLeaderboard } from '@/app/lib/data';
import GenericSection from '../(landing)/sections/GenericSection';



const Leaderboard = () => {
    const[leaderboard, setLeaderboard] = useState<any[]>([]);
    
    const fetchData = async()=>{
        try{
            const data = await getLeaderboard();
            setLeaderboard(data);
    
            }catch(err){
                console.error('Unable to fetch leaderboard data', err);
            }
        };
    useEffect(() =>{
        fetchData();
        const interval = setInterval(()=> {
           fetchData();}, 120000); 
        
        return () => clearInterval(interval);
    }, []);
    
    return(
        
        <div className = " mt-44  ">
        <GenericSection title = "Leaderboard"> 
        <div className=" pt-10 relative z-10 mb-20 flex text-orange-300 mr-96 ">
        <table className="table table-auto ml-40 sm:ml-24  font-mono  border-separate [border-spacing:1.00rem] mr-96 2xl:mb-96 " >

        <thead className = "ring-1 sm:ring-4 ring-orange-300  rounded-3xl " >
        <tr className = "text-xs sm:text-lg md:text-xl lg:text-2xl " >
            
            <th className = " pr-8 lg:pr-20 p-4 font-extrabold	 md:p-6 ">Place</th>
            <th className = "pr-8  sm:pr-20 md:pr-48 lg:pr-64 xl:pr-80  font-extrabold	 p-4 md:p-6  ">Points</th>
            <th className = "pr-8  sm:pr-20 md:pr-48 lg:pr-64 xl:pr-80  font-extrabold	p-4 md:p-6  ">House</th>
            <th className = "font-extrabold	pr-24 p-2 sm:p-8">Logo</th>
        </tr>
        </thead>
        <tbody className = "ring-1 sm:ring-4 ring-orange-300 rounded-3xl ">
        {leaderboard.map((Leaderboard, index) =>(
                
                    <tr  className = " text-xs sm:text-lg  md:text-2xl lg:text-4xl lx:text-5xl">
                    <td className = "pt-6 pl-5 pr-8  lg:pr-20 pb-6 text-center font-extrabold	 ">{Leaderboard.place}</td>
                    <td className = "pt-6 pr-8 sm:pr-20  md:pr-48 lg:pr-64 xl:pr-80 pb-6 text-center font-extrabold	 ">{Leaderboard.points}</td>
                    <td className = "pt-6 pr-8  sm:pr-20 md:pr-48 lg:pr-64 xl:pr-80 pb-6 text-center font-extrabold	">{Leaderboard.house}</td>
                    <td className = "pt-6  pb-6 pl-6"> <img src= {"/landing/python.png"} alt = "logo" style={{width: 90, height: 90, borderRadius: 60/ 2}}/> </td>
                    </tr>
                
            ))}
        </tbody>
    </table>
    </div>
    </GenericSection>
    </div>
    );
};
export default Leaderboard;