import PropTypes from "prop-types";

const ListGroup = (props) => {
  const { items, nameProp, idProp, handleItemSelect, selectedItem } = props;

  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item[idProp]}
          onClick={() => handleItemSelect(item)}
          className={
            item === selectedItem
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
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

ListGroup.propTypes = {
  items: PropTypes.array,
  nameProp: PropTypes.string,
  idProp: PropTypes.string,
  handleItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};

export default ListGroup;
