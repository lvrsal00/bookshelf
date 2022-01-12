import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useCookies } from "react-cookie";
import Book from "./components/Book";
import MyBook from "./components/MyBook";
//import { useHistory } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);
  const [name, removeName] = useCookies(["ime"]);
  // eslint-disable-next-line
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setSearch] = useState(false);
  let [searchedBook, setSearchedBook] = useState([]);
  const [id, setId] = useState(0);

  //let history = useHistory();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        resp.map((users) =>
          users.username === name["ime"] ? setId(users.id) : setId(0)
        );
      })
      .catch((error) => console.log(error));
  }, [name, token]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setBooks(resp))
      .catch((error) => console.log(error));
  }, [token]);

  useEffect(() => {
    if (!token["mytoken"]) {
      // history.push("/");
      window.location.href = "/";
    }
  }, [token]);

  const logoutBtn = () => {
    removeToken(["mytoken"]);
    removeName(["ime"]);
  };

  //za search
  const handleOnSubmit = (e) => {
    e.preventDefault();
    books.forEach((book) => {
      if (
        book.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
        book.author.toUpperCase().includes(searchTerm.toUpperCase())
      ) {
        fetch("http://127.0.0.1:8000/api/books/" + book.id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token["mytoken"]}`,
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            setSearchedBook(resp);
            setSearch(true);
            console.log(searchedBook);
            console.log(book.id);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="app">
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
        <div className="korisnik">
          <h5>Logged in as: {name["ime"]}</h5>
        </div>
        <button onClick={logoutBtn}>Logout</button>
      </header>

      <div className="book-container">
        {isSearch ? <MyBook searchedBook={searchedBook} id={id} /> : <></>}
      </div>
      <br />
      <br />
      <div className="book-container">
        <Book books={books} id={id} />
      </div>
    </div>
  );
}
export default App;
