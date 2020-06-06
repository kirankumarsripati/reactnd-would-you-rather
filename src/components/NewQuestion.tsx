import React from 'react';
import { handleAddQuestion } from '../actions/shared';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Card, Form, Button } from 'react-bootstrap';

const mapDispatch = (dispatch: Function) => {
  return {
    addQuestion: (optionOne: string, optionTwo: string) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    }
  }
}

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps;

const NewQuestion = ({ addQuestion, history}: Props) => {
  const [optionOne, setOptionOne] = React.useState('');
  const [optionTwo, setOptionTwo] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addQuestion(optionOne, optionTwo);
    history.push('/');
  }

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Card.Title>Would You Rather</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Option One</Form.Label>
                <Form.Control
                  type='text'
                  value={optionOne}
                  onChange={(e) => setOptionOne(e.target.value) }
                  placeholder='Option One'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Option Two</Form.Label>
                <Form.Control
                  type='text'
                  value={optionTwo}
                  onChange={(e) => setOptionTwo(e.target.value)}
                  placeholder='Option Two'
                />
              </Form.Group>
              <Button type='submit' disabled={!optionOne && !optionTwo}>Submit</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default connector(withRouter(NewQuestion));