import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
import MovieItem from "./item";
import {Container, Jumbotron, Row, Col} from "reactstrap";
import { useParams } from 'react-router';
import Header from "./header.js";
import "./board.css"

const Board = () => {

    var params = useParams();
    var query = params.query;

    const [movies, setMovies] = useState([]);
    const [update, setUpdate] = useState(false);

    const _getMovie = async () => {
        try{ 
            await 
                axios.get(`http://49.50.160.16:6006/movie?query=${query}`)
                .then(response => {
                console.log(response.data);
                setMovies(response.data);
                });
        } catch (error) {
            if (!axios.isCancel(error)) {
            throw error;
          }
        } 
    };

    useEffect(() => {
        _getMovie();
    }, []);


    const _renderMovies = () => {
        const movieList = movies.map(movie => {
            console.log(movie.actor);
            return <MovieItem
                title={movie.title} 
                link={movie.link}
                image={movie.image}
                pubDate={movie.pubDate} 
                director={movie.director}
                actor={movie.actor}
                userRating={movie.userRating} 
            />
        })
        return movieList
    }

    return (
        <>
            <Header query={query}></Header>
            <div className="MovieBoard">
                <Jumbotron fluid="true">
                <Container>  
                        <Row xs="3" md="3" lg="3" className="mb-5">
                            {_renderMovies()}
                        </Row>
                </Container>
                </Jumbotron>
            </div>
        </>
    );  
};

export default Board;