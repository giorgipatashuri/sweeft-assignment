import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardsList from '../../components/CardsList/CardsList';

import './DetailsPage.scss';
const DetailsPage = () => {
  const [cardDetails, setCardDetails] = useState({});
  const [history, setHistory] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setCardDetails(res);
        const userName = `${res.prefix} ${res.name} ${res.lastName}`;

        setHistory((previous) => {
          if (previous.some((user) => user.id === id)) {
            return previous;
          }
          return [...previous, { userName, id }];
        });
      });
  }, [id]);

  return (
    <div className='container'>
      <header>
        <img src={cardDetails.imageUrl + `?v=${cardDetails.id}`} alt='' />
        <fieldset className='mainInfo'>
          <legend>Info</legend>
          <h3>{`${cardDetails.prefix} ${cardDetails.name} ${cardDetails.lastName}`}</h3>
          <h4>
            <i>{cardDetails.title}</i>
          </h4>
          <p>
            <span>Email</span>:{cardDetails.email}
          </p>
          <p>
            <span>IP Address</span>:{cardDetails.ip}
          </p>
          <p>
            <span>IP Address</span>:{cardDetails.ip}
          </p>
          <p>
            <span>Job Area</span>:{cardDetails.jobArea}
          </p>
          <p>
            <span>Job Type</span>:{cardDetails.jobType}
          </p>
        </fieldset>
        <fieldset className='secondaryInfo'>
          <legend>Address</legend>
          <h3>{`${cardDetails.company?.name} ${cardDetails.company?.suffix}`}</h3>
          <p>
            <span>City</span>:{cardDetails.address?.city}
          </p>
          <p>
            <span>Country</span>:{cardDetails.address?.country}
          </p>
          <p>
            <span>State</span>:{cardDetails.address?.state}
          </p>
          <p>
            <span>Street Address</span>:{cardDetails.address?.streetAddress}
          </p>
          <p>
            <span>ZIP</span>:{cardDetails.address?.zipCode}
          </p>
        </fieldset>
      </header>
      <div className='history'>
        {history.map((user, index) => {
          return (
            <div key={user.id}>
              <Link to={`/user/${user.id}`}>{user.userName}</Link>
              {history.length - 1 !== index && <i>{'>'}</i>}
            </div>
          );
        })}
      </div>
      <h2 className='title'>Friends:</h2>
      <CardsList id={cardDetails.id} />
    </div>
  );
};
export default DetailsPage;
