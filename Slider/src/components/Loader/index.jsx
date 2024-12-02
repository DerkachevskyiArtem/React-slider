import React, { Component } from 'react';
import { getUsers } from '../../api/users.js';
import User from '../User/index.jsx';
import s from './Loader.module.css';
import Navigation from '../Navigation/index.jsx';
import Loading from '../Loading/index.jsx';
import Error from '../Error/index.jsx';
import SlideshowControl from '../SlideshowControl/index.jsx';

class Loader extends Component {
  state = {
    users: [],
    error: null,
    isLoading: false,
    currentUser: 1,
    isAutoSliding: false,
    slideDelay: 3,
    intervalId: null,
    // errorMessage: '',
  };

  componentDidMount = () => {
    this.load();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentUser !== this.state.currentUser) {
      this.load();
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleNavigation = (action) => {
    let newUser;

    if (action === 'prev') {
      newUser = this.state.currentUser > 1 ? this.state.currentUser - 1 : 1;
    } else {
      newUser = this.state.currentUser + 1;
    }

    this.setState({
      currentUser: newUser,
    });
  };

  startAutoSlideShow = () => {
    if (!this.state.isAutoSliding) {
      const intervalId = setInterval(() => {
        this.setState((prevState) => ({
          currentUser: prevState.currentUser + 1,
        }));
      }, this.state.slideDelay * 1000);

      this.setState({
        isAutoSliding: true,
        intervalId,
      });
    }
  };

  // updateSlideDelay = (newDelay) => {
  //   if (newDelay === '') {
  //     this.setState({
  //       slideDelay: '',
  //       errorMessage: '',
  //     });
  //   } else if (newDelay >= 1) {
  //     this.setState({
  //       slideDelay: newDelay,
  //       errorMessage: '',
  //     });
  //   } else {
  //     this.setState({
  //       errorMessage: 'The delay should be at least 1 second',
  //     });
  //   }
  // };

  updateSlideDelay = (newDelay) => {
    this.setState({
      slideDelay: newDelay,
    });
  };

  handleSlideDelayChange = (event) => {
    const newDelay = event.target.value;

    if (newDelay === '') {
      this.updateSlideDelay(newDelay);
      return;
    }
    const regex = /^(?!0(\.0+)?$)(\d+(\.\d{0,2})?)$/;
    if (newDelay.match(regex)) {
      this.updateSlideDelay(newDelay);
    }
  };

  stopAutoSlideShow = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      isAutoSliding: false,
      intervalId: null,
    });
  };

  load = () => {
    const { currentUser, results } = this.state;

    this.setState({
      isLoading: true,
    });

    getUsers({ results, currentUser })
      .then((users) => {
        this.setState({
          users,
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const {
      users,
      isLoading,
      error,
      currentUser,
      isAutoSliding,
      slideDelay,
      errorMessage,
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Error message={error.message} />;
    }

    return (
      <div className={s.loaderContainer}>
        {users.map((user) => (
          <User key={user.login.uuid} user={user} />
        ))}
        <Navigation
          currentUser={currentUser}
          onNavigate={this.handleNavigation}
        />
        <SlideshowControl
          isAutoSliding={isAutoSliding}
          slideDelay={slideDelay}
          onStart={this.startAutoSlideShow}
          onStop={this.stopAutoSlideShow}
          onDelayChange={this.handleSlideDelayChange}
        />
        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }
}

export default Loader;
