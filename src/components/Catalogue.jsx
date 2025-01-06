import { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import axios from "axios";
import Display from "./Display";
import Categories from "./CategoriesList";
function Catalogue(){
    const[search, setsearch] =useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [mainCategory, setMainCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [isApply, setisApply]= useState(false)
    const handleClick = () => {
        setIsVisible(true); // Update the state to make the serach results visible 
      };
    const handleApply=()=>{
      setisApply(true);
    }
      const handleMainChange = (event) => {
          const { value, checked } = event.target;
      
          if (checked) {
            // Add the value to the array if checked
            setMainCategory((prev) => [...prev, value]);
          } else {
            // Remove the value from the array if unchecked
            setMainCategory((prev) => prev.filter((item) => item !== value));
          }
          //console.log(mainCategory);
        };
        const handleSubChange = (event) => {
          const { value, checked } = event.target;
      
          if (checked) {
            // Add the value to the array if checked
            setSubCategory((prev) => [...prev, value]);
          } else {
            // Remove the value from the array if unchecked
            setSubCategory((prev) => prev.filter((item) => item !== value));
          }
          //console.log(subCategory);
        };
      
    return <>
    <Header/>
    <div>WHAT ARE YOU LOOKING FOR TODAY?</div>
    <input className='search' type='text' value={search} onChange={(e)=>setsearch(e.target.value)}/>
    <button className='search-btn' onClick={handleClick}>SEARCH</button> 
    <div>
        <div className="main">
              {Object.keys(Categories).map((category) => (
                <div key={category}>
                  <label>
                    <input
                      type="checkbox"
                      name="mainCategory"
                      value={category}
                      onChange={handleMainChange}
                    />
                    {category}
                  </label>

                  
                  
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                      {Categories[category].map((sub) => (
                        <label key={sub} style={{ display: "block", margin: "5px 0" }}>
                          <input
                            type="checkbox"
                            name="subCategory"
                            value={sub}
                            onChange={handleSubChange}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                </div>
              ))}
            </div>
            <button onClick={handleApply}>Apply</button>
            <button>Reset</button>
            </div>
    {isVisible && (
        <Display search={search} setIsVisible={setIsVisible}/>
      )} 
    {isApply&& (
        <Display search={null} setIsVisible={setIsVisible} mainCategory={mainCategory} subCategory={subCategory}/>
    )} 
    {/*<Display search={search}/>
    <div>
        <ul>
            {result.map((item, index)=>(
                <li key={index}>{item.pname}</li>
            ))}
        </ul>
    </div>*/}
    </>
}
export default Catalogue;