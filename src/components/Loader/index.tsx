import PropTypes from "prop-types";

export function Loader({ fullScreen }: any) {
  return (
    <div
      className={fullScreen ? "bouncing-loader full-screen" : "bouncing-loader"}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

Loader.propTypes = {
  fullScreen: PropTypes.bool,
};

export default Loader;
