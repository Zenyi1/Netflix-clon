import genres from './genres';
import movies from './movies';
import users from './users';
import ratings from './ratings';

export default {
    ...genres,
    ...movies,
    ...users,
    ...ratings
}