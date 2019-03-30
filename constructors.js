function Movie(film) {
    this.name = film.Title;
    this.released = film.Released;
    this.rating = film.Rated;
    this.runtime = film.Runtime;
    this.genre = film.Genre;
    this.director = film.Director;
    this.starring = film.Actors;
    this.printData = function() {
        console.log("\nTitle: " + this.name + "\nRelease Date: " + this.released + "\nRated " + this.rating + "\nRuntime: " + this.runtime + "\nGenre: " + this.genre + "\nDirected by: " + this.director + "\nStarring: " + this.starring);
    }
}

function Song(song) {
    this.name = song.name;
    this.artist = song.artists[0].name;
    this.album = song.album.name;
    this.playtime = (Math.floor(song.duration_ms/1000)).toString() + " seconds";
    this.printData = function() {
        console.log("\nSong Name: " + this.name + "\nArtist: " + this.artist + "\nAlbum: " + this.album + "\nLength: " + this.playtime);
    }
}

module.exports = {
    Movie,
    Song
}