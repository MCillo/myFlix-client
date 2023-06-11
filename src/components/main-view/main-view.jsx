import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Shawshank Redemption",
            description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
            genre: "Drama",
            director: "Frank Darabont",          
            image: "https://www.alamy.com/the-shawshank-redemption-1994-directed-by-frank-darabont-and-starring-tim-robbins-morgan-freeman-and-bob-gunton-adaptation-of-stephen-kings-short-story-about-the-bond-of-friendship-between-two-prisoners-who-find-a-way-to-keep-hope-alive-in-adverse-circumstances-image408754939.html?imageid=945A41A4-4E2A-4A81-A93D-ED9ABAF90BC2&p=342367&pn=1&searchId=5be55c4f97f6b48145a8ccfd75234089&searchtype=0",
        },
        {
            id: 2,
            title: "The Godfather",
            description: "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
            genre: "Crime",
            director: "Francis Ford Coppola",          
            image: "https://en.wikipedia.org/wiki/The_Godfather#/media/File:Godfather_ver1.jpg",
        },
        {
            id: 3,
            title: "The Dark Knight",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre: "Action",
            director: "Christopher Nolan",        
            image: "https://en.wikipedia.org/wiki/The_Dark_Knight#/media/File:The_Dark_Knight_(2008_film).jpg",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))
            }
        </div>
    );
};