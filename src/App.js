import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';
import RealtimeData from './realtimeData';
const { ipcRenderer } = window.require("electron");

function Page() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [graphData, setGraphData]=useState([])


  useEffect(() => {

    const job= setInterval(
      async ()=>{
        const data=await ipcRenderer.invoke('getGraphData');

        let graphData=[]
      for (let i=12; i>0; i--){
        graphData.push({
          time:i.toString()+":00",
          ...(data[12-i])
        })
      }
      setGraphData(graphData);
      }, 60000);
      return ()=>clearInterval(job);
  }, [])

  const radios = [
    { name: '小时', value: '1' },
    { name: '天', value: '2' },
    { name: '星期', value: '3' },
  ];

  const videoHeight=window.innerHeight*0.3;
  const videoWidth=window.innerWidth*0.7;
  const chartheight=window.innerHeight*0.4;
  const chartWidth=window.innerWidth/12*9;
  const padWidth=window.innerWidth*0.1;

  return (<div>
  <Container fluid={true}>
      <Row >
    <Col style={{textAlign: 'center', fontSize: 'xxx-large', fontFamily: 'Microsoft YaHei'}}>用好新能源 让山更青、水更绿、天更蓝</Col>
    </Row>
    <Row>
    <Col xs={8}></Col>
    <Col xs={3} style={{textAlign: 'right', fontSize: 'xx-large'}}>好能光储充一体系统
    </Col>
    <Col xs={1}></Col>
  </Row>
  <Row>
    <Col xs={1}></Col>
    <Col xs={6}>
    <video controls height={videoHeight} 
    // width={videoWidth} 
    autoPlay loop>
    <source src="testvideo.mp4" 
            type="video/mp4" />
 </video>
    </Col>
    <Col xs={2}></Col>
    <Col xs={2} style={{textAlign: 'right', fontSize: 'x-large'}}>
    <RealtimeData />
    </Col>
    <Col xs={1}></Col>
  </Row>
  <Row>
    <Col xs={1}></Col>
    <Col xs={9}>        
    <AreaChart
          width={chartWidth}
          height={chartheight}
          data={graphData}
          margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" margin={{left: 5}}/>
          <Area type="monotone" dataKey="光伏日发电量" stackId="1" stroke="#8884d8" fill="#8884d8" />
          {/* <Area type="monotone" dataKey="储能" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="电网" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
        </AreaChart>
        </Col>
        <Col xs={2}>
          <br/><br/>
        <ButtonGroup vertical={true} style={{paddingLeft: "55px"}}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant='outline-success'
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ ButtonGroup>
        </Col>
  </Row>
  <Row>
    <Col style={{textAlign: 'right', fontSize: 'xx-large'}}>Hanotronics 湖 州 好 能 科 技 有 限 公 司</Col>
  </Row>
  <Row>
  <Col xs={8}></Col>
  <Col xs={3} style={{textAlign: 'right', fontSize: 'large'}}>
  {new Date().getFullYear()} 年 {new Date().getMonth() + 1} 月 {new Date().getDate()} 日
  </Col>
  <Col xs={1}></Col>
  </Row>
  </Container>
  </div>);
}

export default Page;
