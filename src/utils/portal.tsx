import ReactDOM from "react-dom";

const Portal = ({ children }:any) => {
  const element = document.querySelector("#root");
  console.log(element)
  return element ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
