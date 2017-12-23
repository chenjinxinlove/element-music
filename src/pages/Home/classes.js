import colors from '../../utils/colors';

export default theme => ({
  container: {
    width: '100vw',
    height: '100vh',
    background: colors.randomGradient(),

    '& main': {
      background: 'liner-gradient(to top, transparent, rgba(255, 255, 255, 1))',
      height: '100vh'
    },
  },

  svg: {
    width: '100%',
    height: 200,
  },

  welcome: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 54,
    fontWeight: 'lighter',
    fill: 'url(#mask)',
    letterSpacing: 4.5,
    textShadow: `
      1px 1px 0 rgba(227, 218, 219, 1),
      3px 3px 0 rgba(227, 218, 219, 0.9),
      5px 5px 0 rgba(227, 218, 219, 0.8),
      7px 7px 0 rgba(227, 218, 219, 0.7),
      9px 9px 0 rgba(227, 218, 219, 0.6),
      11px 11px 0 rgba(227, 218, 219, 0.5),
      13px 13px 0 rgba(227, 218, 219, 0.4),
      15px 15px 0 rgba(227, 218, 219, 0.3),
      17px 17px 0 rgba(227, 218, 219, 0.2),
      19px 19px 0 rgba(227, 218, 219, 0.1),
      21px 21px 0 rgba(227, 218, 219, 0.08),
      22px 22px 0 rgba(227, 218, 219, 0.07)
    `
  },

  item: {
    position: 'relative',
    display: 'inline-block',
    minWidth: 130,
    textAlign: 'right',
    cursor: 'pointer',

    '& img': {
      width: 100,
      height: 100,
      borderRadius: 100,
      pointerEvents: 'none',
      transition: '.4s'
    }
  },

  info: {
    position: 'absolute',
    top: 100,
    right: 0,
    textAlign: 'right',
    color: '#fff',
    opacity: 0,
    transition: '1s',
    transform: 'translateY(-16px)'
  },

  subtitle: {
    display: 'inline-block',
    padding: '4px 8px',
    fontFamily: 'Roboto',
    fontWeight: 'lighter',
    fontSize: 11,
    background: '#000'
  },

  title: {
    display: '-webkit-box',
    padding: '6px 8px',
    background: '#000',
    lineHeight: '16px',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textAlign: 'ellipsis',
    transition: '.4s',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical'
  }
});