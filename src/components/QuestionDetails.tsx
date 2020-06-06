import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, Redirect, NavLink } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa'
import { RootState } from '../reducers';
import User from './User';
import { handleSaveAnswer } from '../actions/shared';
import { AnswerOption } from '../models/question';
import { formatDate } from '../utils/helper';

interface RouteParams {
  id: string;
}

const mapState = (
  { questions, users, authedUser }: RootState,
  props: RouteComponentProps<RouteParams>
) => {
  if (!authedUser) return;
  const { id } = props.match.params;
  const question = questions[id];
  const author = users[question.author];
  const isOption1Answered = question.optionOne.votes.includes(authedUser);
  const isOption2Answered = question.optionTwo.votes.includes(authedUser);
  const isAnswered = isOption1Answered || isOption2Answered;
  return {
    question,
    author,
    isAnswered,
    isOption1Answered,
  }
}

const mapDispatch = (dispatch: Function, props: RouteComponentProps<RouteParams>) => {
  const { id } = props.match.params;
  return {
    saveAnswer: (answer: AnswerOption) => {
      dispatch(handleSaveAnswer(id, answer));
    }
  }
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & RouteComponentProps<RouteParams>;

const QuestionDetails = ({
  question,
  author,
  isAnswered,
  isOption1Answered,
  saveAnswer,
}: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<AnswerOption>();

  const onSubmit = (e: React.FormEvent) => {
    console.log('submit click', e);
    e.preventDefault()
    if (selectedOption) {
      saveAnswer(selectedOption)
    }
  }

  const onClickRadio = (e: any) => {
    setSelectedOption(e.target.value)
  }

  const check = <FaCheck size="40" color='green'/>

  const render = () => {
    if (!question) {
      return <Redirect to='/404' />
    }

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const percentageOption1 = (optionOneVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)
    const percentageOptionTwo = (optionTwoVotes / (optionOneVotes + optionTwoVotes) * 100).toFixed(2)

    return (
      <Row>
        <Col md={{span: 6, offset: 3}}>
          <Card>
            <Card.Header>
              <User id={author.id} />
              <NavLink to='/' className='float-right btn btn-secondary'>Back</NavLink>
              <div className='mt-2 ml-2'>{formatDate(question.timestamp)}</div>
            </Card.Header>
            <Card.Body>
              <Card.Title>Would You Rather</Card.Title>
              {isAnswered ?
                <ul>
                  <li>
                    {question.optionOne.text} ({optionOneVotes} vote(s) | {percentageOption1}%){isOption1Answered ? check : null}
                  </li>
                  <li>
                    {question.optionTwo.text} ({optionTwoVotes} vote(s) | {percentageOptionTwo}%){!isOption1Answered ? check : null}
                  </li>
                </ul>:
                <Form>
                  <Form.Group>
                    <Form.Check
                      type='radio'
                      id='radio-1'
                      name='option'
                      value='optionOne'
                      label={question.optionOne.text}
                      onChange={onClickRadio}
                    />
                    <Form.Check
                      type='radio'
                      id='radio-2'
                      name='option'
                      value='optionTwo'
                      label={question.optionTwo.text}
                      onChange={onClickRadio}
                    />
                  </Form.Group>
                  <Button disabled={!selectedOption} onClick={onSubmit}>Submit</Button>
                </Form>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }

  return render();
}

export default connector(QuestionDetails);