import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';

const data = [
  {
    name: '1:00',
    太阳能: 4000,
    储能: 2400,
    电网: 2400,
  },
  {
    name: '2:00',
    太阳能: 3000,
    储能: 1398,
    电网: 2210,
  },
  {
    name: '3:00',
    太阳能: 2000,
    储能: 9800,
    电网: 2290,
  },
  {
    name: '4:00',
    太阳能: 2780,
    储能: 3908,
    电网: 2000,
  },
  {
    name: '5:00',
    太阳能: 1890,
    储能: 4800,
    电网: 2181,
  },
  {
    name: '6:00',
    太阳能: 2390,
    储能: 3800,
    电网: 2500,
  },
  {
    name: '7:00',
    太阳能: 3490,
    储能: 4300,
    电网: 2100,
  },
  {
    name: '8:00',
    太阳能: 2000,
    储能: 9800,
    电网: 2290,
  },
  {
    name: '9:00',
    太阳能: 2780,
    储能: 3908,
    电网: 2000,
  },
  {
    name: '10:00',
    太阳能: 1890,
    储能: 4800,
    电网: 2181,
  },
  {
    name: '11:00',
    太阳能: 2390,
    储能: 3800,
    电网: 2500,
  },
  {
    name: '12:00',
    太阳能: 3490,
    储能: 4300,
    电网: 2100,
  },
];


function Page() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

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
    光伏 {data[data.length-1].太阳能} kWh<br />
    储能 {data[data.length-1].储能} kWh<br />
    电能 {data[data.length-1].电网} kWh<br />
    充电 {data[data.length-1].电网} kWh
    </Col>
    <Col xs={1}></Col>
  </Row>
  <Row>
    <Col xs={1}></Col>
    <Col xs={9}>        
    <AreaChart
          width={chartWidth}
          height={chartheight}
          data={data}
          margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" margin={{left: 5}}/>
          <Area type="monotone" dataKey="太阳能" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="储能" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="电网" stackId="1" stroke="#ffc658" fill="#ffc658" />
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
