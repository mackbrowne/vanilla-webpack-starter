import "./style.css";

const createElement = (message) => {
  const element = document.createElement("div");
  element.innerHTML = message;
  return element;
};

document.body.appendChild(
  createElement("Webpack lives by the love of Open Source.")
);
