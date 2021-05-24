import React, { Component } from 'react';
import moviesApi from '../../movies-api/movies-api';

export class Reviews extends Component {
  state = { reviews: [] };

  async componentDidMount() {
    try {
      const { movieId } = this.props.match.params;
      const response = await moviesApi.getReviews(movieId);
      this.setState({ reviews: response });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <div>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          'We dont`t have any reviews for this movie'
        )}
      </div>
    );
  }
}

export default Reviews;
