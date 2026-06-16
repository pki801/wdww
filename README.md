# 🍿 What Do We Watch?

A web app that helps groups with different tastes find a movie or TV show everyone will enjoy — powered by AI.

## The problem

When people with different tastes want to watch something together, picking what to watch can take forever. This app solves that by letting everyone enter their preferences, then using AI to find a recommendation that works for the whole group.

## Features

- Add any number of people, each with their own taste/mood input
- AI-powered recommendations (Claude API) tailored to the group
- Movie posters, ratings, and streaming availability (TMDB API)
- Filter by movies only, TV shows only, or both
- Shuffle for new recommendations (avoids repeats)
- Supports 7 languages: English, Korean, Spanish, Japanese, French, Chinese, German
- Fully responsive design

## Tech stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **AI:** Claude API (Anthropic)
- **Movie data:** TMDB API

## Live demo

https://wdww-omega.vercel.app

## Running locally

```bash
npm install
npm run dev
```

You'll need API keys for Claude and TMDB in a `.env` file:

```
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_TMDB_API_KEY=your_key_here
```
