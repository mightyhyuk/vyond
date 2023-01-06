import PropTypes from "prop-types";

const Like = (props) => {
  const { liked, handleLike } = props;
  const classes = "fa-heart fa-" + (liked ? "solid" : "regular");

  return (
    <i
      onClick={handleLike}
      style={{ cursor: "pointer" }}
      className={classes}
    ></i>
  );
};

Like.propTypes = {
  liked: PropTypes.bool,
  handleLike: PropTypes.func,
};

export default Like;
