# FIVE TRIBES GAME

## DESCRIPTION

This is a variation of a board game called [Five Tribes](https://www.crowdgames.ru/collection/pyat-plemyon).  
Board game itself was created by [Bruno Cathala](https://boardgamegeek.com/boardgamedesigner/1727/bruno-cathala).

Check Backend repo [here](https://github.com/mamonten0k/five-tribes-game-server).

## TECH STACK

- React & Typescript
- Redux
- RTK Query
- Socket-io

Till the final version eveything could change.

Architecturally, the application has a modular structure.  
In the root of the module lies a page that defines a module, often it is a HOC component.  
In ui folder we can find ui components. Ui-providers folder represents components, providing necessary logic, needed for ui components to render the information.  
This is so-called approach, when we distinguish 'dumb' and 'smart' components'. This approach is not often seen today, but I was heavily advertised for it, so I decided to conduct an experiment.

## HOW INSTALL AND RUN

Final version vill be probably hosted on Heroku. Before that, you still won't be able to play the game just by installing github repo, because I won't share my .env file.
