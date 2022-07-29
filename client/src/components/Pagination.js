import React from 'react';
import { Link } from "react-router-dom";

//page,count,perPage,path get from Categories.js
//page is page number, perPage is define in backend means eik page pr kitnay data show hoga ham na 3 store kia hai backend mai,
//count means total number of data
const Pagination = ({ page, count, perPage, path, theme }) => {
    // console.log(typeof page);

    const totallinks = Math.ceil(count / perPage); //Suppose ( 6 / 3) = 2
    let startloop = page; // Suppose click on page no 2
    let difference = totallinks - page; // (2 - 2) = 0
    if (difference <= 3)  // 0 <= 3 => true , (diiference <= 3 ) 3 means i want to display 4 links 0-3
    {
        startloop = totallinks - 3;  // 2 - 3 = -1 , now startloop is -1 
    }
    let endloop = startloop + 3;  // -1 + 3 = 2, startloop + 3 --> here 3 is from if condtition (difference <= 3) 
    if (startloop <= 0)  // -1 <= 0 => true 
    {
        startloop = 1;  //move on Page Number 1
    }

    const links = () => {
        const alllinks = []; //All link store in array

        for (let i = startloop; i <= endloop; i++)  //(i=1; 1<=2; i++) , jab tak condtion true hogia utna links show hoga
        {
            alllinks.push(
                <li key={i} className="pagination-li">
                    <Link className={`${theme === 'light' ? "pagination-link-light" : "pagination-link"}  ${page === i && ' bg-navyblue text-gray-900'}`}
                        to={`/${path}/${i}`}>{i}</Link>   {/* path get from Catrgories.js */}
                </li>
            );
        }

        return alllinks;

    }

    const nextpage = () => {
        if (page < totallinks)  //(2 < 2)
        {
            return <li className="pagination-li">
                <Link className={`${theme === 'light' ? "pagination-link-light" : "pagination-link"}`} to={`/${path}/${page + 1}`}>
                <i className="bi bi-chevron-double-right"></i>
            </Link></li>
        }
    }

    const previouspage = () => {
        if (page > 1)  //(2 > 1)
        {
            return <li className="pagination-li">
                <Link className={`${theme === 'light' ? "pagination-link-light" : "pagination-link"}`} to={`/${path}/${page - 1}`}>
                <i className="bi bi-chevron-double-left"></i>
            </Link></li>
        }
    }

    return count > perPage && (  //Call All Functions
        <ul className='flex mt-2'>
            {previouspage()}
            {links()}
            {nextpage()}

        </ul>
    );
};

export default Pagination;