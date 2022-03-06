import { useNavigate, useParams } from "react-router-dom";

export function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}
