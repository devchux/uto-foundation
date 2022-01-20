import { Redirect } from "react-router-dom";
import SideNav from "../components/navbar/SideNav";
import TopNav from "../components/navbar/TopNav";
import Title from "../components/titles/Title";
import { useNavigation } from "../hooks/useNavigation";
import "./scss/layout.scss";

const Layout = ({ children }) => {
  const { goTo, currentUrl } = useNavigation();
  let urlToArray = currentUrl.split("/");
  const hasAdd = urlToArray.includes("add");

  if (urlToArray.length <= 2) return <Redirect to="/dashboard/posts" />

  return (
    <div className="layout">
      <SideNav />
      <div className="right-side">
        <TopNav />
        <div className="main">
          <Title
            title={urlToArray[2].toLocaleUpperCase()}
            isAdd={hasAdd}
            noAddButton={currentUrl === '/dashboard/contacts'}
            buttonClick={() => {
              if (hasAdd) {
                urlToArray.pop();
                if (urlToArray.length === 4) urlToArray.pop()
                return goTo(urlToArray.join("/"));
              }
              return goTo(`${currentUrl}/add`);
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
