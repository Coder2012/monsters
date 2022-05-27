export const api =
  process.env.NODE_ENV === 'production'
    ? 'https://monsters-rewards.herokuapp.com/'
    : 'https://monsters-rewards.herokuapp.com/';
