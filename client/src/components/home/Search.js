import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi"
import { motion } from 'framer-motion';
import { toggleSearchBar } from '../../store/reducers/globalReducer';

const Search = () => {

    const [search, setSearch] = useState(' ')
    // console.log(state)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { searchBar } = useSelector((state) => state.globalReducer);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const closeSearch = (e) => {
        const id = e.target.getAttribute("id"); // The getAttribute() method returns the value of an element's attribute. Its JavaScript Function
        // console.log( e.target.getAttribute("id"));
        id === 'search' && dispatch(toggleSearchBar());
    }

    const searchProducts = () => {
        if (search === " ") {
            return;
        }
        navigate(`/searchproducts/${search}/1`);
        dispatch(toggleSearchBar());
    }

    return (
        searchBar && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='fixed inset-0 w-full h-full bg-black/50 z-[300]' id='search' onClick={closeSearch}>
                <div className="flex -mx-8 justify-center">
                    <div className="w-full sm:w-10/12 md:8/12 lg:w-6/12 px-8 mt-10 relative">
                        <input className='w-full bg-white h-[50px] rounded outline-none pl-5 pr-14'
                            placeholder="Search Products" type="text" name="" id=""
                            onChange={handleChange} />
                        <FiSearch className='absolute top-[13px] right-12 text-2xl text-gray-500 cursor-pointer' onClick={searchProducts} />
                    </div>
                </div>
            </motion.div>
        )
    )
}

export default Search