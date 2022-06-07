import {FaHotjar} from 'react-icons/fa';
import CustomCard from '../../components/card';
import Temperature from '../../components/dashboard/temperature';

export default function Home() {
  return (
    <>
      <h5><FaHotjar />{' '}Dashboard</h5>
      <CustomCard>
        <Temperature />
      </CustomCard>
    </>
  );
}
