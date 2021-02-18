### Backend

Completing the assignment proved to be a real learning experience for sure.
Although I have worked a bit with GraphQL in the past, I had never used this kind of comprehensive stack before, and there most likely are some, not the wisest practices used on this solution.

After battling with library documentations for a while I indeed arrived at a working solution.

Through the power of arbitrary nomination the hero Gideon has been granted the role of a `TreasureKeeper` that can access the vault. And for good merit, all the other heroes have received a `hero` role as well.

There is an oversight in my solution that I was not able to get around.
I was not able to import the hero resolver to the AuthChecker. To get around the fact that I could
not access the graphQL data, I changed the JWT to include the roles of the hero as well as the hero id.
This means that if we were to remove the TreasureKeeper role from the hero, the JWT would still function and that is not great.

Apparently, Class-based AuthChecker would have done the trick, but that is only included in a [future version](https://github.com/MichalLytek/type-graphql/commit/05dae42ce3d9cb11c754697685c969275884d69d) of type-graphql.
