import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    太阳能: 4000,
    储能: 2400,
    电网: 2400,
  },
  {
    name: 'Page B',
    太阳能: 3000,
    储能: 1398,
    电网: 2210,
  },
  {
    name: 'Page C',
    太阳能: 2000,
    储能: 9800,
    电网: 2290,
  },
  {
    name: 'Page D',
    太阳能: 2780,
    储能: 3908,
    电网: 2000,
  },
  {
    name: 'Page E',
    太阳能: 1890,
    储能: 4800,
    电网: 2181,
  },
  {
    name: 'Page F',
    太阳能: 2390,
    储能: 3800,
    电网: 2500,
  },
  {
    name: 'Page G',
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
  const chartWidth=window.innerWidth*0.7;

  return (
  <Container fluid={true}>
      <Row>
    <Col>口号</Col>
    <Col style={{textAlign: 'right'}}>光储充一体系统
    </Col>
  </Row>
  <Row>
    <Col><Image src="solarpanel.jpg" height="40%" width="60%" /></Col>
    <Col><Image src="solarpanel.jpg" height="40%" width="60%" /></Col>
    <Col>2 of 2</Col>
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
