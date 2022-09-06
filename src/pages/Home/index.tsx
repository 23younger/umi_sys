import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name, setName } = useModel('global');
  const { initialState, loading, refresh } = useModel('@@initialState');
  console.log(initialState);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Guide name={String(loading)} />
        <Button onClick={() => refresh()}>点击</Button>
        <Button onClick={() => setName('new name')}>点击</Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
