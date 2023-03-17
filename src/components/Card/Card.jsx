import { Link } from 'react-router-dom';
import './Card.scss';

const Card = ({ data }) => {
  return (
    <div className='cardItem'>
      <Link to={`/user/${data.id}`}>
        <div>
          <img src={data.imageUrl + `?v=${data.id}`} alt='' />
        </div>
        <div>
          <h3>{`${data.prefix} ${data.name} ${data.lastName}`}</h3>
          <p>{data.title}</p>
        </div>
      </Link>
    </div>
  );
};
export default Card;
