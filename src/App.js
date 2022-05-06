import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
];

function Page() {
  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState(initialEdges);

  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );
  const chartheight=window.innerHeight*0.4;
  const chartWidth=window.innerWidth*0.98;

  return (
  <Container fluid={true}>
      <Row>
    <Col style={{textAlign: 'center', fontSize: 'x-large'}}>用好新能源 让山更绿、水更清、天更蓝</Col>
    <Col style={{textAlign: 'right'}}>好能光储充一体系统
    </Col>
  </Row>
  <Row>
    <Col><Image src="solarpanel.jpg" height="40%" width="60%" /></Col>
    <Col><Image src="solarpanel.jpg" height="40%" width="60%" /></Col>
    <Col style={{textAlign: 'right'}}>
    <p>太阳能 {data[data.length-1].太阳能} kWh</p>
    <p>储能 {data[data.length-1].储能} kWh</p>
    <p>电网 {data[data.length-1].电网} kWh</p>
    </Col>
  </Row>
  <Row>
    <Col>        
    <AreaChart
          width={chartWidth}
          height={chartheight}
          data={data}
          margin={{
            top: 10,
            right: 30,
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
  </Row>
  <Row>
    <Col>Hanotronics</Col>
    <Col style={{textAlign: 'right'}}>湖州好能科技有限公司</Col>
  </Row>
  </Container>
  );
}

export default Page;
