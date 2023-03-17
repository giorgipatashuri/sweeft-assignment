import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';

import './CardsList.scss';
const CardsList = ({ id }) => {
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (fetching) {
      setTimeout(() => {
        axios
          .get(
            id
              ? `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${currentPage}/20`
              : `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currentPage}/20`,
          )
          .then((response) => {
            setLoading(false);
            setCardData([...cardData, ...response.data.list]);
            setCurrentPage((prevstate) => prevstate + 1);
          })
          .finally(() => {
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
    <>
      {loading && <Loading />}
      <div className='cardList'>
        {cardData.map((data, index) => (
          <Card data={data} key={`${index}_${data.name}`} />
        ))}
      </div>
      {fetching && !loading && <Loading />}
    </>
  );
};
export default CardsList;
