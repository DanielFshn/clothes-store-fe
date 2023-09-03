import { Link, Link as RouterLink } from "react-router-dom";

export default function IndexCategories() {
  return (
    <div>
      <h3>Categories</h3>
      <Link to="/category/create">Create Category</Link>
    </div>
  );
}
