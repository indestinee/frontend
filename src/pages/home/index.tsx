import {FaHotjar, FaKey} from 'react-icons/fa';
import {AuthKeyInput} from '../../components/authKey';
import CustomCard from '../../components/card';
import Temperature from '../../components/dashboard/temperature';
import {Spacing} from '../../components/spacing';

export default function Home() {
  return (
    <>
      <h5><FaKey />{' '}Auth Key</h5>
      <Spacing marginTop='0.5rem'/>
      <AuthKeyInput/>
      <Spacing marginTop='2rem'/>

      <h5><FaHotjar />{' '}Dashboard</h5>
      <Spacing marginTop='0.5rem'/>
      <CustomCard>
        <Temperature />
      </CustomCard>
    </>
  );
}
