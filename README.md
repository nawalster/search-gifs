# How to run

How to run:

```bash
npm install

npm run build

npm start
```

Add API key and URL to .env file. <br/>

Open [http://localhost:3000](http://localhost:3000) with your browser.

# Stack/libraries used (kept to a minimum)

- Next.js 13
- TypeScript
- Tailwind CSS
- Zod

## Endpoints used

- **Search Endpoint**: api.giphy.com/v1/gifs/search
- **Trending Endpoint**: api.giphy.com/v1/gifs/trending
- **Get GIFS by ID Endpoint**: api.giphy.com/v1/gifs

# Features:

- Type safety with TypeScript and Zod.
- A responsive masonry grid layout.
- Infinite scrolling (content is continuously loaded and displayed as the user scrolls down the page).
- Favourites are stored locally (liked gifs are stored in local storage).

## Bringing type safety using Typescript and Zod

- TypeScript allows you to define the types of variables, function arguments, and return values in your code. This helps catch type errors early in development rather than waiting for them to surface during testing or production.

- Zod makes type/schema validation simple. It allows you to define a schema for API responses or user inputs, and provides type validation to ensure that the received data conforms to the specified schema.

# Future improvements:

- Fetch data from the API and implement infinite scrolling using React Query: React Query helps to simplify and reduce the amount of boilerplate needed to fetch data and retry failed requests. It can handle infinite scrolling by providing a useInfiniteQuery hook.
- Virtualize the grid: To optimize the rendering of the grid by only rendering the visible items on the screen. This helps reduce the amount of DOM manipulations and provides a smooth scrolling experience. An example of a good grid virtualization library is React Virtuoso.
