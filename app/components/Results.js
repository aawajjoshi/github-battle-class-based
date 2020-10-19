import React from "react";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from "react-icons/fa";
import PropTypes from "prop-types";

import Card from "./Card";
import Loading from './Loading';
import { battle } from "../utils/api";

function ProfileComponent({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { playerOne, playerTwo, onReset } = this.props;

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }
  render() {
    const { onReset } = this.props;
    const { winner, loser, error, loading } = this.state;

    return (
      <>
        {loading === true && <Loading text='Battling' />}

        {error && <p className="center-text error">{error}</p>}

        {loading === false && !error && (
          <>
            <div className="grid space-around container-sm">
              <Card
                header={winner.score === loser.score ? "Tie" : "Winner"}
                subHeader={`Score: ${winner.score.toLocaleString()}`}
                avatar={winner.profile.avatar_url}
                href={winner.profile.html_url}
                name={winner.profile.login}
              >
                <ProfileComponent profile={winner.profile} />
              </Card>

              <Card
                header={winner.score === loser.score ? "Tie" : "Loser"}
                subHeader={`Score: ${loser.score.toLocaleString()}`}
                avatar={loser.profile.avatar_url}
                href={loser.profile.html_url}
                name={loser.profile.login}
              >
                <ProfileComponent profile={loser.profile} />
              </Card>
            </div>
            <button className="btn dark-btn btn-space" onClick={onReset}>
              Reset
            </button>
          </>
        )}
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};
