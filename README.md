# AcceptedCoctails

## Objectives

Implement CocktailsDB API Integration

## Overview

### Requirements

    Cocktails
        The user must be able to:
            - View cocktails list
            - Filter Coctkails by Category
            - View all coctkail details on a separate page

    Search coctail(s)
        The user must be able to search for a cocktail

    Set Scheme
        The user must be able to select 'light'  or 'dark' mode

## Design

### The "Cocktails" component is responsible for displaying

Search Bar
Searched Cocktails are fetched from 'https://www.thecocktaildb.com/api/json/v1/1/search.php'

Cocktail Categories
Firstly Cocktail Categories are fetched from 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

Cocktails list
Then Cocktail List is fetched from 'https://www.thecocktaildb.com/api/json/v1/1/search.php'

### The "Cocktail Details" component is responsible for displaying coctail details

Cocktail Details are fetched from 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php'
