/**
 * Created by chenjinxin on 2017/12/24.
 */
import colors from '../../utils/colors';

export default theme => {
  return {
    container: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100vw',
      height: 50,
      background: '#fff',
      color: '#000',

      '& section': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },

      '& aside': {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 32,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',

        '& p': {
          margin: 0,
          padding: 0
        }
      }
    },

    bar: {
      width: '100vw',
      cursor: 'pointer',

      '&, & $palying, & $buffering': {
        position: 'fixed',
        left: 0,
        bottom: 50,
        height: 2
      },

      '& $playing': {
        width: '100%',
        background: 'linear-gradient(to right,#62efab 5%,#f2ea7d 15%,#f2ea7d 25%,#ff8797 35%,#ff8797 45%,#e1a4f4 55%,#e1a4f4 65%,#82fff4 75%,#82fff4 85%,#62efab 95%)',
        backgroundSize: '200%',
        backgroundPosition: 0,
        zIndex: 1,
        transform: 'translate3d(-100%, 0, 0)',
        transition: 'transform .2s ease-out',
      },

      '& $playing:after': {
        content: 'attr(data-time)',
        position: 'absolute',
        right: 0,
        bottom: 2,
        display: 'inline-block',
        padding: '10px 6px',
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#fff',
        background: '#000',
        whiteSpace: 'nowrap'
      },

      '& $buffering': {
        width: '100%',
        background: colors.randomGradient(),
        backgroundPosition: 0,
        opacity: .2,
        transform: 'translate3d(-100%, 0, 0)',
        transition: 'transform .2s ease-out'
      }
    },

    playing: {},
    buffering: {}
  };
};