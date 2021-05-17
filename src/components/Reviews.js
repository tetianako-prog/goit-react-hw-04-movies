import React, { Component } from 'react';
import moviesApi from '../movies-api/movies-api';

export class Reviews extends Component {
  state = { reviews: [] };

  async componentDidMount() {
    const response = await moviesApi.getReviews(
      this.props.match.params.movieId,
    );

    this.setState({ reviews: response });
  }
  render() {
    const { reviews } = this.state;
    return (
      <div>
        {reviews.length > 0 ? (
          <ul>
            {this.state.reviews.map(item => (
              <li key={item.id}>
                <h3>{item.author}</h3>
                <p>{item.content}</p>
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
