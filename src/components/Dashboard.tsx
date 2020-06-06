import React, { useState } from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { RootState } from '../reducers';
import { connect, ConnectedProps } from 'react-redux';
import Question from './Question';

const mapState = ({ questions, users, authedUser}: RootState) => {
  if (!authedUser) return;
  const user = users[authedUser];
  const answeredQuestions = Object.keys(user.answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
  const unansweredQuestions = Object.keys(questions)
      .filter((questionId) => !answeredQuestions.includes(questionId))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestions,
    unansweredQuestions,
  }
}

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

const Dashboard: React.FC<PropsFromRedux> = ({
  answeredQuestions,
  unansweredQuestions
}) => {
  const [key, setKey] = useState('unanswered');

  return (
    <Tabs
      id='dashboard'
      activeKey={key}
      onSelect={(k: string) => setKey(k)}
      className='justify-content-center'
    >
      <Tab eventKey="unanswered" title="Unanswered">
        <Row>
          {unansweredQuestions.map( questionId =>
          <Col key={questionId} sm='6' md='4'>
            <Question id={questionId} />
          </Col>
          )}
        </Row>
      </Tab>
      <Tab eventKey="answered" title="Answered">
        <Row>
          {answeredQuestions.map( questionId =>
          <Col key={questionId} sm='6' md='4'>
            <Question id={questionId} />
          </Col>
          )}
        </Row>
      </Tab>
    </Tabs>
  )
}

export default connector(Dashboard);