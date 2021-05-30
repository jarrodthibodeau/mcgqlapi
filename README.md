# mcgqlapi

The unofficial GraphQL API for [Metacritic](https://metacritic.com)

## Table of Contents 
- [Endpoint](#endpoint)
- [Docs](#docs)
- [Example](#example)
- [Soon to be added](#soon-to-be-added)
- [FAQ](#faq)
- [Find a bug?](#find-a-bug)
- [Want to contribute?](#want-to-contribute)
- [Donate](#donate)

## Endpoint
All queries need to be directed to `https://mcgqlapi.com/api`.

You can mess around with the API [here](https://mcgqlapi.com/api) to get a feel for things.

If you do not want to use the playground above, I recommend using something like [Altair](https://altair.sirmuel.design/)

## Docs
Documentation can be found [here](https://mcgqlapi.com/docs)

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
## Soon to be added
Features to be added down the road
- ~~Adding actual types to the repo~~
- ~~Adding enums to make console searches easier~~
- Adding more fields to each of the main entities
- Adding a search capability

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
