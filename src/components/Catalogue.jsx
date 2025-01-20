import { useEffect, useState } from "react";
import Header from "./Header";
import Display from "./Display";
import Categories from "./CategoriesList";
function Catalogue(){
    const[search, setsearch] =useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [mainCategory, setMainCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [isApply, setisApply]= useState(false)
    const handleClick = (e) => {
      setsearch(e.target.value);
        setIsVisible(true); 
        setisApply(false);
        // Update the state to make the serach results visible 
      };
    //const handleApply=()=>{
      //setisApply(true);
      //setIsVisible(false);
    //}
      const handleMainChange = (event) => {
          const { value, checked } = event.target;
        
          if (checked) {
            setIsVisible(false);
            setisApply(true); 
            setsearch([]);
            // Add the value to the array if checked
            setMainCategory((prev) => [...prev, value]);
          } else {
            // Remove the value from the array if unchecked
            setMainCategory((prev) => prev.filter((item) => item !== value));
          }
          console.log(value);
        };
        const handleSubChange = (event) => {
          const { value, checked } = event.target;
      
          if (checked) {
            setIsVisible(false); 
            setisApply(true);
            setsearch([]);
            // Add the value to the array if checked
            setSubCategory((prev) => [...prev, value]);
          } else {
            // Remove the value from the array if unchecked
            setSubCategory((prev) => prev.filter((item) => item !== value));
          }
          console.log(value);
        };
      
    return <>
    <Header/>
    <div>WHAT ARE YOU LOOKING FOR TODAY?</div>
    <input className='search' type='text' value={search} onChange={(e)=>handleClick(e)}/>
    {/* <button className='search-btn' onClick={handleClick}>SEARCH</button>   */}
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
            </div>
    {isVisible && (
        <Display search={search} mainCategory={null} subCategory={null}/>
      )} 
    {isApply &&(
      <Display search={null} mainCategory={mainCategory} subCategory={subCategory}/>
    )}
    </>
}
export default Catalogue;