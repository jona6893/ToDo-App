import Task from '@/app/entities/Tasks'
import { format } from 'path';
import React, { useEffect } from 'react'

function TimeStamp({ currentTask }: { currentTask: Task }) {
    const [time, setTime] = React.useState<string>("")  
    //console.log("currentTask", currentTask)
    useEffect(() => {
        const myDate = new Date(currentTask.created_at * 1000);
        const formattedDate = myDate.toLocaleDateString("en-GB"); // Use British English date format (day/month/year)
        setTime(formattedDate)
    }, [])


  return (
    <div className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-300 text-sm">
      {time} 
    </div>
  );
}

export default TimeStamp