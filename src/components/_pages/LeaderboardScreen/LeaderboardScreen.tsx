import { Leaderboard } from '@/components/_common/Leaderboard';
import { LeaderBoardScreenStyles } from './styles';

export function LeaderBoardScreen() {
  return (
    <LeaderBoardScreenStyles>
      <section>
        <Leaderboard />
      </section>
    </LeaderBoardScreenStyles>
  );
}
