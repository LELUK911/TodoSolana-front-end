import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import NavBar from './components/navBar'
import { OperationForm } from './components/operationform'
import TodoList from './components/todoList'
import { SetOffTodo } from './components/setOffTodo'
import { DeleteTodo } from './components/deleteTodo'


function App() {



  return (
    <Container>
      <NavBar />
      <Row className='m-4'>
        <TodoList />
      </Row>
      <Row className='m-4'>
        <Col className='m-2'>
          <OperationForm />
        </Col>
        <Col className='m-2'>
          <SetOffTodo />
        </Col>
        <Col>
          <DeleteTodo/>
        </Col>
      </Row>

    </Container>
  )
}

export default App
