import React from 'react';
import './NotFound.css';
import { NavLink } from 'react-router-dom';

class NotFound extends React.Component {
  state = {
    pageX: 0,
    pageY: 0,
    xAxis: 0,
    yAxis: 0,
  }

  componentDidMount() {
    const pageX = document.documentElement.clientWidth;
    const pageY = document.documentElement.clientHeight;
    this.setState({
      pageX,
      pageY,
    })
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    // verticalAxis
    const mouseY = event.pageY;
    const yAxis = (this.state.pageY/2-mouseY)/this.state.pageY*300;
    //horizontalAxis
    const mouseX = event.pageX / -this.state.pageX;
    const xAxis = -mouseX * 100 - 100;
    this.setState({
      yAxis,
      xAxis,
    })
  }

  render() {
    const { xAxis, yAxis } = this.state;
    return (
      <div className='box'>
        <div className='box__ghost'>
          <div className='symbol'></div>
          <div className='symbol'></div>
          <div className='symbol'></div>
          <div className='symbol'></div>
          <div className='symbol'></div>
          <div className='symbol'></div>

          <div className='box__ghost-container'>
            <div className='box__ghost-eyes' style={{'transform': 'translate('+ xAxis +'%,-'+ yAxis +'%)'}}>
              <div className='box__eye-left'></div>
              <div className='box__eye-right'></div>
            </div>
            <div className='box__ghost-bottom'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className='box__ghost-shadow'></div>
        </div>

        <div className='box__description text-center'>
          <div className='box__description-container mb-3'>
            <div className='box__description-title'>Whoops!</div>
            <div className='box__description-text'>It seems like we couldn't find the page you were looking for</div>
          </div>

          <NavLink to='/' className='btn btn-danger'>Go back</NavLink>
        </div>
      </div>
    )
  }
}

export default NotFound;
