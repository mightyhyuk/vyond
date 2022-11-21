const ListGroup = (props) => {
  const { items, nameProp, idProp } = props;

  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item[idProp]}
          className="list-group-item list-group-item-action"
        >
          {item[nameProp]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  nameProp: "name",
  idProp: "_id",
};

export default ListGroup;
