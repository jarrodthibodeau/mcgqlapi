# mcgqlapi

The unofficial API for [Metacritic](https://metacritic.com)

## Table of Contents 
- [Endpoint](#endpoint)
- [Example](#example)
- [Queries](#queries)
    - [game](#game)
    - [games](#games)
    - [movie](#movie)
    - [movies](#movies)
    - [tvshow](#tvshow)
    - [tvshows](#tvshows)
    - [album](#album)
    - [albums](#albums)
- [Soon to be added](#soon-to-be-added)
- [FAQ](#faq)
- [Find a bug?](#find-a-bug)
- [Want to contribute?](#want-to-contribute)
- [Donate](#donate)

## Endpoint
All queries need to be directed to `https://mcgqlapi.com`.

You can mess around with the API [here](https://mcgqlapi.com) to get a feel for things.

If you do not want to use the playground above, I recommend using something like [Altair](https://altair.sirmuel.design/)

## Example
Here is what an example request would look like.

What if I wanted to get all the available information the API provides about Resident Evil 2 (2019) for the PlayStation 4?
This is what it would look like 

```
query {
  game(input: {
    title: "Resident Evil 2",
    platform: "PlayStation 4"
  }) {
    url
    title
    platform
    criticScore
    releaseDate
    developer
    publisher
    genres
    numOfCriticReviews
    numOfPositiveCriticReviews
    numOfMixedCriticReviews
    numOfNegativeCriticReviews
    productImage
  }
}
```

the above request will return this response 

```
{
  "data": {
    "game": {
      "url": "https://www.metacritic.com/game/playstation-4/resident-evil-2",
      "title": "Resident Evil 2",
      "platform": "PlayStation 4",
      "criticScore": 91,
      "releaseDate": "Jan 25, 2019",
      "developer": "Capcom R&D Division 1",
      "publisher": [
        "Capcom"
      ],
      "genres": [
        "Action Adventure",
        "Survival"
      ],
      "numOfCriticReviews": 85,
      "numOfPositiveCriticReviews": 84,
      "numOfMixedCriticReviews": 1,
      "numOfNegativeCriticReviews": 0,
      "productImage": "https://static.metacritic.com/images/products/games/6/fb1f200c3315a838e3ae1aa4f1f77045-98.jpg"
    }
  }
}
```

## Queries
### game 
**Retrieve a game from Metacritic**

**Input (Game type)**
<table>
    <tr>
        <th> Field </th>
        <th> Type </th>
        <th> Description </th>
    </tr>
    <tr>
        <td>title</td>
        <td>String (required)</td>
        <td>The title of the game</td>
    </tr>
    <tr>
        <td>platform</td>
        <td>String (required)</td>
        <td>
            The platform the game is on. Supported platforms are...
            <ul>
                <li>pc</li>
                <li>ios</li>
                <li>dreamcast</li>
                <li>gameboy advance</li>
                <li>ds</li>
                <li>3ds</li>
                <li>nintendo 64</li>
                <li>gamecube</li>
                <li>wii</li>
                <li>wii u</li>
                <li>switch</li>
                <li>playstation</li>
                <li>playstation 2</li>
                <li>playstation 3</li>
                <li>playstation 4</li>
                <li>psp</li>
                <li>playstation vita</li>
                <li>xbox</li>
                <li>xbox 360</li>
                <li>xbox one</li>
            <ul>
        </td>
    </tr>
</table>

**Returnable Fields (GameInfo type)**
<table>
    <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>url</td>
        <td>String</td>
        <td>The Metacritic URL associated to the product</td>
    </tr>
    <tr>
        <td>title</td>
        <td>String</td>
        <td>Title of the product</td>
    </tr>
    <tr>
        <td>platform</td>
        <td>String</td>
        <td>Platform the product is on</td>
    </tr>
    <tr>
        <td>criticScore</td>
        <td>Int</td>
        <td>The Metacritic score of the product</td>
    </tr>
    <tr>
        <td>releaseDate</td>
        <td>String</td>
        <td>The release date of the product</td>
    </tr>
    <tr>
        <td>developer</td>
        <td>String</td>
        <td>The developer of the game</td>
    </tr>
    <tr>
        <td>publisher</td>
        <td>[String]</td>
        <td>The publisher(s) of the game</td>
    </tr>
    <tr>
        <td>genres</td>
        <td>[String]</td>
        <td>The genres of the product</td>
    </tr>
    <tr>
        <td>numOfCriticReviews</td>
        <td>Int</td>
        <td>The num of overall critic reviews on the product</td>
    </tr>
    <tr>
        <td>numOfPositiveCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were positive</td>
    </tr>
    <tr>
        <td>numOfMixedCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were mixed</td>
    </tr>
    <tr>
        <td>numOfNegativeCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were negative</td>
    </tr>
    <tr>
        <td>productImage</td>
        <td>String</td>
        <td>A URL to an image of the product</td>
    </tr>
</table>

## games
**Retrieve a list of games from Metacritic**

**Input**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[Game] (required)</td>
        <td>A list of Game types, please refer to the game query input</td>
    </tr>
</table>

**Returnable Values**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[GameInfo]</td>
        <td>A list of GameInfo types, please refer to the game query return values</td>
    </tr>
</table>


## movie 
**Retrieve a movie from Metacritic**

**Input (Movie type)**
<table>
    <tr>
        <th> Field </th>
        <th> Type </th>
        <th> Description </th>
    </tr>
    <tr>
        <td>title</td>
        <td>String (required)</td>
        <td>The title of the movie</td>
    </tr>
    <tr>
        <td>year</td>
        <td>String (required)</td>
        <td>The year the movie was released. This is required due to the nature of remakes</td>
    </tr>
</table>

**Returnable Values (MovieInfo type)**
<table>
    <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>url</td>
        <td>String</td>
        <td>The Metacritic URL associated to the product</td>
    </tr>
    <tr>
        <td>title</td>
        <td>String</td>
        <td>Title of the product</td>
    </tr>
    <tr>
        <td>criticScore</td>
        <td>Int</td>
        <td>The Metacritic score of the product</td>
    </tr>
    <tr>
        <td>releaseDate</td>
        <td>String</td>
        <td>The release date of the product</td>
    </tr>
    <tr>
        <td>year</td>
        <td>String</td>
        <td>The year the movie was released</td>
    </tr>
    <tr>
        <td>director</td>
        <td>[String]</td>
        <td>The director(s) of the movie </td>
    </tr>
    <tr>
        <td>genres</td>
        <td>[String]</td>
        <td>The genres of the product</td>
    </tr>
    <tr>
        <td>cast</td>
        <td>String</td>
        <td>A list of actors/actresses in the movie</td>
    </tr>
    <tr>
        <td>rating</td>
        <td>String</td>
        <td>The movie rating from the MPAA (Motion Picture Association of America) </td>
    </tr>
    <tr>
        <td>runtime</td>
        <td>String</td>
        <td>How long the movie is</td>
    </tr>
    <tr>
        <td>summary</td>
        <td>String</td>
        <td>A small blurb about what the movie is about</td>
    </tr>
    <tr>
        <td>numOfCriticReviews</td>
        <td>Int</td>
        <td>The num of overall critic reviews on the product</td>
    </tr>
    <tr>
        <td>numOfPositiveCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were positive</td>
    </tr>
    <tr>
        <td>numOfMixedCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were mixed</td>
    </tr>
    <tr>
        <td>numOfNegativeCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were negative</td>
    </tr>
    <tr>
        <td>productImage</td>
        <td>String</td>
        <td>A URL to an image of the product</td>
    </tr>
</table>

## movies
**Retrieve a list of movies from Metacritic**

**Input**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[Movie] (required)</td>
        <td>A list of Movie types, please refer to the movie query input</td>
    </tr>
</table>

**Returnable Values**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[MovieInfo]</td>
        <td>A list of MovieInfo types, please refer to the movie query return values</td>
    </tr>
</table>

## tvshow
**Retrieve a tvshow from Metacritic**

**Input (TVShow type)**
<table>
    <tr>
        <th> Field </th>
        <th> Type </th>
        <th> Description </th>
    </tr>
    <tr>
        <td>title</td>
        <td>String (required)</td>
        <td>The title of the game</td>
    </tr>
    <tr>
        <td>season</td>
        <td>String</td>
        <td>The particular season of the show, if no season is provided, then an overview of the show (all seasons) will be grabbed</td>
    </tr>
</table>

**Returnable Values (TVShowInfo type)**
<table>
    <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>url</td>
        <td>String</td>
        <td>The Metacritic URL associated to the product</td>
    </tr>
    <tr>
        <td>title</td>
        <td>String</td>
        <td>Title of the product</td>
    </tr>
    <tr>
        <td>criticScore</td>
        <td>Int</td>
        <td>The Metacritic score of the product</td>
    </tr>
    <tr>
        <td>releaseDate</td>
        <td>String</td>
        <td>The release date of the product</td>
    </tr>
    <tr>
        <td>genres</td>
        <td>[String]</td>
        <td>The genres of the product</td>
    </tr>
    <tr>
        <td>summary</td>
        <td>String</td>
        <td>Small blurb about what the show/season is about</td>
    </tr>
    <tr>
        <td>numOfCriticReviews</td>
        <td>Int</td>
        <td>The num of overall critic reviews on the product</td>
    </tr>
    <tr>
        <td>numOfPositiveCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were positive</td>
    </tr>
    <tr>
        <td>numOfMixedCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were mixed</td>
    </tr>
    <tr>
        <td>numOfNegativeCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were negative</td>
    </tr>
    <tr>
        <td>productImage</td>
        <td>String</td>
        <td>A URL to an image of the product</td>
    </tr>
</table>

## tvshows
**Retrieve a list of tv shows from Metacritic**

**Input**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[TVShow] (required)</td>
        <td>A list of TVShow types, please refer to the tvshow query input</td>
    </tr>
</table>

**Returnable Values**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[TVShowInfo]</td>
        <td>A list of TVShowInfo types, please refer to the tvshow query return values</td>
    </tr>
</table>

## album
**Retrieve a album from Metacritic**

**Input (Album type)**
<table>
    <tr>
        <th> Field </th>
        <th> Type </th>
        <th> Description </th>
    </tr>
    <tr>
        <td>album</td>
        <td>String (required)</td>
        <td>The title of the album</td>
    </tr>
    <tr>
        <td>artist</td>
        <td>String (required)</td>
        <td>The artist of the album</td>
    </tr>
</table>

**Returnable Values (AlbumInfo type)**
<table>
    <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>url</td>
        <td>String</td>
        <td>The Metacritic URL associated to the product</td>
    </tr>
    <tr>
        <td>title</td>
        <td>String</td>
        <td>Title of the product</td>
    </tr>
    <tr>
        <td>criticScore</td>
        <td>Int</td>
        <td>The Metacritic score of the product</td>
    </tr>
    <tr>
        <td>releaseDate</td>
        <td>String</td>
        <td>The release date of the product</td>
    </tr>
    <tr>
        <td>publisher</td>
        <td>String</td>
        <td>The publisher of the album</td>
    </tr>
    <tr>
        <td>genres</td>
        <td>[String]</td>
        <td>The genres of the product</td>
    </tr>
    <tr>
        <td>numOfCriticReviews</td>
        <td>Int</td>
        <td>The num of overall critic reviews on the product</td>
    </tr>
    <tr>
        <td>numOfPositiveCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were positive</td>
    </tr>
    <tr>
        <td>numOfMixedCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were mixed</td>
    </tr>
    <tr>
        <td>numOfNegativeCriticReviews</td>
        <td>Int</td>
        <td>The number of critic reviews that were negative</td>
    </tr>
    <tr>
        <td>productImage</td>
        <td>String</td>
        <td>A URL to an image of the product</td>
    </tr>
</table>

## albums
**Retrieve a list of albums from Metacritic**

**Input**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[Album] (required)</td>
        <td>A list of Album types, please refer to the album query input</td>
    </tr>
</table>

**Returnable Values**
<table>
    <tr>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>[AlbumInfo]</td>
        <td>A list of AlbumInfo types, please refer to the album query return values</td>
    </tr>
</table>

## Soon to be added
Features to be added down the road
- Support to get information based on a person/company
- Support getting the individual reviews for a specific product

## FAQ
**Why is the first request slow?**
<br />
If it's the first time a particular product is being requested, it will go to Metacritic to get the information, which is why it's slow. However, after the first request is done, any subsequent request will be significantly faster.

**When will the new features be implemented?**
<br />
I will hope to add new stuff in the year of 2020 barring there isn't a swarm of issues once release happens

## Find a bug?
Feel free to make a new issue in the issues tab of the repository. I will try my best to be as responsive as possible.

## Want to contribute?
Feel free to submit a PR if you think you have a good contribution to the API! Whether it be a new feature or a bug fix, any help is highly appreciated.

## Donate 
If you would like to show your support or help server costs, feel free to donate to me [here](paypal.me/jarrodthibodeau).
