import React, { SyntheticEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import { RootState } from '../reducers';

interface ComponentProps {
  id: string;
}

const mapState = (
  { questions }: RootState,
  { id }: ComponentProps
) => {
  return {
    question: questions[id],
  }
}

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RouteComponentProps & ComponentProps;

const Question = ({ question, history }: Props) => {
  const showQuestion = (e: SyntheticEvent, id: string) => {
    e.preventDefault();
    history.push(`/questions/${id}`);
  }

  return (
    <Card className='mt-3' onClick={(e: SyntheticEvent) => showQuestion(e, question.id)}>
      <Card.Body>
        <Card.Title>Would You Rather</Card.Title>
        { question &&
          <ul>
            <li>{question.optionOne.text}</li>
            <li>{question.optionTwo.text}</li>
          </ul>
        }
      </Card.Body>
    </Card>
  )
}

export default connector(withRouter(Question));