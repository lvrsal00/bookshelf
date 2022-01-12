import React from "react";
import { Rating } from "react-simple-star-rating";
import { useCookies } from "react-cookie";
//import { useState, useEffect } from "react";

const setVoteClass = (vote) => {
  if (vote >= 2.5) {
    return "green";
  } else {
    return "red";
  }
};

const Book = (props) => {
  const [token] = useCookies(["mytoken"]);

  const RateBook = (body) => {
    return fetch("http://127.0.0.1:8000/api/ratings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
      body: JSON.stringify(body),
    }).then((resp) => {
      console.log(body);
      resp.json();
    });
  };

  return (
    <>
      {props.books.map((book, index) => (
        <div key={book.id} className="book">
          <img src={book.image} alt={book.title}></img>
          <div className="book-info">
            <h3>{book.title}</h3>
            <h6>{book.author}</h6>
            <span className={`tag ${setVoteClass(book.avg_rating)}`}>
              {book.avg_rating}
            </span>
            <Rating
              key={book.id}
              onClick="{(rate) => {
                RateBook({ book: book.id, user: props.id, stars: rate });
              }} ; window.location.reload();"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Book;
