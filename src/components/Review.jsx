import React from 'react';

// review = reviewObj passed down from PlanetLocations
const Review = (props) => {
  console.log('line 5', props)

  // const renderLocationReview = () => {
    // console.log(props.locationId, props.review.reviewed_location_id)
    // return props.locationId === props.review.reviewed_location_id ? (<li>{props.review.rating} - {props.user.username}</li>) : null
  // }

  return(
    <ol>
    <li>{props.review.rating} - {props.user.username}</li>
    </ol>
  )
};

export default Review;
