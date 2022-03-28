import MatchPatchMainInterface from './MatchPatchMainInterface';

interface MatchPostRequestInterface extends MatchPatchMainInterface {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}

export default MatchPostRequestInterface;
