import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import './Home.scss';
const Home = () => {
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (fetching) {
      setTimeout(() => {
        axios
          .get(
            `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currentPage}/20`,
          )
          .then((response) => {
            setLoading(false);
            setCardData([...cardData, ...response.data.list]);
            setCurrentPage((prevstate) => prevstate + 1);
          })
          .finally(() => {
            console.log('test');
            setLoading(false);
            setFetching(false);
          });
      }, 1000);
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target?.documentElement.scrollHeight -
        (e.target?.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };
  return (
    <div className='container'>
      {loading && <Loading />}
      <div className='cardList'>
        {cardData.map((data, index) => (
          <Card data={data} key={`${index}_${data.name}`} />
        ))}
      </div>
      {fetching && !loading && <Loading />}
    </div>
  );
};
export default Home;
