import './Card.scss';

const Card = ({ data }) => {
  return (
    <div className='cardItem'>
      <div>
        <img src={data.imageUrl + `?v=${data.id}`} alt='' />
      </div>
      <div>
        <h3>{`${data.prefix} ${data.name} ${data.lastName}`}</h3>
        <p>{data.title}</p>
      </div>
    </div>
  );
};
export default Card;
