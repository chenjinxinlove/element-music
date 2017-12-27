/**
 * Created by chenjinxin on 2017/12/24.
 */
export default theme => ({
  container: {
    position: 'relative',
    padding: 0,
    margin: 0,
    background: '#ddd',
    overflow: 'hidden',

    '& img': {
      height: 'auto',
      pointerEvents: 'none'
    },
  },

  main: {
    dispaly: 'block',
    opacity: 0,
    transition: 'opacity .5s ease-out'
  },

  thumb: {
    '& img': {
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'opacity .3s ease-out',
      filter: 'blur(30px)'
    },

    '&$loaded img': {
      opacity: 1,
    }
  },

  loaded: {
    '& $main': {
      opacity: 1
    },

    '& $thumb img': {
      opacity: 0
    }
  }
});