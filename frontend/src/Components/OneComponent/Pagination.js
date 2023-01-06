import './Pagination.css'

function Pagination (props) {
    const pages =[];
    for (let i = 1; i <= 4; i++) {
        pages.push(i);
    }
    return(
        <nav className = "mt-4"aria-label="Page navigation example" style={{position:"relative",alignSelf:"center"}}>
        <ul className="pagination">
      <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
   {pages.map(p=>{
       return <li key = {p} className="page-item"><a className="page-link" href="#">{p}</a></li>

   })}
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    )
}
export default Pagination;