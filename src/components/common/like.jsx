const Like = (props) => {
  let classes = "fa-heart fa-";
  classes += props.liked ? "solid" : "regular";

  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
    ></i>
  );
};

export default Like;
