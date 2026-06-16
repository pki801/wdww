const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const searchMovie = async (title, year) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(title)}&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
  );
  const data = await response.json();
  const results = data.results.filter(
    (r) => r.media_type === "movie" || r.media_type === "tv",
  );

  if (results.length === 0) return null;

  let best = results[0];
  if (year) {
    const closest = results.find((r) => {
      const releaseDate = r.release_date || r.first_air_date;
      if (!releaseDate) return false;
      const resultYear = parseInt(releaseDate.slice(0, 4));
      return Math.abs(resultYear - year) <= 1;
    });
    if (closest) best = closest;
  }

  return {
    title: best.title || best.name,
    poster: best.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${best.poster_path}`
      : null,
    rating: best.vote_average?.toFixed(1),
    tmdbId: best.id,
    mediaType: best.media_type,
  };
};

export const getWatchProviders = async (tmdbId, mediaType) => {
  const response = await fetch(
    `${TMDB_BASE_URL}/${mediaType}/${tmdbId}/watch/providers?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
  );
  const data = await response.json();
  const usProviders = data.results?.US?.flatrate || [];

  return usProviders.map((p) => ({
    name: p.provider_name,
    logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
  }));
};
