import MatchPostRequestInterface from './MatchPostRequestInterface';

export default interface MatchClubResponseInterface extends MatchPostRequestInterface {
  homeClub: {
    clubName: string;
  }
  awayClub: {
    clubName: string;
  }
}
