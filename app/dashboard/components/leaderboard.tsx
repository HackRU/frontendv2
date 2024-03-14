import React, { useEffect,useState } from 'react';
import { getLeaderboard } from '@/app/lib/data';

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
        <div>
            {leaderboard.map((entry, index) =>(
                <div key={index}>
                    <h3>{entry.place}</h3>
                    <h3>{entry.house}</h3>
                    <h3>{entry.points}</h3>
                </div>
            ))}
            
        </div>
    );
};
export default Leaderboard;