import React from "react";
import { Rating } from "react-simple-star-rating";
import { useCookies } from "react-cookie";
//import { useState, useEffect } from "react";

const MyBook = (props) => {
  const [token] = useCookies(["mytoken"]);

  const RateBook = (body) => {
    return fetch("http://127.0.0.1:8000/api/ratings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  };
  const setVoteClass = (vote) => {
    if (vote >= 2.5) {
      return "green";
    } else {
      return "red";
    }
  };

  return (
    <>
      <div key={props.searchedBook.id} className="book">
        <img src={props.searchedBook.image} alt="slika"></img>
        <div className="book-info">
          <h3>{props.searchedBook.title}</h3>
          <h6>{props.searchedBook.author}</h6>
          <span
            className={`tag ${setVoteClass(props.searchedBook.avg_rating)}`}
          >
            {props.searchedBook.avg_rating}
          </span>
          <Rating
            key={props.searchedBook.id}
            onClick={(rate) => {
              RateBook({
                book: props.searchedBook.id,
                user: props.id,
                stars: rate,
              });
              window.location.reload();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MyBook;
