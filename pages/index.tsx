import { has } from 'lodash';
import { Meta } from '@/components/_common/Meta';
import { LeaderBoardScreen } from '@/components/_pages/LeaderboardScreen';

function TestPage() {
  return (
    <>
      <Meta title="testing" description="all my tests" image="/web-assets/images/start.png" />
      <LeaderBoardScreen />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      layoutValues: { hasHeader: false, hasFooter: false }
    }
  };
}

export default TestPage;
