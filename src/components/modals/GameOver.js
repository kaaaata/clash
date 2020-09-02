import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';

export const GameOver = () => {
  const { day } = useSelector(state => ({
    day: state.clashTown.day
  }), shallowEqual);
  const dispatch = useDispatch();

  return (
    <EventModal
      title='Game Over!'
      image='death'
    >
      <EventModalPage
        page={1}
        text={
          <React.Fragment>
            You survived <span className='violet'>{day} {day === 1 ? 'day' : 'days'}.</span>
          </React.Fragment>
        }
        options={[{
          name: 'Main Menu',
          onClick: () => dispatch(actions.resetGame())
        }]}
      />
    </EventModal>
  );
};
