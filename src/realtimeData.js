
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
const { ipcRenderer } = window.require("electron");

function RealtimeData() {
  const [realtimeData, setRealtimeData]=useState({});

  useEffect(() => {
    // let job=setInterval(syncRealtimeData, 60000);
    const updateRealtimeData=async ()=>{
      const data=await ipcRenderer.invoke('getRealtimeData');
      setRealtimeData(data);
    };

    updateRealtimeData();

       const job= setInterval(
            updateRealtimeData, 60000);

    return ()=>clearInterval(job);
  }, [])

  return (<div>
    光伏 {realtimeData.solarPower} kW<br />
    储能 {realtimeData.batteryPower} kW<br />
    电能 {realtimeData.有功功率} kW<br />
    充电 {realtimeData.累计充电电量} kWh<br/>
    放电 {realtimeData.累计放电电量} kWh
  </div>);
}

export default RealtimeData;
