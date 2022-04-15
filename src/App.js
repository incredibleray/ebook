import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'

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

  return (
  <Container>
      <Row>
    <Col>口号</Col>
    <Col>光储充一体系统</Col>
  </Row>
  <Row>
    <Col><Image src="solarpanel.jpg" height="40%" width="60%" /></Col>
    <Col><Image src="solarpanel.jpg" height="40%" width="60%" /></Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
  </Row>
  <Row>
    <Col>Hanotronics</Col>
    <Col>湖州好能科技有限公司</Col>
  </Row>
  </Container>
  );
}

export default Page;
