import "./index.css";
import { returnPaginationRange } from "../../utils/pageUtils";
const Pagination = (props) => {
  let array = returnPaginationRange(
    props.totalPage,
    props.page,
    props.limit,
    props.siblings
  );

  return (
    <div className="pagination">
      <ul>
        <span className="prev" onClick={() => props.onPageChange("&laquo")}>
          &laquo;
        </span>
        <span className="prev" onClick={() => props.onPageChange("&lsaquo")}>
          &lsaquo;
        </span>
        {array.map((value) => {
          if (value === props.page) {
            return (
              <span key={value} className="page active">
                {value}
              </span>
            );
          } else {
            return (
              <span
                key={value}
                className="page"
                onClick={() => props.onPageChange(value)}
              >
                {value}
              </span>
            );
          }
        })}

        <span className="next" onClick={() => props.onPageChange("&rsaquo")}>
          &rsaquo;
        </span>
        <span className="next" onClick={() => props.onPageChange("&raquo")}>
          &raquo;
        </span>
      </ul>
    </div>
  );
};

export default Pagination;
