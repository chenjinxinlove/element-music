/**
 * Created by chenjinxin on 2017/12/24.
 */
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';
// import clazz from 'classnames';

import classes from './classes';
import ProgressImage from '../ProgressImage';

@injectSheet(classes)
@inject(stores => ({

}))
@observer
class Controller extends Component {

  render() {
    let {classes} = this.props;
    return (
      <div className={classes.container}>
        <div
          className={classes.bar}
          id="progress"
        >
          <div className={classes.playing} />
          <div className={classes.buffering} />
        </div>

        <section>
          <Link
            className="tooltip"
            data-text="ddd"
            to=""
          >
            <ProgressImage {...{
              height: 50,
              width: 50,
              src: 'sss'
            }} />
          </Link>

          <aside>
            <div className={classes.info}>
              <p className={classes.title}>
                <Link to={song.album.link}>{song.name}</Link>
              </p>

              <p className={classes.author}>
                {
                  song.artists.map((e, index) => {
                    return (
                      <Link key={index} to={e.link}>
                        {e.name}
                      </Link>
                    )
                  })
                }
              </p>
            </div>
          </aside>
        </section>
      </div>
    );
  }
}

export default Controller;