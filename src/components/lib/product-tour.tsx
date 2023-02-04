import { FC, useEffect, useReducer } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

// Steps for the product tour
const tourSteps = [
  {
    target: '.tour-devices',
    content: 'Manage your registered devices here',
  },
  {
    target: '.tour-billing',
    content: 'View all your recent bill payments here',
  },
  {
    target: '.tour-maps-action',
    content: 'Manage your device location here',
  },
  {
    target: '.tour-claims-repairs',
    content: 'Make your device claims here',
  },
  {
    target: '.tour-account-settings',
    content: 'Manage your account settings here',
  },
  {
    target: '.tour-help-center',
    content: 'Get in touch with our support team here',
  },
];

// Initial state
const INITIAL_STATE = {
  key: new Date(),
  run: false,
  continuous: true,
  loading: false,
  stepIndex: 0,
  steps: tourSteps,
};

// Set up the reducer function
const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'START':
      return { ...state, run: true };
    case 'RESET':
      return { ...state, stepIndex: 0 };
    case 'STOP':
      return { ...state, run: false };
    case 'NEXT_OR_PREV':
      return { ...state, ...action.payload };
    case 'RESTART':
      return {
        ...state,
        stepIndex: 0,
        run: true,
        loading: false,
        key: new Date(),
      };
    default:
      return state;
  }
};

const ProductTour: FC = () => {
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    // show product tour when enabled (after signup)
    if (localStorage.getItem('tour') === 'enabled') {
      dispatch({ type: 'START' });
    }
  }, []);

  const callback = (data: any) => {
    const { action, index, type, status } = data;
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      localStorage.removeItem('tour');
      dispatch({ type: 'STOP' });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      dispatch({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  // programmatically start the tour
  // const startTour = () => {
  //   dispatch({ type: 'RESTART' });
  // };

  return (
    <div className="text-[15px]">
      <Joyride
        {...tourState}
        callback={callback}
        styles={{
          options: {
            primaryColor: '#6B4EFF',
            backgroundColor: '#FFF',
            beaconSize: 28,
          },
          beacon: {
            bottom: 7,
            left: 25,
          },
          buttonNext: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
          buttonBack: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
          buttonClose: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
          buttonSkip: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
          tooltipContent: {
            fontSize: '14px',
          },
        }}
        showSkipButton={true}
        locale={{ next: 'Next', close: 'End Tour', last: 'End Tour', back: 'Back' }}
      />
    </div>
  );
};

export default ProductTour;
