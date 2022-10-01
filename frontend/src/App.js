import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import AddProductForm from "./components/AddPostForm/AddProductForm";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Products from "./containers/Products/Products";

function App() {
  return (
      <Layout>
        <Switch>
            <Route path="/" exact component={Products}/>
            <Route path={'/register'} component={Register}/>
            <Route path={'/login'} component={Login}/>
            <Route path={'/products/new'}  component={AddProductForm}/>
        </Switch>
      </Layout>
  );
}

export default App;
